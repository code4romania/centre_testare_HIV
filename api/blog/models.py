from ckeditor_uploader.fields import RichTextUploadingField
from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import gettext_lazy as _
from taggit.managers import TaggableManager


class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.PROTECT, verbose_name=_("post"))

    slug = models.SlugField(_("slug"), unique=True)

    preview_text = models.CharField(_("preview text"), max_length=300)
    image = models.ImageField(_("image"), upload_to="blog/")
    tags = TaggableManager(_("tags"))

    title = models.CharField(_("title"), max_length=200)
    text = RichTextUploadingField(_("text"))

    is_visible = models.BooleanField(_("is visible"), default=False)
    published = models.DateTimeField(_("published"), blank=True, null=True)

    created = models.DateTimeField(_("created"), auto_now_add=True)
    updated = models.DateTimeField(_("updated"), auto_now=True)

    def get_absolute_url(self):
        from django.urls import reverse

        return reverse("post_detail", args=[self.slug])

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _("post")
        verbose_name_plural = _("posts")
