from django.conf import settings
from django.conf.urls.i18n import i18n_patterns
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework import routers

from blog.views import PostViewSet, TagViewSet
from centers.views import (
    CenterRatingQuestionsViewSet,
    CenterTestTypesViewSet,
    ScheduleRatingReminder,
    TestingCenterViewSet,
    TestingCentersViewSet,
    statistics,
)
from contact.views import ContactViewSet
from pages.views import PagesViewSet

admin.site.site_title = admin.site.site_header = admin.site.index_title = settings.ADMIN_TITLE

router = routers.DefaultRouter()
router.register(r"center", TestingCenterViewSet, basename="center")
router.register(r"centers", TestingCentersViewSet, basename="centers")
router.register(r"center_questions", CenterRatingQuestionsViewSet, basename="center_questions")
router.register(r"schedule_email", ScheduleRatingReminder, basename="center_rating_reminder")
router.register(r"contact", ContactViewSet, basename="contact"),
router.register(r"page", PagesViewSet, basename="page")
router.register(r"post", PostViewSet, basename="post")
router.register(r"tag", TagViewSet, basename="tag")
router.register(r"test_type", CenterTestTypesViewSet, basename="test_type")


urlpatterns = (
    i18n_patterns(
        # URL patterns which accept a language prefix
        path("password_reset/", auth_views.PasswordResetView.as_view(), name="admin_password_reset"),
        path("password_reset/done/", auth_views.PasswordResetDoneView.as_view(), name="password_reset_done"),
        path("reset/<uidb64>/<token>/", auth_views.PasswordResetConfirmView.as_view(), name="password_reset_confirm"),
        path("reset/done/", auth_views.PasswordResetCompleteView.as_view(), name="password_reset_complete"),
        path("ckeditor/", include("ckeditor_uploader.urls")),
        path("api/v1/", include(router.urls)),
        path("api/v1/statistics/", statistics, name="statistics"),
        path("i18n/", include("django.conf.urls.i18n")),
        path("api/v1/schema/", SpectacularAPIView.as_view(), name="schema"),
        path("api/v1/schema/swagger-ui/", SpectacularSwaggerView.as_view(url_name="swagger-ui"), name="swagger-ui"),
    )
    + [
        # TODO: Remove this when we have a proper frontend
        # URL patterns which do not use a language prefix
        path("api/v1/", include(router.urls)),
        path("api/v1/statistics/", statistics, name="statistics"),
        path("i18n/", include("django.conf.urls.i18n")),
        path("api/v1/schema/", SpectacularAPIView.as_view(), name="schema"),
        path(
            "api/v1/schema/swagger-ui/",
            SpectacularSwaggerView.as_view(url_name="swagger-ui"),
            name="swagger-ui",
        ),
    ]
    + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    + i18n_patterns(path("", admin.site.urls, name="admin"))
)

if settings.ENABLE_DEBUG_TOOLBAR:
    import debug_toolbar

    urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
