import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "testing_centers_site.settings.development")

application = get_wsgi_application()
