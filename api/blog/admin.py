from django.contrib import admin
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
            None,
            {
                "fields": (
                    "author",
                    "title",
                    "slug",
                    "image",
                    "tags",
                    "published",
                    "is_visible",
                )
            },
        ),
        ("Preview", {"classes": ("full-width",), "fields": ("preview_text",)}),
        ("Text", {"classes": ("full-width",), "fields": ("text",)}),
    ]


class TagAdminWithImportExport(ImportExportModelAdmin, TagAdmin):
    ...


admin.site.unregister(Tag)
admin.site.register(Tag, TagAdminWithImportExport)
