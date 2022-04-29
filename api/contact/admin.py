from django.contrib import admin
from django.utils.safestring import mark_safe
from django.utils.translation import gettext_lazy as _

from contact.models import ContactEmailReminder, ContactMessage
from testing_centers_site.utils import AdminWithStatusChanges
from django.urls import reverse


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


@admin.register(ContactEmailReminder)
class ContactEmailReminderAdmin(admin.ModelAdmin):
    list_filter = ("status",)
    list_display = ("email", "status", "get_scheduled_task")

    @staticmethod
    def get_scheduled_task(obj: ContactEmailReminder):
        if not obj.scheduled_task:
            return None

        schedule_url = reverse("admin:django_q_schedule_change", args=[obj.scheduled_task.id])
        schedule_link = f"<a href='{schedule_url}'>{obj.scheduled_task.name}</a>"

        return mark_safe(schedule_link)
