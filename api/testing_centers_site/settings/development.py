import os

from testing_centers_site.settings.base import *

DEBUG = True
ALLOWED_HOSTS = ["*"]
CORS_ORIGIN_ALLOW_ALL = True
SECRET_KEY = "secret"

if env("DEV_ENABLE_EMAIL_SMTP") == "yes":
    EMAIL_BACKEND = "django_q_email.backends.DjangoQBackend"
else:
    EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

INSTALLED_APPS = ["whitenoise.runserver_nostatic"] + INSTALLED_APPS

if env("RUN_DEV_SERVER") == "yes":
    INSTALLED_APPS.append("django_extensions")

if ENABLE_DEBUG_TOOLBAR:
    INSTALLED_APPS.append("debug_toolbar")
    MIDDLEWARE.insert(1, "debug_toolbar.middleware.DebugToolbarMiddleware")

    def show_toolbar(_):
        return True

    DEBUG_TOOLBAR_CONFIG = {
        "SHOW_TOOLBAR_CALLBACK": show_toolbar,
    }

if not DEBUG:
    STATICFILES_DIRS = []
