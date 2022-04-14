from django.conf import settings
from django.contrib.postgres.search import SearchQuery, SearchRank, SearchVector, TrigramSimilarity
from django.core.cache import caches
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.mixins import ListModelMixin
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.viewsets import GenericViewSet

from centers.models import CenterRating, CenterRatingQuestions, CenterTestTypes, Statistic, TestingCenter
from centers.serializers import (
    CenterRatingQuestionsSerializer,
    CenterRatingSerializer,
    CenterSearchSerializer,
    SearchQuerySerializer,
    StatisticSerializer,
    TestTypesSerializer,
    TestingCenterAddRatingSerializer,
    TestingCenterListSerializer,
    TestingCenterPaginatedListSerializer,
    TestingCenterSerializer,
)


class AddRatingQueryBurstAnonRateThrottle(AnonRateThrottle):
    cache = caches["throttling"]
    rate = "5/min"


class PaginatedTestingCenters(LimitOffsetPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 40


class TestingCentersViewSet(ListModelMixin, GenericViewSet):
    pagination_class = PaginatedTestingCenters
    serializer_class = TestingCenterPaginatedListSerializer
    filter_backends = [DjangoFilterBackend]

    def get_queryset(self):
        sort_by = self.request.query_params.get("sort_by", "county")
        sort_type = self.request.query_params.get("sort_type", "asc")
        sort_type = "-" if sort_type == "desc" else ""

        queryset = TestingCenter.approved.all().order_by(f"{sort_type}{sort_by}")
        return queryset


class TestingCenterViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows testing centers to be viewed.
    """

    lookup_field = "pk"

    def get_queryset(self):
        return TestingCenter.approved.all().order_by("pk")

    def get_serializer_class(self):
        if self.action == "list":
            return TestingCenterListSerializer
        elif self.action == "search":
            return SearchQuerySerializer
        elif self.action == "rating":
            return TestingCenterAddRatingSerializer
        return TestingCenterSerializer

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="query",
                type=SearchQuerySerializer,
                location=OpenApiParameter.QUERY,
                description="The address of the testing center",
            )
        ],
        responses=CenterSearchSerializer,
    )
    @action(
        detail=False,
        methods=["get"],
        permission_classes=[permissions.AllowAny],
    )
    def search(self, request):
        """
        Search a testing center by its address
        """

        serializer = SearchQuerySerializer(data=request.query_params)

        if serializer.is_valid():
            query = serializer.data["query"]

            search_query = SearchQuery(query, config="romanian_unaccent")

            vector = SearchVector("full_address", weight="A", config="romanian_unaccent")

            centers = (
                TestingCenter.approved.annotate(
                    rank=SearchRank(vector, search_query), similarity=TrigramSimilarity("full_address", query)
                )
                .filter(
                    Q(rank__gte=settings.SEARCH_RANKING_THRESHOLD)
                    | Q(similarity__gt=settings.TRIGRAM_SIMILARITY_THRESHOLD),
                )
                .order_by("-similarity")
            )
        else:
            centers = None

        result_serializer = CenterSearchSerializer(centers, many=True)
        return Response(result_serializer.data)

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="ratings",
                type=TestingCenterAddRatingSerializer,
                location=OpenApiParameter.QUERY,
                description="Ratings for the testing center",
            )
        ],
        responses=CenterRatingSerializer,
    )
    @action(
        detail=True,
        methods=["post"],
        permission_classes=[permissions.AllowAny],
        throttle_classes=[AddRatingQueryBurstAnonRateThrottle],
    )
    def rating(self, request, pk):
        serializer = TestingCenterAddRatingSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        center_ratings = []
        ratings = serializer.data.pop("ratings")
        for rating in ratings:
            center_ratings.append(CenterRating.objects.create(testing_center_id=pk, **rating))

        center_ratings_serializer = CenterRatingSerializer(center_ratings, many=True)
        return Response(center_ratings_serializer.data)


class CenterTestTypesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CenterTestTypes.objects.all()
    serializer_class = TestTypesSerializer


class CenterRatingQuestionsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CenterRatingQuestions.objects.all()
    serializer_class = CenterRatingQuestionsSerializer


@api_view(["GET"])
@permission_classes((permissions.AllowAny,))
def statistics(self):
    stats = Statistic.objects.first()
    serializer = StatisticSerializer(stats, many=False)

    return Response(serializer.data)
