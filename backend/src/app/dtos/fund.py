from rest_framework import serializers

from ..models.fund import Fund

from .manager import ManagerDto
from .fund_alias import FundAliasDto


class FundDto(serializers.ModelSerializer):
    manager = ManagerDto()
    fundalias_set = serializers.ListSerializer(child=FundAliasDto())

    class Meta:
        model = Fund
        fields = [
          'id',
          'name',
          'manager',
          'fundalias_set',
          'start_year',
          'is_duplicated',
          'created_at'
        ]

class CreateUpdateFundDto(serializers.ModelSerializer):
    alias = serializers.ListSerializer(child=serializers.CharField())

    class Meta:
        model = Fund
        fields = [
          'name',
          'manager',
          'start_year',
          'alias'
        ]
