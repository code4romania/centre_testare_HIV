from django.db import models
from django.utils.translation import get_language, gettext_lazy as _


class CenterTestTypes(models.Model):
    name_en = models.CharField("test type", max_length=200, unique=True, blank=False, default="")
    name_ro = models.CharField("tip de test", max_length=200, unique=True, blank=False, default="")

    objects = models.Manager()

    @property
    def test_type_name(self):
        current_language = get_language()
        if "ro" in current_language:
            return self.name_ro
        else:
            return self.name_en

    def __str__(self):
        return self.test_type_name

    class Meta:
        verbose_name = _("test type")
        verbose_name_plural = _("test types")


class ApprovedTestingCenter(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(status=TestingCenter.ACCEPTED)


class TestingCenter(models.Model):
    PENDING = 0
    ACCEPTED = 1
    REJECTED = -1
    CENTER_STATUS_CHOICES = [
        (PENDING, _("Pending")),
        (ACCEPTED, _("Accepted")),
        (REJECTED, _("Rejected")),
    ]

    status = models.SmallIntegerField(_("status"), default=PENDING, choices=CENTER_STATUS_CHOICES, db_index=True)

    street_number = models.CharField(_("street number"), max_length=100)
    street_name = models.CharField(_("street name"), max_length=250)
    county = models.CharField(_("county"), max_length=60)
    locality = models.CharField(_("locality"), max_length=60)

    full_address = models.CharField(_("full address"), max_length=470)

    lat = models.DecimalField(_("latitude"), max_digits=9, decimal_places=6)
    lng = models.DecimalField(_("longitude"), max_digits=9, decimal_places=6)

    website = models.CharField(_("website"), max_length=200, null=True, blank=True)
    phone_number = models.CharField(_("phone number"), max_length=13, null=True, blank=True)
    schedule = models.CharField(_("schedule"), max_length=20, null=True, blank=True)

    test_types = models.ManyToManyField(CenterTestTypes, verbose_name=_("test types"), blank=True)

    objects = models.Manager()
    approved = ApprovedTestingCenter()

    def save(self, **kwargs):
        self.full_address = f"{self.street_name} {self.street_number} - {self.county}, {self.locality}"
        super(TestingCenter, self).save(**kwargs)

    def __str__(self):
        return self.full_address


class CenterRating(models.Model):
    RATING_CHOICES = [(0, "0"), (1, "1"), (2, "2"), (3, "3"), (4, "4"), (5, "5")]

    rating = models.SmallIntegerField(_("rating"), default=0, choices=RATING_CHOICES, db_index=True)
    comment = models.CharField(_("comment"), max_length=1000, blank=True)

    testing_center = models.ForeignKey(TestingCenter, on_delete=models.CASCADE, related_name=_("ratings"))

    created_at = models.DateTimeField(_("creation date"), auto_now_add=True)

    objects = models.Manager()

    def __str__(self):
        return f"{self.rating}/{self.RATING_CHOICES[-1][-1]} ({self.created_at.strftime('%d/%m/%Y')})"

    class Meta:
        verbose_name = _("center rating")
        verbose_name_plural = _("center ratings")


class Statistic(models.Model):
    mobile_caravans = models.IntegerField(_("mobile caravans"), null=True)
    hotline = models.SmallIntegerField(_("hotline"), null=True)

    objects = models.Manager()

    class Meta:
        verbose_name = _("statistic")
        verbose_name_plural = _("statistics")

    def __str__(self):
        return "Statistics"


class DataFile(models.Model):
    NOT_TRIED = 0
    SUCCESS = 1
    FAILURE = -1

    DATA_FILE_STATUS_CHOICES = [
        (NOT_TRIED, _("Not tried")),
        (SUCCESS, _("Imported successfully")),
        (FAILURE, _("Import failed")),
    ]

    name = models.CharField(_("name"), unique=True, max_length=255)
    file = models.FileField(_("file"))
    status = models.SmallIntegerField(_("status"), default=0, editable=False, choices=DATA_FILE_STATUS_CHOICES)

    objects = models.Manager()

    class Meta:
        verbose_name = _("Data file")
        verbose_name_plural = _("Data files")

    def __str__(self):
        return self.name
