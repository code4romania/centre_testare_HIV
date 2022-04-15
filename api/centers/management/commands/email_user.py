import json
import logging

from django.core.management import BaseCommand
from django.utils.safestring import mark_safe

from testing_centers_site.utils import send_email


class Command(BaseCommand):
    help = "Dumps Models into Excel and sends email with xlsx as attachment"
    logger = None

    def __init__(self):
        super().__init__()

        self.logger = logging.getLogger("django")

    def add_arguments(self, parser):
        parser.add_argument("--email", help="email address to send the email to")
        parser.add_argument("--subject", help="subject of the email")
        parser.add_argument("--template", help="template to use for the email")
        parser.add_argument("--context", help="context to use for the email")

    def handle(self, *args, **options):
        email_addresses = mark_safe(options["email"])
        self.logger.info("Sending email to {}".format(email_addresses))

        email_subject = options["subject"]
        email_template = options["template"]
        email_context = options.get("context", {})

        template = f"email/{email_template}.html"
        template_context = json.loads(email_context)

        send_email(template, template_context, email_subject, to=email_addresses)
        self.logger.info("Sent email reminder to {}".format(email_addresses))
