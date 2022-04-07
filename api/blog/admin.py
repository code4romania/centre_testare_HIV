from django.contrib import admin
from import_export.admin import ImportExportModelAdmin

from .models import Post


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


admin.site.register(Post, PostAdmin)
