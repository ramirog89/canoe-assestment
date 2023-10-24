from rest_framework import serializers

from ..models.fund_manager import FundManager


class ManagerDto(serializers.ModelSerializer):
    class Meta:
        model = FundManager
        fields = [
          'id',
          'name',
        ]
