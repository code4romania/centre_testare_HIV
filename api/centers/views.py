from django.conf import settings
from django.contrib.postgres.search import SearchQuery, SearchRank, SearchVector, TrigramSimilarity
from django.db.models import Q
from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework import permissions, viewsets
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response

from centers.models import CenterTestTypes, Statistic, TestingCenter
from centers.serializers import (
    CenterSearchSerializer,
    SearchQuerySerializer,
    StatisticSerializer,
    TestingCenterListSerializer,
    TestingCenterSerializer,
    TestTypesSerializer,
)


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


class CenterTestTypesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CenterTestTypes.objects.all()
    serializer_class = TestTypesSerializer


@api_view(["GET"])
@permission_classes((permissions.AllowAny,))
def statistics(self):
    stats = Statistic.objects.first()
    serializer = StatisticSerializer(stats, many=False)

    return Response(serializer.data)
