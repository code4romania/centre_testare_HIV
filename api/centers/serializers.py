from typing import List

from django.conf import settings
from django.db.models import Avg
from rest_framework import serializers

from centers.models import CenterRating, CenterTestTypes, Statistic, TestingCenter


class TestTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CenterTestTypes
        fields = ("pk", "name_ro", "name_en")


class CenterRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = CenterRating
        fields = ("rating", "comment", "created_at")


class TestingCenterSerializer(serializers.ModelSerializer):
    emails = serializers.SerializerMethodField("get_emails")
    phone_numbers = serializers.SerializerMethodField("get_phone_numbers")
    test_types = serializers.SerializerMethodField("get_test_types")
    necessary_documents_under_18 = serializers.SerializerMethodField("get_necessary_documents_under_18")
    necessary_documents_under_16 = serializers.SerializerMethodField("get_necessary_documents_under_16")
    county_code = serializers.SerializerMethodField("get_county_code")
    average_rating = serializers.SerializerMethodField("get_average_rating")
    number_of_ratings = serializers.SerializerMethodField("get_number_of_ratings")

    ratings = CenterRatingSerializer(many=True, read_only=True)

    def get_test_types(self, obj: TestingCenter) -> List:
        return self._get_many_to_many_name_center_field(obj, "test_types")

    def get_necessary_documents_under_18(self, obj: TestingCenter) -> List:
        return self._get_many_to_many_name_center_field(obj, "necessary_documents_under_18")

    def get_necessary_documents_under_16(self, obj: TestingCenter) -> List:
        return self._get_many_to_many_name_center_field(obj, "necessary_documents_under_16")

    @staticmethod
    def get_emails(obj: TestingCenter) -> List:
        return [t.email for t in obj.emails.all()]

    @staticmethod
    def get_phone_numbers(obj: TestingCenter) -> List:
        return [t.phone_number for t in obj.phone_numbers.all()]

    @staticmethod
    def get_county_code(obj: TestingCenter) -> str:
        county = obj.county
        return settings.COUNTIES_SHORTNAME.get(county, county[0:2].upper())

    @staticmethod
    def get_average_rating(obj: TestingCenter) -> float:
        average = CenterRating.objects.filter(testing_center_id=obj.pk).aggregate(Avg("rating"))["rating__avg"]
        average = average or 0
        return round(average, 2)

    @staticmethod
    def get_number_of_ratings(obj: TestingCenter) -> int:
        return CenterRating.objects.filter(testing_center_id=obj.pk).count()

    @staticmethod
    def _get_many_to_many_name_center_field(obj: TestingCenter, field: str) -> List:
        item_data = [item.name for item in getattr(obj, field).all()]
        return item_data

    class Meta:
        model = TestingCenter
        fields = (
            "pk",
            "lat",
            "lng",
            "street_name",
            "street_number",
            "locality",
            "county_code",
            "website",
            "phone_numbers",
            "schedule",
            "test_types",
            "emails",
            "necessary_documents_under_18",
            "necessary_documents_under_16",
            "average_rating",
            "number_of_ratings",
            "ratings",
        )


class TestingCenterAddRatingSerializer(serializers.ModelSerializer):
    ratings = CenterRatingSerializer(many=True)

    class Meta:
        model = TestingCenter
        fields = ("pk", "ratings")

    def update(self, testing_center, validated_data):
        ratings = validated_data.pop("ratings")
        for rating in ratings:
            CenterRating.objects.create(testing_center=testing_center, **rating)
        return testing_center


class TestingCenterListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestingCenter
        fields = ("pk", "lat", "lng")


class SearchQuerySerializer(serializers.Serializer):
    query = serializers.CharField(max_length=100)


class CenterSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestingCenter
        fields = ("pk", "lat", "lng", "full_address")


class StatisticSerializer(serializers.ModelSerializer):
    public_centers = serializers.SerializerMethodField("get_public_centers")

    @staticmethod
    def get_public_centers(_):
        public_centers = TestingCenter.approved.count()
        return int(public_centers)

    class Meta:
        model = Statistic
        fields = ("mobile_caravans", "public_centers", "hotline")
