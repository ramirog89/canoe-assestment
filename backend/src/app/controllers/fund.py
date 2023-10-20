from drf_yasg.utils import swagger_auto_schema

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response


@swagger_auto_schema(
    method='GET',
    responses={status.HTTP_200_OK: FundDto}
)
@api_view(['GET'])
@permission_classes([])
def get(request, api_key: str, id: str):
    try:
        response = fund_service.get_request(api_key, id)
        return Response(response)
    except Exception as err:
        return Response(data=dict(error=str(err)), status=status.HTTP_400_BAD_REQUEST)
