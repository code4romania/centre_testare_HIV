"""
Django settings for testing_centers_site project.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

import os
from typing import Any, Dict

import environ
from django.utils.translation import gettext_lazy as _

env = environ.Env(
    # set casting, default value
    AWS_ACCESS_KEY_ID=(str, ""),
    AWS_S3_REGION_NAME=(str, ""),
    AWS_SECRET_ACCESS_KEY=(str, ""),
    AWS_STORAGE_BUCKET_NAME=(str, ""),
    AWS_SUBDOMAIN=(str, "s3.amazonaws.com"),
    DEBUG=(str, "no"),
    DEFAULT_FROM_EMAIL=(str, "noreply@code4.ro"),
    DEV_ENABLE_EMAIL_SMTP=(str, "no"),
    DJANGO_LOG_LEVEL=(str, "INFO"),
    EMAIL_HOST=(str, "localhost"),
    EMAIL_HOST_PASSWORD=(str, "password"),
    EMAIL_HOST_USER=(str, "user"),
    EMAIL_PORT=(str, "25"),
    EMAIL_USE_SSL=(str, "no"),
    EMAIL_USE_TLS=(str, "yes"),
    ENABLE_DEBUG_TOOLBAR=(str, "no"),
    ENVIRONMENT=(str, "production"),
    HERE_MAPS_API_KEY=(str, ""),
    HOME_SITE_URL=(str, ""),
    LANGUAGE_CODE=(str, "en"),
    NO_REPLY_EMAIL=(str, "noreply@code4.ro"),
    REACT_APP_DJANGO_PORT=(str, ""),
    REACT_APP_DJANGO_SITE_URL=(str, ""),
    REDIS_HOST=(str, "redis"),
    REDIS_PORT=(int, 6379),
    USE_S3=(str, "no"),
)

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../..")

ADMIN_TITLE = _("Testing Centers")

DEBUG = env("DEBUG") == "yes"
ENVIRONMENT = env("ENVIRONMENT")
ENABLE_DEBUG_TOOLBAR = bool(DEBUG and env("ENABLE_DEBUG_TOOLBAR") == "yes")

SUPER_ADMIN_EMAIL = env("SUPER_ADMIN_EMAIL")
SUPER_ADMIN_PASS = env("SUPER_ADMIN_PASS")
SUPER_ADMIN_FIRST_NAME = env("SUPER_ADMIN_FIRST_NAME")
SUPER_ADMIN_LAST_NAME = env("SUPER_ADMIN_LAST_NAME")

DJANGO_SITE_URL = env("REACT_APP_DJANGO_SITE_URL")
DJANGO_PORT = env("REACT_APP_DJANGO_PORT")
DJANGO_PORT = f":{DJANGO_PORT}" if DJANGO_PORT else ""

SITE_URL = f"{DJANGO_SITE_URL}{DJANGO_PORT}"
HOME_SITE_URL = env("HOME_SITE_URL") or SITE_URL

REDIS_HOST = env("REDIS_HOST")
REDIS_PORT = env("REDIS_PORT")

ALLOWED_HOSTS = []
CORS_ORIGIN_ALLOW_ALL = False

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "[%(asctime)s] %(levelname)s %(pathname)s:%(lineno)d %(funcName)s %(message)s",
            "datefmt": "%d/%m/%Y %H:%M:%S",
        },
        "simple": {
            "format": "[%(asctime)s] %(levelname)s %(message)s",
            "datefmt": "%d/%m/%Y %H:%M:%S",
        },
    },
    "handlers": {
        "console": {
            "level": "INFO",
            "class": "logging.StreamHandler",
            "formatter": "simple" if ENVIRONMENT == "production" else "verbose",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "WARNING",
    },
    "loggers": {
        "django": {
            "handlers": ["console"],
            "level": env("DJANGO_LOG_LEVEL"),
            "propagate": False,
        },
    },
}

INSTALLED_APPS = [
    "jazzmin",
    # third-party apps where the order matters
    "modeltranslation",
    # django apps
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",
    "django.contrib.sitemaps",
    "django.contrib.humanize",
    "django.contrib.postgres",
    # third-party apps
    "import_export",
    "rest_framework",
    "django_filters",
    "storages",
    "taggit",
    "taggit_serializer",
    "corsheaders",
    "ckeditor",
    "ckeditor_uploader",
    "django_q",
    # project apps
    "static_custom",
    "centers",
    "contact",
    "pages",
    "blog",
    # api documentation
    "drf_spectacular",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

SITE_ID = 1

ROOT_URLCONF = "testing_centers_site.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "APP_DIRS": True,
        "DIRS": [os.path.join(BASE_DIR, "templates")],
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ]
        },
    }
]

WSGI_APPLICATION = "testing_centers_site.wsgi.application"

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

if env("ENVIRONMENT") == "test":
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": "/tmp/test.db",  # noqa
        }
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql_psycopg2",
            "NAME": env("DATABASE_NAME"),
            "USER": env("DATABASE_USER"),
            "PASSWORD": env("DATABASE_PASSWORD"),
            "HOST": env("DATABASE_HOST"),
            "PORT": env("DATABASE_PORT"),
        }
    }

DEFAULT_AUTO_FIELD = "django.db.models.AutoField"

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},  # noqa
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},  # noqa
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},  # noqa
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},  # noqa
]

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = env("LANGUAGE_CODE")
TIME_ZONE = "Europe/Bucharest"
USE_I18N = True
USE_L10N = True
USE_TZ = True

LANGUAGES = [
    ("ro", _("Romanian")),
    ("en", _("English")),
]
SHORT_LANGUAGES = [language[0] for language in LANGUAGES]

MODELTRANSLATION_DEFAULT_LANGUAGE = "ro"

# SMTP
NO_REPLY_EMAIL = env("NO_REPLY_EMAIL")
DEFAULT_FROM_EMAIL = env("DEFAULT_FROM_EMAIL")

EMAIL_HOST = env("EMAIL_HOST")
EMAIL_PORT = env("EMAIL_PORT")
EMAIL_HOST_USER = env("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD")
EMAIL_USE_TLS = env("EMAIL_USE_TLS") == "yes"
EMAIL_USE_SSL = env("EMAIL_USE_SSL") == "yes"

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

USE_S3 = (
    (env("USE_S3")) == "yes"
    and env("AWS_ACCESS_KEY_ID")
    and env("AWS_SECRET_ACCESS_KEY")
    and env("AWS_STORAGE_BUCKET_NAME")
)

if USE_S3:
    # aws settings
    AWS_ACCESS_KEY_ID = env("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = env("AWS_SECRET_ACCESS_KEY")
    AWS_STORAGE_BUCKET_NAME = env("AWS_STORAGE_BUCKET_NAME")
    AWS_DEFAULT_ACL = None
    AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.{env("AWS_SUBDOMAIN")}'
    AWS_S3_OBJECT_PARAMETERS = {"CacheControl": "max-age=86400"}
    AWS_S3_FILE_OVERWRITE = False
    AWS_S3_REGION_NAME = env("AWS_S3_REGION_NAME")
    # s3 public media settings
    PUBLIC_MEDIA_LOCATION = "media"
    MEDIA_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/{PUBLIC_MEDIA_LOCATION}/"
    DEFAULT_FILE_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
else:
    PRIVATE_FILE_STORAGE = "django.core.files.storage.FileSystemStorage"
    MEDIA_URL = "/media/"
    MEDIA_ROOT = os.path.join(BASE_DIR, "./public/media")

STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static")
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

LOCALE_PATHS = (os.path.join(BASE_DIR, "locale"),)

CKEDITOR_UPLOAD_PATH = "uploads/"

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": f"redis://{REDIS_HOST}:{REDIS_PORT}/?db=2",
        "KEY_PREFIX": "default",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            "IGNORE_EXCEPTIONS": False,
        },
    },
    "throttling": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": f"redis://{REDIS_HOST}:{REDIS_PORT}/?db=1",
        "KEY_PREFIX": "throttling",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            "IGNORE_EXCEPTIONS": False,
        },
    },
    "scheduling": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": f"redis://{REDIS_HOST}:{REDIS_PORT}/?db=0",
        "KEY_PREFIX": "scheduling",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            "IGNORE_EXCEPTIONS": False,
        },
    },
}

DJANGO_REDIS_IGNORE_EXCEPTIONS = False
DJANGO_REDIS_LOGGER = "django"

REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly"],
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_FILTER_BACKENDS": ["django_filters.rest_framework.DjangoFilterBackend"],
}

TRIGRAM_SIMILARITY_THRESHOLD = 0.1
SEARCH_RANKING_THRESHOLD = 0.1

SPECTACULAR_SETTINGS = {
    "VERSION": "0.1.0",
    "SWAGGER_UI_SETTINGS": {"url": "/api/v1/schema"},
}

HERE_MAPS_API_KEY = env("HERE_MAPS_API_KEY")
HERE_MAPS = {"api_key": HERE_MAPS_API_KEY}

ACCEPTED_IMAGE_TYPES = {
    "jpeg": "JPEG",
    "jpg": "JPEG",
    "png": "PNG",
}
COUNTIES_SHORTNAME = {
    "Arad": "AR",
    "Arges": "AG",
    "Argeș": "AG",
    "Bacau": "BC",
    "Bacău": "BC",
    "Bihor": "BH",
    "Bistrita-Nasaud": "BN",
    "Bistrița-Năsăud": "BN",
    "Botosani": "BT",
    "Botoșani": "BT",
    "Brasov": "BV",
    "Brașov": "BV",
    "Brsila": "BR",
    "Brăila": "BR",
    "Bucharest": "B",
    "Bucuresti": "B",
    "București": "B",
    "Buzau": "BZ",
    "Buzău": "BZ",
    "Calarasi": "CL",
    "Caras-Severin": "CS",
    "Caraș-Severin": "CS",
    "Cluj": "CJ",
    "Constanta": "CT",
    "Constanța": "CT",
    "Covasna": "CV",
    "Călărași": "CL",
    "Dambovita": "DB",
    "Dolj": "DJ",
    "Dâmbovița": "DB",
    "Galati": "GL",
    "Galați": "GL",
    "Giurgiu": "GR",
    "Gorj": "GJ",
    "Harghita": "HR",
    "Hunedoara": "HD",
    "Ialomita": "IL",
    "Ialomița": "IL",
    "Iasi": "IS",
    "Iași": "IS",
    "Ilfov": "IF",
    "Maramures": "MM",
    "Maramureș": "MM",
    "Mehedinti": "MH",
    "Mehedinți": "MH",
    "Mures": "MS",
    "Mureș": "MS",
    "Neamt": "NT",
    "Neamț": "NT",
    "Olt": "OT",
    "Prahova": "PH",
    "Salaj": "SJ",
    "Satu Mare": "SM",
    "Sibiu": "SB",
    "Suceava": "SV",
    "Sălaj": "SJ",
    "Teleorman": "TR",
    "Timis": "TM",
    "Timiș": "TM",
    "Tulcea": "TL",
    "Valcea": "VL",
    "Vaslui": "VS",
    "Vrancea": "VN",
    "Vâlcea": "VL",
}

# django-q https://django-q.readthedocs.io/en/latest/configure.html
Q_CLUSTER = {
    "name": "centre-hiv",
    "recycle": 500,
    "timeout": 60,
    "workers": 4,
    "cpu_affinity": 2,
    "save_limit": 250,
    "queue_limit": 500,
    "label": "Django Q",
    "scheduler": True,
    "django_redis": "scheduling",
}

# django-jazzmin
# -------------------------------------------------------------------------------
# django-jazzmin - https://django-jazzmin.readthedocs.io/configuration/

JAZZMIN_SETTINGS: Dict[str, Any] = {
    # title of the window
    "site_title": ADMIN_TITLE,
    # Title on the brand, and the login screen (19 chars max)
    "site_header": ADMIN_TITLE,
    # square logo to use for your site, must be present in static files, used for favicon and brand on top left
    "site_logo": "jazzmin/img/centre-testare-hiv-logomark.svg",
    "site_logo_short": "jazzmin/img/centre-testare-hiv-logomark.svg",
    "site_icon": "jazzmin/img/centre-testare-hiv-logomark.svg",
    "site_logo_classes": "site-logo",
    # Welcome text on the login screen
    "welcome_sign": "",
    # Copyright on the footer
    "copyright": "Code4Romania",
    # The model admin to search from the search bar, search bar omitted if excluded
    # "search_model": "donors.Donor",
    # The field name on user model that contains avatar image
    "user_avatar": None,
    ############
    # Top Menu #
    ############
    # Links to put along the top menu
    "topmenu_links": [
        # Url that gets reversed (Permissions can be added)
        {"name": "Home", "url": "admin:index", "permissions": ["auth.view_user"]},
    ],
    #############
    # User Menu #
    #############
    # Additional links to include in the user menu on the top right ("app" url type is not allowed)
    "usermenu_links": [
        {"model": "auth.user", "new_window": False},
    ],
    #############
    # Side Menu #
    #############
    # Whether to display the side menu
    "show_sidebar": True,
    # Whether to auto expand the menu
    "navigation_expanded": True,
    # Hide these apps when generating side menu e.g (auth)
    "hide_apps": ["pages", "sites"],
    # Hide these models when generating side menu (e.g auth.user)
    "hide_models": [],
    # List of apps (and/or models) to base side menu ordering off of (does not need to contain all apps/models)
    "order_with_respect_to": [
        "centers",
        "centers.testingcenter",
        "centers.centertype",
        "centers.centerrating",
        "centers.centerratingquestion",
        "centers.centeremail",
        "centers.centerphonenumber",
        "centers.necessarydocuments",
        "centers.freetestingconditions",
        "centers.centertesttypes",
        "centers.statistic",
        "centers.datafile",
        "contact",
        "contact.contactmessage",
        "blog",
        "blog.post",
        "taggit",
        "taggit.tag",
        "pages",
        "pages.category",
        "pages.page",
        "sites",
        "sites.site",
        "auth",
        "auth.group",
        "auth.user",
        "django_q",
        "django_q.schedule",
        "django_q.success",
        "django_q.failure",
    ],
    # Custom icons for side menu apps/models
    # See https://fontawesome.com/v5/search?m=free
    # for a list of icon classes
    "icons": {
        "auth.user": "fas fa-user",
        "auth.group": "fas fa-users",
        "blog.post": "fas fa-blog",
        "taggit.tag": "fas fa-tag",
        "contact.contactmessage": "fas fa-envelope-open-text",
        "centers.testingcenter": "fas fa-hospital",
        "centers.centerrating": "fas fa-star",
        "centers.centerratingquestion": "fas fa-question",
        "centers.centertype": "fas fa-cubes",
        "centers.centeremail": "fas fa-at",
        "centers.centerphonenumber": "fas fa-phone",
        "centers.necessarydocuments": "fas fa-folder-open",
        "centers.freetestingconditions": "fas fa-id-card-alt",
        "centers.centertesttypes": "fas fa-microscope",
        "centers.statistic": "fas fa-chart-bar",
        "centers.datafile": "fas fa-file",
        "pages.category": "fas fa-box",
        "pages.page": "fas fa-columns",
        "sites.site": "fas fa-sitemap",
        "django_q.schedule": "fas fa-layer-group",
        "django_q.success": "fas fa-check",
        "django_q.failure": "fas fa-exclamation",
    },
    # Icons that are used when one is not manually specified
    "default_icon_parents": "fas fa-chevron-circle-right",
    "default_icon_children": "fas fa-circle",
    #################
    # Related Modal #
    #################
    # Use modals instead of popups
    "related_modal_active": False,
    #############
    # UI Tweaks #
    #############
    # Relative paths to custom CSS/JS scripts (must be present in static files)
    "custom_css": "jazzmin/css/admin.css",
    "custom_js": "",
    # Whether to show the UI customizer on the sidebar
    "show_ui_builder": bool(ENVIRONMENT != "production"),
    ###############
    # Change view #
    ###############
    # Render out the change view as a single form, or in tabs, current options are
    # - single
    # - horizontal_tabs (default)
    # - vertical_tabs
    # - collapsible
    # - carousel
    "changeform_format": "single",
    # override change forms on a per modeladmin basis
    "changeform_format_overrides": {
        "auth.user": "collapsible",
        "auth.group": "vertical_tabs",
    },
    # Add a language dropdown into the admin
    "language_chooser": True,
}

if ENVIRONMENT != "production":
    JAZZMIN_SETTINGS["usermenu_links"].extend(
        [
            {
                "name": "Configuration",
                "url": "https://django-jazzmin.readthedocs.io/configuration/",
                "new_window": True,
                "icon": "fas fa-wrench",
            },
            {
                "name": "Support",
                "url": "https://github.com/farridav/django-jazzmin/issues",
                "new_window": True,
                "icon": "fas fa-question",
            },
        ]
    )

JAZZMIN_UI_TWEAKS = {
    "navbar_small_text": False,
    "footer_small_text": False,
    "body_small_text": True,
    "brand_small_text": False,
    "brand_colour": "navbar-gray",
    "accent": "accent-primary",
    "navbar": "navbar-success navbar-dark",
    "no_navbar_border": True,
    "navbar_fixed": True,
    "layout_boxed": False,
    "footer_fixed": False,
    "sidebar_fixed": True,
    "sidebar": "sidebar-dark-olive",
    "sidebar_nav_small_text": False,
    "sidebar_disable_expand": False,
    "sidebar_nav_child_indent": True,
    "sidebar_nav_compact_style": True,
    "sidebar_nav_legacy_style": False,
    "sidebar_nav_flat_style": True,
    "theme": "default",
    "dark_mode_theme": "darkly",
    "button_classes": {
        "primary": "btn-primary",
        "secondary": "btn-outline-secondary",
        "info": "btn-outline-info",
        "warning": "btn-warning",
        "danger": "btn-danger",
        "success": "btn-outline-success",
    },
}
