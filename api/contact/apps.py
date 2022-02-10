from django.apps import AppConfig
from django.db.models.signals import post_save
from django.utils.translation import gettext_lazy as _


class ContactConfig(AppConfig):
    name = "contact"
    verbose_name = _("Contact Message")

    def ready(self):
        # Implicitly connect a signal handlers decorated with @receiver.
        from . import signals
        # Explicitly connect a signal handler.
        post_save.connect(signals.send_email_on_new_contact_message, dispatch_uid="contact_email")
