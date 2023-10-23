from rest_framework import serializers


class PaginationQueryParamsDto(serializers.Serializer):
    page = serializers.IntegerField(required=False)
    page_size = serializers.IntegerField(required=False)


class PaginationDto(serializers.BaseSerializer):
    def to_representation(self, instance):
        return {
            'total': instance.total,
            'items': instance.items
        }


def PaginationListDto(ClassDto):
    class Pagination(serializers.Serializer):
        total = serializers.IntegerField()
        items = serializers.ListSerializer(child=ClassDto())

        class Meta:
            ref_name = "Pagination"
    return Pagination()
