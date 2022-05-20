from testing_centers_site.settings.base import *

DEBUG = TEMPLATE_DEBUG = False

SECRET_KEY = env.str("SECRET_KEY")

MIDDLEWARE.append("request_logging.middleware.LoggingMiddleware")

EMAIL_BACKEND = "django_q_email.backends.DjangoQBackend"

ALLOWED_HOSTS = env.list("ALLOWED_HOSTS")

CORS_ALLOWED_ORIGINS = env.list("CORS_ALLOWED_ORIGINS")
CORS_ALLOWED_ORIGIN_REGEXES = env.list("CORS_ALLOWED_ORIGIN_REGEXES")

CORS_ORIGIN_ALLOW_ALL = False
