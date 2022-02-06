from rest_framework import viewsets
from rest_framework.generics import CreateAPIView
from rest_framework.throttling import AnonRateThrottle

from contact.models import ContactMessage
from contact.serializers import ContactSerializer


class SendContactQueryBurstAnonRateThrottle(AnonRateThrottle):
    rate = "1/min"


class SendContactQuerySustainedAnonRateThrottle(AnonRateThrottle):
    rate = "100/day"


class ContactViewSet(viewsets.ViewSet, CreateAPIView):
    throttle_classes = [SendContactQueryBurstAnonRateThrottle, SendContactQuerySustainedAnonRateThrottle]
    serializer_class = ContactSerializer
    queryset = ContactMessage.objects.all()
