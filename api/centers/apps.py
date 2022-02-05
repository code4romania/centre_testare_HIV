from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class TestingCentersConfig(AppConfig):
    name = "centers"
    verbose_name = _("Testing Centers")
