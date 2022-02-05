from copy import deepcopy
from zipfile import BadZipFile

import tablib
from django.conf import settings
from django.contrib import admin, messages
from django.contrib.admin import display
from django.utils.safestring import mark_safe
from django.utils.translation import gettext_lazy as _, ngettext
from import_export import resources

from centers import models


@admin.register(models.Statistic)
class StatisticAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        base_add_permission = super(StatisticAdmin, self).has_add_permission(request)
        if base_add_permission:
            has_entry = models.Statistic.objects.count() != 0
            if not has_entry:
                return True
        return False


@admin.register(models.CenterTestTypes)
class TestingCenterAttributes(admin.ModelAdmin):
    pass


@admin.register(models.TestingCenter)
class TestingCenterAdmin(admin.ModelAdmin):
    list_filter = ("status", "county", "locality", "test_types")
    list_display = (
        "get_testing_center_address",
        "status",
        "website",
        "phone_number",
        "schedule",
    )
    search_fields = ("full_address",)
    actions = (
        "make_pending",
        "make_accepted",
        "make_rejected",
    )
    fieldsets = (
        (_("Operational Data"), {"fields": ("status",)}),
        (_("Geo Data"), {"fields": ("street_name", "street_number", "county", "locality", "lat", "lng")}),
        (_("Testing Center Data"), {"fields": ("website", "phone_number", "schedule", "test_types")}),
    )

    @display(ordering="testing_center__full_address", description=_("Address"))
    def get_testing_center_address(self, obj: models.TestingCenter):
        county_name = obj.county
        county = settings.COUNTIES_SHORTNAME.get(county_name, county_name)
        return mark_safe("{} {} ({}, {})".format(obj.street_name, obj.street_number, obj.locality, county))

    def make_pending(self, request, queryset):
        self._perform_status_change(request, queryset, "0")

    make_pending.short_description = _("Mark selected testing centers as pending")

    def make_accepted(self, request, queryset):
        self._perform_status_change(request, queryset, "1")

    make_accepted.short_description = _("Mark selected testing centers as accepted")

    def make_rejected(self, request, queryset):
        self._perform_status_change(request, queryset, "-1")

    make_rejected.short_description = _("Mark selected testing centers as rejected")

    def _perform_status_change(self, request, queryset, status):
        updated = queryset.update(status=status)

        status_str = self.choice_to_string(status)
        message = ngettext(
            "{updated} testing center was successfully marked as {status}.",
            "{updated} testing centers were successfully marked as {status}.",
            updated,
        ).format(updated=updated, status=status_str)

        self.message_user(request, message, messages.SUCCESS)

    class Media:
        """
        If maps are enabled then we add the JS and CSS for either
        Google JS Maps API or the Mapbox APIs (including Geocoding).
        """

        library_css = "https://js.api.here.com/v3/3.1/mapsjs-ui.css"

        library_js = (
            "https://js.api.here.com/v3/3.1/mapsjs-core.js",
            "https://js.api.here.com/v3/3.1/mapsjs-service.js",
            "https://js.api.here.com/v3/3.1/mapsjs-ui.js",
            "https://js.api.here.com/v3/3.1/mapsjs-mapevents.js",
            "js/admin/here_map.js",
        )

        css = {"all": ("css/admin/location_picker.css", library_css)}
        js = library_js

    def add_view(self, request, form_url="", extra_context=None):
        """
        Add the HERE_MAPS setting to context.
        """
        extra = extra_context or {}
        extra["HERE_MAPS"] = settings.HERE_MAPS
        return super(TestingCenterAdmin, self).add_view(request, form_url, extra_context=extra)

    def change_view(self, request, object_id, form_url="", extra_context=None):
        """
        Add the HERE_MAPS setting to context.
        """
        extra = extra_context or {}
        extra["HERE_MAPS"] = settings.HERE_MAPS
        return super(TestingCenterAdmin, self).change_view(request, object_id, form_url, extra_context=extra)

    def changelist_view(self, request, extra_context=None):
        """
        Add the HERE_MAPS setting to the change list view context.
        """
        extra = extra_context or {}
        extra["HERE_MAPS"] = settings.HERE_MAPS
        return super(TestingCenterAdmin, self).changelist_view(request, extra_context=extra)

    @staticmethod
    def choice_to_string(status):
        status = int(status)
        for status_choice in models.TestingCenter.CENTER_STATUS_CHOICES:
            if status_choice[0] == status:
                status_str = status_choice[1]
                break
        else:
            status_str = ""
        return status_str


class TestingCenterResource(resources.ModelResource):
    class Meta:
        DATE_FORMAT = {"format": "%d.%m.%Y"}

        model = models.TestingCenter
        exclude = ("id",)

        widgets = {
            "administration_update": DATE_FORMAT,
            "admin_update": DATE_FORMAT,
        }

        verbose_name = _("testing center resource")
        verbose_name_plural = _("testing center resources")


@admin.register(models.DataFile)
class DataFileAdmin(admin.ModelAdmin):
    actions = ("import_files",)
    list_display = ("name", "status")

    def import_files(self, request, query_set):
        for q in query_set:
            try:
                data = self._read_file_data(q)
                data = self._normalize_data_headers(data)
                testing_center_res = TestingCenterResource()
                res = testing_center_res.import_data(data, dry_run=False, raise_errors=True, collect_failed_rows=True)
                data_file = models.DataFile.objects.get(name=str(q))

                if res.has_errors() or res.has_validation_errors():
                    data_file.status = models.DataFile.FAILURE
                    row_errors = [
                        f"error#{error[0]}: {error[1][0].error} FAILED ON ROW DATA {error[1][0].row} "
                        f"||| TRACEBACK: {error[1][0].traceback}"
                        for error in res.row_errors()
                    ]
                    message_str = _(
                        "File with name '{file_name}' wasn't imported. Errors: {row_errors}".format(
                            file_name=str(q), row_errors=row_errors
                        )
                    )
                    message_level = messages.WARNING
                else:
                    data_file.status = models.DataFile.SUCCESS
                    message_str = _("File with name '{file_name}' was imported.".format(file_name=str(q)))
                    message_level = messages.SUCCESS
                data_file.save()
            except BadZipFile:
                self._save_file_as_failed(q)

                message_str = _(
                    "File with name '{file_name}' wasn't a proper data file. Accepted formats are: CSV, XLSX.".format(
                        file_name=str(q)
                    )
                )
                message_level = messages.ERROR
            except ValueError as e:
                self._save_file_as_failed(q)

                message_str = _(
                    "File with name '{file_name}' couldn't be imported. The error received was: `{error_args}`".format(
                        file_name=str(q), error_args=e.args[0]
                    )
                )
                message_level = messages.ERROR
            except Exception as e:
                self._save_file_as_failed(q)
                raise e

            self.message_user(request, message_str, message_level)

    @staticmethod
    def _normalize_data_headers(data):
        normalized_data = deepcopy(data)
        normalized_headers = [
            header.lower().replace(":", "").replace(".", "").strip().replace(" ", "_")
            for header in normalized_data.headers
        ]
        normalized_data.headers = normalized_headers

        return normalized_data

    @staticmethod
    def _read_file_data(q):
        file_name: str = q.file.file.name
        file_extension: str = file_name.split(".")[-1].lower()
        if file_extension == "xlsx":
            data = tablib.import_set(open(file_name, "rb").read(), format="xlsx")
        elif file_extension == "csv":
            data = tablib.import_set(open(file_name, "r").read(), format="csv")
        else:
            raise BadZipFile
        return data

    @staticmethod
    def _save_file_as_failed(q):
        csv_file = models.DataFile.objects.get(name=str(q))
        csv_file.status = models.DataFile.FAILURE
        csv_file.save()

    import_files.short_description = "Import selected files"
