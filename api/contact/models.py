from django.db import models
from django.utils.translation import gettext_lazy as _


class ContactMessage(models.Model):
    UNREAD = 0
    READ = 1
    MESSAGE_STATUS_CHOICES = [
        (UNREAD, _("Unread")),
        (READ, _("Read")),
    ]

    name = models.CharField(_("name"), max_length=100)
    email = models.EmailField(_("email address"))
    phone_number = models.CharField(_("phone number"), max_length=13, null=True, blank=True)
    message = models.CharField(_("message"), max_length=1000)

    status = models.SmallIntegerField(
        _("message status"), choices=MESSAGE_STATUS_CHOICES, db_index=True, default=UNREAD
    )

    created_at = models.DateTimeField(_("creation date"), auto_now_add=True)

    objects = models.Manager()

    class Meta:
        verbose_name = _("contact message")
        verbose_name_plural = _("contact messages")

    def __str__(self):
        return self.name
