import random
import string

import pytest
from django.conf import settings

from centers.models import TestingCenter
from centers.serializers import TestingCenterSerializer

base_url = "/api/v1/testing_centers"


@pytest.mark.django_db
def test_center_list_get_if_status_is_approved(approved_center_data, api_client):
    for _ in range(3):
        TestingCenter.objects.create(**approved_center_data)

    url = f"{base_url}/"
    response = api_client.get(url)

    assert response.status_code == 200
    for testing_center in response.data:
        for key in testing_center.keys():
            assert key in TestingCenterSerializer.Meta.fields


@pytest.mark.django_db
def test_center_details_get_if_status_is_approved(approved_center_data, approved_center_return_data, api_client):
    center_obj = TestingCenter.objects.create(**approved_center_data)

    url = f"{base_url}/{center_obj.pk}/"
    response = api_client.get(url)

    assert response.status_code == 200
    for key in approved_center_return_data.keys():
        assert response.data[key] == approved_center_return_data[key]


@pytest.mark.django_db
def test_center_details_cannot_get_if_status_is_pending(pending_center_data, api_client):
    center_obj = TestingCenter.objects.create(**pending_center_data)

    url = f"{base_url}/{center_obj.pk}/"
    response = api_client.get(url)

    assert response.status_code == 404


@pytest.mark.django_db
def test_center_details_cannot_get_if_status_is_rejected(rejected_center_data, api_client):
    center_obj = TestingCenter.objects.create(**rejected_center_data)

    url = f"{base_url}/{center_obj.pk}/"
    response = api_client.get(url)

    assert response.status_code == 404


@pytest.mark.django_db
def test_center_post_forbidden(approved_center_data, api_client):
    response = api_client.post(f"{base_url}/", approved_center_data, format="json")
    assert response.status_code == 403


@pytest.mark.django_db
def test_center_delete_forbidden(approved_center_data, api_client):
    center_obj = TestingCenter.objects.create(**approved_center_data)

    url = f"{base_url}/{center_obj.pk}/"
    response = api_client.delete(url)

    assert response.status_code == 403


@pytest.mark.django_db
@pytest.mark.skip(reason="SIMILARITY available only in dev environment")
def test_center_search(approved_center_data, random_words, api_client):
    center_data = approved_center_data

    for random_word in random_words:
        center_data["street_name"] = random_word
        TestingCenter.objects.create(**approved_center_data)

    for random_word in random_words:
        response = api_client.get(f"{base_url}/search/?query={random_word}/")
        assert response.status_code == 200
        assert response.data[0]["street_name"] == random_word


@pytest.fixture
def random_words():
    length = 5
    how_many = 4
    letters = string.ascii_lowercase
    return ["".join(random.choice(letters) for _ in range(length)) for _ in range(how_many)]


def basic_center_data():
    return {
        "risk_category": "U1",
        "county": "Bucuresti",
        "street_number": "12",
        "locality": "Sector 2",
        "status": 1,
    }


@pytest.fixture
def approved_center_data():
    basic_data = basic_center_data()
    basic_data["status"] = 1
    return basic_data


@pytest.fixture
def approved_center_return_data():
    basic_data = basic_center_data()
    basic_data["status"] = 1
    county = basic_data.pop("county")
    basic_data["county_code"] = settings.COUNTIES_SHORTNAME.get(county, county)
    return basic_data


@pytest.fixture
def pending_center_data():
    basic_data = basic_center_data()
    basic_data["status"] = 0
    return basic_data


@pytest.fixture
def rejected_center_data():
    basic_data = basic_center_data()
    basic_data["status"] = -1
    return basic_data
