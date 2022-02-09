from typing import List

from django.conf import settings
from django.contrib.auth.models import Permission, User
from django.db.models import Q
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.safestring import mark_safe

from contact.models import ContactMessage
from testing_centers_site.utils import send_email


def _get_user_emails_by_permission_name(permission_name):
    perm: Permission = Permission.objects.get(codename=permission_name)
    users: List[User] = User.objects.filter(Q(groups__permissions=perm) | Q(user_permissions=perm)).distinct()
    user_mails: List[str] = [user.email for user in users]

    return user_mails


@receiver(post_save, sender=ContactMessage)
def send_new_mail_on_contact_message_received(sender: ContactMessage, instance: ContactMessage, created, **kwargs):
    if not created:
        return

    subject: str = "Mesaj nou prin formularul de contact"

    classname_lowercase: str = str(sender).split(".")[-1][:-2].lower()
    permission_name = f"view_{classname_lowercase}"
    user_mails = _get_user_emails_by_permission_name(permission_name)

    for user_mail in user_mails:
        send_email(
            template="mail/new_contact_message.html",
            context={
                "sender_address": mark_safe(instance.name),
                "site_url": settings.SITE_URL,
                "home_site_url": settings.HOME_SITE_URL,
            },
            subject=subject,
            to=user_mail,
        )
