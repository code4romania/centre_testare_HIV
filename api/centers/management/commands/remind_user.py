import logging

from django.conf import settings
from django.core.management import BaseCommand
from django.utils.translation import gettext_lazy as _

from contact.models import ContactEmailReminder
from testing_centers_site.utils import send_email


class Command(BaseCommand):
    help = "Sends an e-mail reminder to a stored contact."
    logger = None

    def __init__(self):
        super().__init__()

        self.logger = logging.getLogger("django")

    def add_arguments(self, parser):
        parser.add_argument("--contact_obj", help="email contact reminder object to send the email to", type=int)

    def handle(self, *args, **options):
        self.logger.info("Sending reminder e-mail to contact.")
        contact_obj = ContactEmailReminder.objects.get(pk=options["contact_obj"])

        template_arg = f"email/center_rating_reminder.html"
        template_context = {"site_url": f"{settings.SITE_URL}"}
        subject_arg = f"{_('Reminder to rate your testing center')}"
        email_arg = contact_obj.email

        send_email(template_arg, template_context, subject_arg, to=email_arg)

        contact_obj.status = ContactEmailReminder.SENT
        contact_obj.save()

        self.logger.info("Sent email reminder to {}".format(email_arg))
