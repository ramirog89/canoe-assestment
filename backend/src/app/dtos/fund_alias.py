from rest_framework import serializers

from ..models.fund_alias import FundAlias


class FundAliasDto(serializers.ModelSerializer):

    class Meta:
        model = FundAlias
        fields = [
          'id',
          'alias'
        ]
