from django.conf import settings
from rest_framework import serializers
from taggit.models import Tag
from taggit.serializers import TaggitSerializer, TagListSerializerField

from blog.models import Post


class FixAbsolutePathSerializer(serializers.ReadOnlyField):
    SEARCH_PATTERN = 'img src="/media/uploads/'
    REPLACE_WITH = f'img src="{settings.SITE_URL}/media/uploads/'

    def to_representation(self, value):
        text = value.replace(self.SEARCH_PATTERN, self.REPLACE_WITH)
        return text


class TagSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tag
        fields = ("name", "slug")


class PostSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()
    author_first_name = serializers.ReadOnlyField(source="author.first_name")
    author_last_name = serializers.ReadOnlyField(source="author.last_name")
    text = FixAbsolutePathSerializer()

    class Meta:
        model = Post
        fields = [
            "author_first_name",
            "author_last_name",
            "title",
            "slug",
            "image",
            "text",
            "preview_text",
            "tags",
            "published",
            "created",
            "updated",
        ]
        extra_kwargs = {"url": {"lookup_field": "slug"}}
