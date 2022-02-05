from django.conf import settings
from django.contrib.postgres.search import TrigramSimilarity
from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from centers.models import CenterTestTypes, Statistic, TestingCenter
from centers.serializers import (
    CenterSearchSerializer,
    PublicCenterCreateSerializer,
    SearchQuerySerializer,
    StatisticSerializer,
    TestingCenterListSerializer,
    TestingCenterSerializer,
    TestTypesSerializer,
)


class PublicCreateAnonRateThrottle(AnonRateThrottle):
    rate = "10/day"


class TestingCenterViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows testing centers to be viewed or edited.
    """

    lookup_field = "pk"

    def get_queryset(self):
        return TestingCenter.approved.all().order_by("pk")

    def get_serializer_class(self):
        if self.action == "list":
            return TestingCenterListSerializer
        elif self.action == "public_create":
            return PublicCenterCreateSerializer
        elif self.action == "search":
            return SearchQuerySerializer
        return TestingCenterSerializer

    @action(
        detail=False,
        methods=["post"],
        permission_classes=[permissions.AllowAny],
        throttle_classes=[PublicCreateAnonRateThrottle],
    )
    def public_create(self, request):
        """
        Special action to allow the public to create a testing center, while
        keeping the default create action available for staff only
        """
        serializer = PublicCenterCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @api_view(["GET"])
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
        permission_classes=[permissions.AllowAny],
    )
    def search(self, request):
        """
        Search a testing center by its address
        """

        serializer = SearchQuerySerializer(data=request.query_params)

        if serializer.is_valid():
            query = serializer.data["query"]
            search_category = ("", serializer.data["riskCategory"])[bool(serializer.data["riskCategory"])]
            centers = (
                TestingCenter.approved.annotate(similarity=TrigramSimilarity("full_address", query))
                .filter(
                    similarity__gt=settings.TRIGRAM_SIMILARITY_THRESHOLD,
                    risk_category__icontains=search_category,
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
