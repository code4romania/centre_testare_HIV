from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from import_export.admin import ImportExportModelAdmin
from taggit.admin import TagAdmin
from taggit.models import Tag

from .models import Post


@admin.register(Post)
class PostAdmin(ImportExportModelAdmin):
    prepopulated_fields = {"slug": ("title",)}
    list_display = ("title", "slug", "created", "published", "is_visible")
    fieldsets = [
        (
            _("Title"),
            {
                "fields": (
                    "title",
                    "title_ro",
                    "title_en",
                )
            },
        ),
        (
            _("Metadata"),
            {
                "fields": (
                    "author",
                    "slug",
                    "image",
                    "tags",
                    "published",
                    "is_visible",
                )
            },
        ),
        (
            _("Preview"),
            {
                "classes": ("full-width",),
                "fields": (
                    "preview_text",
                    "preview_text_ro",
                    "preview_text_en",
                ),
            },
        ),
        (
            _("Text"),
            {
                "classes": ("full-width",),
                "fields": (
                    "text",
                    "text_ro",
                    "text_en",
                ),
            },
        ),
    ]


class TagAdminWithImportExport(ImportExportModelAdmin, TagAdmin):
    ...


admin.site.unregister(Tag)
admin.site.register(Tag, TagAdminWithImportExport)
