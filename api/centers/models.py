from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils.translation import gettext_lazy as _


class CenterType(models.Model):
    name = models.CharField("center type", max_length=200, unique=True, blank=False, null=False)

    objects = models.Manager()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _("center type")
        verbose_name_plural = _("center types")


class CenterTestTypes(models.Model):
    name = models.CharField("test type", max_length=200, unique=True, blank=False, null=False)

    objects = models.Manager()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _("test type")
        verbose_name_plural = _("test types")


class NecessaryDocuments(models.Model):
    name = models.CharField(_("document name"), max_length=300, unique=True, blank=False, null=False)

    objects = models.Manager()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _("necessary document")
        verbose_name_plural = _("necessary documents")


class FreeTestingConditions(models.Model):
    name = models.CharField(_("type of condition"), max_length=300, unique=True, blank=False, null=False)

    objects = models.Manager()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _("free testing condition")
        verbose_name_plural = _("free testing conditions")


class ApprovedTestingCenter(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(status=TestingCenter.ACCEPTED)


class CenterEmail(models.Model):
    email = models.EmailField(_("email"), max_length=320, unique=True, blank=False, null=False)

    create_time = models.DateTimeField(_("time created"), auto_now_add=True)
    update_time = models.DateTimeField(_("time updated"), auto_now=True)

    objects = models.Manager()

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = _("email")
        verbose_name_plural = _("emails")


class CenterPhoneNumber(models.Model):
    phone_number = models.CharField(_("phone number"), max_length=20, null=True, blank=True)

    create_time = models.DateTimeField(_("time created"), auto_now_add=True)
    update_time = models.DateTimeField(_("time updated"), auto_now=True)

    objects = models.Manager()

    def __str__(self):
        return self.phone_number

    class Meta:
        verbose_name = _("phone number")
        verbose_name_plural = _("phone numbers")


class TestingCenter(models.Model):
    PENDING = 0
    ACCEPTED = 1
    REJECTED = -1
    STATUS_CHOICES = (
        (PENDING, _("Pending")),
        (ACCEPTED, _("Accepted")),
        (REJECTED, _("Rejected")),
    )

    CONTACT_NONE = -1
    CONTACT_EMAIL = 0
    CONTACT_FORM = 1
    SCHEDULE_FORM = 2
    CONTACT_CHOICES = (
        (CONTACT_NONE, _("None")),
        (CONTACT_EMAIL, _("Email")),
        (CONTACT_FORM, _("Contact form")),
        (SCHEDULE_FORM, _("Schedule form")),
    )

    DISCLOSURE_OTHER = -1
    DISCLOSURE_FACE_TO_FACE = 0
    DISCLOSURE_EMAIL = 1
    DISCLOSURE_PHONE = 2
    DISCLOSURE_MAIL = 3
    DISCLOSURE_PLATFORM = 4
    TEST_DISCLOSURE_CHOICES = (
        (DISCLOSURE_OTHER, _("Other")),
        (DISCLOSURE_FACE_TO_FACE, _("Face to face")),
        (DISCLOSURE_EMAIL, _("Email")),
        (DISCLOSURE_PHONE, _("Phone")),
        (DISCLOSURE_MAIL, _("Mail")),
        (DISCLOSURE_PLATFORM, _("Platform")),
    )

    status = models.SmallIntegerField(_("status"), default=PENDING, choices=STATUS_CHOICES, db_index=True)

    name = models.CharField(_("center name"), max_length=200, default="", null=False, blank=False)
    street_number = models.CharField(_("street number"), max_length=100)
    street_name = models.CharField(_("street name"), max_length=250)
    address_details = models.CharField(_("address details"), max_length=250, blank=True, default="")
    county = models.CharField(_("county"), max_length=60)
    locality = models.CharField(_("locality"), max_length=60)

    full_address = models.CharField(_("full address"), max_length=720)

    lat = models.DecimalField(_("latitude"), max_digits=9, decimal_places=6)
    lng = models.DecimalField(_("longitude"), max_digits=9, decimal_places=6)

    type = models.ForeignKey(CenterType, on_delete=models.DO_NOTHING, related_name=_("centers"), null=True, blank=True)
    schedule_start = models.CharField(_("schedule start"), max_length=20, null=True, blank=True)
    schedule_end = models.CharField(_("schedule end"), max_length=20, null=True, blank=True)

    online_contact_type = models.SmallIntegerField(
        _("online contact type"), choices=CONTACT_CHOICES, default=CONTACT_NONE
    )
    emails = models.ManyToManyField(CenterEmail, related_name="centers", verbose_name=_("center email(s)"), blank=True)
    website = models.CharField(_("website"), max_length=200, null=True, blank=True)
    phone_numbers = models.ManyToManyField(
        CenterPhoneNumber, related_name="centers", verbose_name=_("center phone number(s)"), blank=True
    )

    test_types = models.ManyToManyField(CenterTestTypes, verbose_name=_("test types"), blank=True)
    testing_price = models.FloatField(_("testing price"), null=True, blank=True)
    is_free_testing_available = models.BooleanField(_("is free testing available"), default=False)
    free_testing_conditions = models.ManyToManyField(FreeTestingConditions, related_name=_("centers"), blank=True)

    quick_test_wait_time_minutes = models.IntegerField(_("quick test wait time in minutes"), null=True, blank=True)
    quick_test_wait_time_days = models.IntegerField(_("quick test wait time in days"), null=True, blank=True)

    negative_result_disclosure = models.SmallIntegerField(
        _("negative result disclosure"), choices=TEST_DISCLOSURE_CHOICES, default=CONTACT_NONE, null=True, blank=True
    )
    positive_result_disclosure = models.SmallIntegerField(
        _("positive result disclosure"), choices=TEST_DISCLOSURE_CHOICES, default=CONTACT_NONE, null=True, blank=True
    )

    has_pre_testing_counseling = models.BooleanField(_("has pre-test counseling"), default=False)
    pre_testing_counseling_conditions = models.SmallIntegerField(
        _("pre-test counseling conditions"),
        choices=TEST_DISCLOSURE_CHOICES,
        default=CONTACT_NONE,
        null=True,
        blank=True,
    )
    has_post_testing_counseling = models.BooleanField(_("has post-test counseling"), default=False)
    post_testing_counseling_conditions = models.SmallIntegerField(
        _("post-test counseling conditions"),
        choices=TEST_DISCLOSURE_CHOICES,
        default=CONTACT_NONE,
        null=True,
        blank=True,
    )

    necessary_documents_under_18 = models.ManyToManyField(NecessaryDocuments, related_name=_("centers_u18"), blank=True)
    necessary_documents_under_16 = models.ManyToManyField(NecessaryDocuments, related_name=_("centers_u16"), blank=True)

    create_time = models.DateTimeField(_("time created"), auto_now_add=True)
    update_time = models.DateTimeField(_("time updated"), auto_now=True)

    objects = models.Manager()
    approved = ApprovedTestingCenter()

    def save(self, **kwargs):
        self.full_address = (
            f"{self.name}: "
            f"{self.street_name} {self.street_number} {self.address_details}"
            " - "
            f"{self.county}, {self.locality}"
        ).replace("  ", " ")
        super(TestingCenter, self).save(**kwargs)

    def __str__(self):
        return self.full_address

    @property
    def schedule(self):
        if self.schedule_start and self.schedule_end:
            return "{} - {}".format(self.schedule_start, self.schedule_end)
        return ""

    class Meta:
        verbose_name = _("testing center")
        verbose_name_plural = _("testing centers")


class CenterRating(models.Model):
    MIN_VALUE = 1
    MAX_VALUE = 5

    rating = models.SmallIntegerField(
        _("rating ({}-{})".format(MIN_VALUE, MAX_VALUE)),
        validators=[MinValueValidator(MIN_VALUE), MaxValueValidator(MAX_VALUE)],
        db_index=True,
    )
    comment = models.CharField(_("comment"), max_length=1000, blank=True)
    created_at = models.DateTimeField(_("creation date"), auto_now_add=True)

    testing_center = models.ForeignKey(TestingCenter, on_delete=models.CASCADE, related_name=_("ratings"))

    objects = models.Manager()

    def __str__(self):
        return f"{self.rating}/{self.MAX_VALUE} ({self.created_at.strftime('%d/%m/%Y')})"

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
