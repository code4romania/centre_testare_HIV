from rest_framework import serializers

from contact.models import ContactMessage


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ("name", "email", "phone_number", "message")
