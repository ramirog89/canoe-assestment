from rest_framework import serializers

from ..models.fund import Fund


class FundDto(serializers.ModelSerializer):
    class Meta:
        model = Fund
        fields = [
          'id',
          'name',
          'start_year',
          'alias',
          'manager',
          'companies'
        ]

class CreateUpdateFundDto(serializers.ModelSerializer):
    class Meta:
        model = Fund
        fields = [
          'name',
          'start_year',
          'alias',
          'manager',
          'companies'
        ]