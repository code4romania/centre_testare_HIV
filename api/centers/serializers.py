from django.conf import settings
from rest_framework import serializers

from centers.models import CenterTestTypes, Statistic, TestingCenter


class BaseCenterSerializer(serializers.ModelSerializer):
    county_code = serializers.SerializerMethodField("get_county_code")

    @staticmethod
    def get_county_code(obj: TestingCenter) -> str:
        county = obj.county
        return settings.COUNTIES_SHORTNAME.get(county, county[0:2].upper())


class TestingCenterSerializer(BaseCenterSerializer):
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
        )


class TestingCenterListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestingCenter
        fields = ("pk", "lat", "lng")


class SearchQuerySerializer(serializers.Serializer):
    query = serializers.CharField(max_length=100)
    riskCategory = serializers.CharField(required=False, default="")


class CenterSearchSerializer(BaseCenterSerializer):
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


class TestTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CenterTestTypes
        fields = "__all__"
