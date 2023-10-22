from drf_yasg.utils import swagger_auto_schema

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes

from ..services.fund import fund_service
from ..dtos.fund import CreateUpdateFundDto, FundDto


@swagger_auto_schema(method='GET', responses={status.HTTP_200_OK: FundDto(many=True)})
@swagger_auto_schema(
    method='POST',
    request_body=CreateUpdateFundDto,
    responses={status.HTTP_201_CREATED: FundDto}
)
@api_view(['GET', 'POST'])
@permission_classes([])
def get_create(request):
    if request.method == "GET":
        return fund_service.get_all()
    elif request.method == "POST":
        return fund_service.create(payload=request.data)


@swagger_auto_schema(
    method='PUT',
    request_body=CreateUpdateFundDto,
    responses={status.HTTP_200_OK: FundDto}
)
@swagger_auto_schema(method='DELETE', responses={status.HTTP_200_OK: None})
@api_view(['PUT', 'DELETE'])
@permission_classes([])
def update_delete(request, id):
    if request.method == "PUT":
        return fund_service.update(id=id, payload=request)
    elif request.method == "DELETE":
        return fund_service.delete(request, id)
