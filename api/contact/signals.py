from typing import List

from django.conf import settings
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.safestring import mark_safe

from contact.models import CONTACT_ADMIN_GROUP, ContactMessage
from testing_centers_site.utils import send_email


@receiver(post_save, sender=ContactMessage)
def send_email_on_new_contact_message(sender: ContactMessage, instance: ContactMessage, created: bool, **kwargs):
    if not created or not isinstance(instance, ContactMessage):
        return

    subject: str = "Mesaj nou prin formularul de contact"

    users = User.objects.filter(groups__name=CONTACT_ADMIN_GROUP)
    user_mails: List[str] = [user.email for user in users]

    for user_mail in user_mails:
        send_email(
            template="email/new_contact_message.html",
            template_context={
                "sender_address": mark_safe(instance.name),
                "site_url": settings.SITE_URL,
                "home_site_url": settings.HOME_SITE_URL,
            },
            subject=subject,
            to=user_mail,
        )
