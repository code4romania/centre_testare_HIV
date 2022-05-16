import itertools
import json
import os
import re
from datetime import time
from os.path import exists
from typing import Dict, List

import pandas as pd
from django.core.exceptions import ValidationError
from django.core.management import BaseCommand, CommandParser
from pandas import DataFrame

from centers import models


class Command(BaseCommand):

    help = "Import testing centers from a data file"

    def add_arguments(self, parser: CommandParser):
        parser.add_argument(
            "-f",
            "--file",
            type=str,
            help="The file to import",
        )
        parser.add_argument(
            "-t",
            "--type",
            type=str,
            choices=("csv", "xlsx"),
            default="csv",
            help="The type of file to import",
        )
        parser.add_argument(
            "-o",
            "--overwrite",
            action="store_true",
        )
        parser.add_argument(
            "--dry-run",
            action="store_true",
        )

    def handle(self, *args, **options):
        file_path, file_type = self._check_and_extract_variables(options)
        df: DataFrame = self._convert_file_to_dataframe(file_path, file_type)
        columns_list: List[Dict] = self._get_columns_list(list(df.columns.values))
        fields_list: List[Dict] = self._get_model_fields()
        fields_dict: Dict = {field["field_name"]: field for field in fields_list}
        mapped_values: Dict = self._get_fields_columns_mapping(columns_list, fields_list)

        self._write_centers(df, fields_dict, mapped_values, options)

    def _write_centers(self, df, fields_dict, mapped_values, options):
        overwrite = options.get("overwrite", False)
        dry_run = options.get("dry_run", False)

        base_types = (int, float, bool, str)

        basic_fields_mapping = {
            "Față în față": models.TestingCenter.DISCLOSURE_FACE_TO_FACE,
            "Platforma web proprie cu user și parolă": models.TestingCenter.DISCLOSURE_PLATFORM,
            "E-mail": models.TestingCenter.DISCLOSURE_EMAIL,
            "Telefonic": models.TestingCenter.DISCLOSURE_PHONE,
            "Altfel": models.TestingCenter.DISCLOSURE_OTHER,
            "Prin poștă": models.TestingCenter.DISCLOSURE_MAIL,
            "Da": True,
            "Nu": False,
            "da": True,
            "nu": False,
            "DA": True,
            "NU": False,
        }
        dynamic_data_mapping = self._get_dynamic_data_mapping()
        for r_index, row in df.iterrows():
            new_center = {}
            emails = []
            phone_numbers = []
            test_types = []
            free_testing_conditions = []
            docs_18 = []
            docs_16 = []

            if overwrite:
                new_center["id"] = row.get("id", r_index + 1)

            for k, v in mapped_values.items():
                if v["type"] == "value":
                    new_center[k] = v["value"]
                else:
                    row_value = row[v["value"]]
                    field_type_details = fields_dict[k]["field_type"]
                    if isinstance(field_type_details, dict):
                        if field_type_details.get("type") == "multi":
                            if isinstance(row_value, str) and ("\n" in row_value or "%%" in row_value):
                                row_value = re.split("\n|%%", row_value)
                            if not isinstance(row_value, list):
                                row_value = [row_value]
                            item_model = field_type_details.get("model")

                            if item_model == models.CenterEmail:
                                for item in row_value:
                                    if "@" in item:
                                        email_object, _ = models.CenterEmail.objects.get_or_create(email=item.strip())
                                        emails.append(email_object)
                                if emails:
                                    new_center["online_contact_type"] = models.TestingCenter.CONTACT_EMAIL
                                else:
                                    contact_mapping = {
                                        "FORMULAR DE CONTACT PE SITE": models.TestingCenter.CONTACT_FORM,
                                        "FORMULAR DE PROGRAMARE PE SITE": models.TestingCenter.SCHEDULE_FORM,
                                    }
                                    new_center["online_contact_type"] = contact_mapping.get(
                                        row_value[0], models.TestingCenter.CONTACT_NONE
                                    )
                            elif item_model == models.CenterPhoneNumber:
                                for item in row_value:
                                    if item:
                                        phone_object, _ = models.CenterPhoneNumber.objects.get_or_create(
                                            phone_number=item.strip()
                                        )
                                        phone_numbers.append(phone_object)
                            elif item_model == models.CenterTestTypes:
                                for item in row_value:
                                    if item:
                                        test_types.append(item_model.objects.get(id=dynamic_data_mapping[item]))
                            elif item_model == models.FreeTestingConditions:
                                for item in row_value:
                                    item = item.strip()
                                    if item:
                                        free_testing_conditions.append(
                                            item_model.objects.get(id=dynamic_data_mapping[item])
                                        )
                                        if "progr" in item.lower():  # noqa
                                            appointment_id = dynamic_data_mapping["appointment"]
                                            free_testing_conditions.append(item_model.objects.get(id=appointment_id))
                            elif item_model == models.NecessaryDocuments:
                                if not row_value[0]:
                                    continue
                                if "18" in k:
                                    for item in row_value:
                                        item = item.strip()
                                        if item:
                                            docs_18.append(item_model.objects.get(id=dynamic_data_mapping[item]))
                                elif "16" in k:
                                    for item in row_value:
                                        item = item.strip()
                                        if item:
                                            docs_16.append(item_model.objects.get(id=dynamic_data_mapping[item]))
                        elif field_type_details.get("type") == "external":
                            item_model = field_type_details.get("model")
                            new_center[k] = item_model.objects.get(id=dynamic_data_mapping[row[v["value"]]])
                    elif field_type_details in base_types:
                        default_row_value = (
                            row_value
                            if k
                            not in (
                                "pre_testing_counseling_conditions",
                                "post_testing_counseling_conditions",
                            )
                            else None
                        )
                        value = basic_fields_mapping.get(row_value, default_row_value)

                        if isinstance(value, time):
                            value = value.strftime("%H:%M")
                            if value.split(":")[-1] == "59":
                                value = f"{int(value.split(':')[0])+1:02d}:00"
                            elif value.split(":")[-1] == "29":
                                value = f"{int(value.split(':')[0]):02d}:30"
                        elif value == "" and field_type_details in (int, float):
                            value = 0

                        new_center[k] = value

            if dry_run:
                print(new_center)
                continue

            try:
                if overwrite:
                    center, _ = models.TestingCenter.objects.update_or_create(defaults=new_center, id=new_center["id"])
                else:
                    center = models.TestingCenter.objects.create(**new_center)
            except ValidationError:
                print(row.to_json())
                continue

            for field in emails:
                center.emails.add(field)
            for field in phone_numbers:
                center.phone_numbers.add(field)
            for field in test_types:
                center.test_types.add(field)
            for field in free_testing_conditions:
                center.free_testing_conditions.add(field)
            for field in docs_18:
                center.necessary_documents_under_18.add(field)
            for field in docs_16:
                center.necessary_documents_under_16.add(field)

            center.save()

            print(center)

    @staticmethod
    def _get_dynamic_data_mapping():
        base_path = os.path.abspath(os.path.dirname(__file__))
        output_file = os.path.join(base_path, "__helper_dynamic_data_mapping.json")
        with open(output_file, "r") as f:
            return json.load(f)

    def _get_fields_columns_mapping(self, input_columns: List[Dict], output_fields: List[Dict]) -> Dict:
        base_path = os.path.abspath(os.path.dirname(__file__))
        output_file = os.path.join(base_path, "__helper_fields_mapping.json")

        if exists(output_file):
            with open(output_file, "r") as f:
                fields_mapping = json.load(f)
            return fields_mapping

        fields_mapping = self._process_data_into_output_file(input_columns, output_fields, output_file)

        return fields_mapping

    @staticmethod
    def _process_data_into_output_file(input_columns, output_fields, output_file):
        printing_rows = []
        for combination in itertools.zip_longest(input_columns, output_fields):
            input_column = combination[1] or {
                "field_index": "",
                "field_name": "",
                "field_mandatory": "",
            }
            input_data = (
                f"{input_column['field_index']}. "
                f"{input_column['field_name']}"
                f"{'*' if input_column['field_mandatory'] else ''}"
            )
            output_field = combination[0] or {"column_index": "", "column_name": ""}
            output_data = f"{output_field['column_index']}. " f"{output_field['column_name']}"

            printing_rows.append(f"{input_data:<50} {output_data}")
        print("\n".join(printing_rows))
        print(
            "\n"
            "For each field on the left add the number of the column on the right FOLLOWED BY A DOT."
            "\nValid example:"
            "\n\t>? 12."
            "\nAssign default value example:"
            "\n\t>? 13.4"
            "\n\t>? 'default value'"
            "\n"
        )
        fields_mapping = {}
        for field in output_fields:
            field_data = input(f"{field['field_name']}")
            if isinstance(field_data, str) and field_data and field_data[-1] == ".":
                index_value = input_columns[int(field_data[:-1])]["column_name"]
                fields_mapping[field["field_name"]] = {"value": index_value, "type": "index"}
            elif field_data is not None and field_data != "":
                try:
                    field_data = int(field_data)
                except ValueError:
                    pass
                fields_mapping[field["field_name"]] = {"value": field_data, "type": "value"}
        with open(output_file, "w") as f:
            json.dump(fields_mapping, f, indent=4)
        return fields_mapping

    @staticmethod
    def _get_model_fields() -> List[Dict]:
        field_type_mapping = {
            "SmallIntegerField": int,
            "IntegerField": int,
            "DecimalField": float,
            "BooleanField": bool,
            "DateTimeField": str,
            "CharField": str,
            "TextField": str,
            "ManyToManyField": "multi",
            "ForeignKey": "external",
            "AutoField": "auto",
        }
        fields_list = []
        for index, field in enumerate(models.TestingCenter._meta.get_fields()):
            field_type = field_type_mapping.get(field.get_internal_type())
            if field_type in ("multi", "external"):
                field_type = {
                    "type": field_type,
                    "model": field.related_model,
                }
            field_data = {
                "field_index": index,
                "field_name": field.name,
                "field_mandatory": not (field.null or field.auto_created),
                "field_type": field_type,
            }
            fields_list.append(field_data)

        return fields_list

    @staticmethod
    def _get_columns_list(columns: List[str]) -> List[Dict]:
        columns_list = []
        for index, column in enumerate(columns):
            column_data = {
                "column_index": index,
                "column_name": column,
            }
            columns_list.append(column_data)

        return columns_list

    @staticmethod
    def _convert_file_to_dataframe(file_path: str, file_type: str) -> pd.DataFrame:
        if file_type == "xlsx":
            file: pd.DataFrame = pd.read_excel(file_path, sheet_name=0, header=0, keep_default_na=False)
        else:
            file: pd.DataFrame = pd.read_csv(file_path, header=0, keep_default_na=False)

        return file

    @staticmethod
    def _check_and_extract_variables(options: Dict) -> (str, str):
        if options["file"] is None:
            raise ValueError("You must specify a file to import")
        file_path = options["file"]
        if not exists(file_path):
            raise ValueError("The file does not exist")
        file_type = options["type"]
        return file_path, file_type
