from typing import List

from django.conf import settings
from django.db.models import Avg
from rest_framework import serializers

from centers.models import CenterRating, CenterRatingQuestion, CenterTestTypes, Statistic, TestingCenter


class TestTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CenterTestTypes
        fields = ("pk", "name_ro", "name_en")


class CenterRatingQuestionsSerializer(serializers.ModelSerializer):
    answer_type = serializers.SerializerMethodField("get_answer_type")

    @staticmethod
    def get_answer_type(obj: CenterRatingQuestion) -> str:
        answer_id = obj.answer_type
        for answer in obj.ANSWER_TYPE_CHOICES:
            if answer_id == answer[0]:
                return str(answer[1])

    class Meta:
        model = CenterRatingQuestion
        fields = ("question", "answer_type")


class CenterRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = CenterRating
        fields = ("rating", "answers", "comment", "created_at")


class TestingCenterSerializer(serializers.ModelSerializer):
    emails = serializers.SerializerMethodField("get_emails")
    phone_numbers = serializers.SerializerMethodField("get_phone_numbers")
    test_types = serializers.SerializerMethodField("get_test_types")
    docs_u18 = serializers.SerializerMethodField("get_necessary_documents_under_18")
    docs_u16 = serializers.SerializerMethodField("get_necessary_documents_under_16")
    county_code = serializers.SerializerMethodField("get_county_code")
    average_rating = serializers.SerializerMethodField("get_average_rating")
    number_of_ratings = serializers.SerializerMethodField("get_number_of_ratings")

    negative_disclosure = serializers.SerializerMethodField("get_negative_disclosure")
    positive_disclosure = serializers.SerializerMethodField("get_positive_disclosure")
    pre_counseling = serializers.SerializerMethodField("get_pre_conditions_value")
    post_counseling = serializers.SerializerMethodField("get_post_conditions_value")
    online_contact_type = serializers.SerializerMethodField("get_online_contact_type")

    type = serializers.StringRelatedField(read_only=True)

    ratings = CenterRatingSerializer(many=True, read_only=True)

    def get_test_types(self, obj: TestingCenter) -> List:
        return self._get_many_to_many_name_center_field(obj, "test_types")

    def get_necessary_documents_under_18(self, obj: TestingCenter) -> List:
        return self._get_many_to_many_name_center_field(obj, "necessary_documents_under_18")

    def get_necessary_documents_under_16(self, obj: TestingCenter) -> List:
        return self._get_many_to_many_name_center_field(obj, "necessary_documents_under_16")

    def get_negative_disclosure(self, obj: TestingCenter) -> str:
        return self._get_disclosure_field(obj, obj.TEST_DISCLOSURE_CHOICES, "negative_result_disclosure")

    def get_positive_disclosure(self, obj: TestingCenter) -> str:
        return self._get_disclosure_field(obj, obj.TEST_DISCLOSURE_CHOICES, "positive_result_disclosure")

    def get_pre_conditions_value(self, obj: TestingCenter) -> str:
        return self._get_disclosure_field(obj, obj.TEST_DISCLOSURE_CHOICES, "pre_testing_counseling_conditions")

    def get_post_conditions_value(self, obj: TestingCenter) -> str:
        return self._get_disclosure_field(obj, obj.TEST_DISCLOSURE_CHOICES, "post_testing_counseling_conditions")

    def get_online_contact_type(self, obj: TestingCenter) -> str:
        return self._get_disclosure_field(obj, obj.CONTACT_CHOICES, "post_testing_counseling_conditions")

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
    def _get_disclosure_field(obj: TestingCenter, choices: tuple, field: str) -> str:
        disclosure_key = getattr(obj, field)
        for disclosure in choices:
            if disclosure_key == disclosure[0]:
                return str(disclosure[1])

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
            "type",
            "name",
            "street_name",
            "street_number",
            "address_details",
            "locality",
            "county_code",
            "online_contact_type",
            "website",
            "phone_numbers",
            "emails",
            "schedule_start",
            "schedule_end",
            "test_types",
            "testing_price",
            "is_free_testing_available",
            "free_testing_conditions",
            "quick_test_wait_time_minutes",
            "quick_test_wait_time_days",
            "negative_disclosure",
            "positive_disclosure",
            "has_pre_testing_counseling",
            "pre_counseling",
            "has_post_testing_counseling",
            "post_counseling",
            "docs_u18",
            "docs_u16",
            "number_of_ratings",
            "average_rating",
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


class TestingCenterPaginatedListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestingCenter
        fields = ("pk", "lat", "lng", "name", "street_number", "street_name", "address_details", "county", "locality")


class SearchQuerySerializer(serializers.Serializer):  # noqa
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
