from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission

from contact.models import CONTACT_ADMIN_GROUP

group_permissions = [
    "view_contactmessage",
    "add_contactmessage",
    "change_contactmessage",
    "delete_contactmessage",
]


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        group_name = CONTACT_ADMIN_GROUP

        users_group, _ = Group.objects.get_or_create(name=group_name)
        users_group.permissions.set(
            Permission.objects.filter(codename__in=group_permissions).values_list("id", flat=True)
        )
        self.stdout.write(
            self.style.SUCCESS(f"'{group_name}' group has been created and appropriate permissions were assigned")
        )
