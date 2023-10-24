from rest_framework import serializers

from ..models.fund import Fund


class FundDto(serializers.ModelSerializer):
    class Meta:
        model = Fund
        fields = [
          'id',
          'name',
          'manager',
          'fundalias_set',
          'start_year',
          'created_at'
        ]
        depth = 2

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
