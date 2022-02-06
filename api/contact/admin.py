from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from contact.models import ContactMessage
from testing_centers_site.utils import AdminWithStatusChanges


@admin.register(ContactMessage)
class ContactMessageAdmin(AdminWithStatusChanges):
    list_filter = ("status", "created_at")
    list_display = ("name", "email", "phone_number", "message", "status", "created_at")

    actions = (
        "mark_as_read",
        "mark_as_unread",
    )

    fieldsets = (
        (_("Contact info"), {"fields": ("name", "email", "phone_number")}),
        (_("Message"), {"fields": ("message",)}),
        (_("Status"), {"fields": ("status",)}),
    )

    def mark_as_unread(self, request, queryset):
        self._perform_status_change(
            "0", request, queryset, ContactMessage.MESSAGE_STATUS_CHOICES, _("message"), _("messages")
        )

    mark_as_unread.short_description = _("Mark selected messages as unread")

    def mark_as_read(self, request, queryset):
        self._perform_status_change(
            "1", request, queryset, ContactMessage.MESSAGE_STATUS_CHOICES, _("message"), _("messages")
        )

    mark_as_read.short_description = _("Mark selected messages as read")
