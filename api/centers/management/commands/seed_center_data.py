import json
import os

from django.core.management.base import BaseCommand, CommandParser

from centers.models import (
    CenterEmail,
    CenterTestTypes,
    CenterType,
    NecessaryDocuments,
    FreeTestingConditions,
    CenterPhoneNumber,
)


class Command(BaseCommand):
    type_mapping = {
        "center_type": CenterType,
        "center_test_types": CenterTestTypes,
        "necessary_documents": NecessaryDocuments,
        "free_testing_conditions": FreeTestingConditions,
        "center_email": CenterEmail,
        "center_phone": CenterPhoneNumber,
    }

    def add_arguments(self, parser: CommandParser):
        type_choices = tuple(self.type_mapping.keys())
        parser.add_argument(
            "-t",
            "--type",
            type=str,
            choices=type_choices,
            help="The type of data to import",
        )

    def populate_center_data(self, class_type):
        base_path = os.path.abspath(os.path.dirname(__file__))
        file_name = f"{class_type}.json"
        file_path = os.path.join(base_path, file_name)
        with open(file_path) as f:
            centers_data = json.load(f)

            for data in centers_data:
                self.type_mapping[class_type].objects.get_or_create(**data)

    def handle(self, *args, **options):
        self.populate_center_data(options["type"])
        formatted_name = " ".join(options["type"].split("_")).capitalize()
        print(f"{formatted_name} created")
