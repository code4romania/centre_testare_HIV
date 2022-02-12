from django.conf import settings
from rest_framework import serializers

from centers.models import CenterRating, CenterTestTypes, Statistic, TestingCenter


class TestTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CenterTestTypes
        fields = ("pk", "name_ro", "name_en")


class CenterRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = CenterRating
        fields = ("rating", "comment", "created_at",)


class TestingCenterSerializer(serializers.ModelSerializer):
    test_types = serializers.SerializerMethodField("get_test_types")
    county_code = serializers.SerializerMethodField("get_county_code")
    ratings = CenterRatingSerializer(many=True, read_only=True)

    @staticmethod
    def get_test_types(obj: TestingCenter) -> list:
        return [{"pk": t.pk, "name_ro": t.name_ro, "name_en": t.name_en} for t in obj.test_types.all()]

    @staticmethod
    def get_county_code(obj: TestingCenter) -> str:
        county = obj.county
        return settings.COUNTIES_SHORTNAME.get(county, county[0:2].upper())

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
            "phone_number",
            "schedule",
            "test_types",
            "ratings",
        )


class TestingCenterListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestingCenter
        fields = ("pk", "lat", "lng")


class SearchQuerySerializer(serializers.Serializer):
    query = serializers.CharField(max_length=100)
    riskCategory = serializers.CharField(required=False, default="")


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
