from testing_centers_site.settings.base import *

DEBUG = True
ALLOWED_HOSTS = ["*"]
CORS_ORIGIN_ALLOW_ALL = True
SECRET_KEY = env.str("SECRET_KEY")

EMAIL_BACKEND = "django_q_email.backends.DjangoQBackend"

if ENABLE_DEBUG_TOOLBAR:
    INSTALLED_APPS += ["debug_toolbar", "django_extensions"]
    MIDDLEWARE.insert(1, "debug_toolbar.middleware.DebugToolbarMiddleware")

    def show_toolbar(_):
        return True

    DEBUG_TOOLBAR_CONFIG = {
        "SHOW_TOOLBAR_CALLBACK": show_toolbar,
    }

STATIC_ROOT = os.path.join(BASE_DIR, "static")
STATICFILES_DIRS = []
