from drf_yasg.utils import swagger_auto_schema

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from ..services.businessLogic.third_party import third_party_api_service

from ..dtos.third_party import ThirdPartyApiVobRequestDto
from ..dtos.clearinghouse_request import ClearinghouseRequestDto


@swagger_auto_schema(
    method='GET',
    responses={status.HTTP_200_OK: ClearinghouseRequestDto}
)
@api_view(['GET'])
@permission_classes([])
def get_request(request, api_key: str, id: str):
    try:
        response = third_party_api_service.get_request(api_key, id)
        return Response(response)
    except Exception as err:
        return Response(data=dict(error=str(err)), status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    method='POST',
    request_body=ThirdPartyApiVobRequestDto,
    responses={status.HTTP_200_OK: ClearinghouseRequestDto}
)
@api_view(['POST'])
@permission_classes([])
def run_vob_check(request, api_key: str):
    try:
        serializer = ThirdPartyApiVobRequestDto(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = third_party_api_service.run_vob_check(
            payload=serializer.data,
            api_key=api_key
        )
        return Response(response)
    except Exception as err:
        return Response(data=dict(error=str(err)), status=status.HTTP_400_BAD_REQUEST)
