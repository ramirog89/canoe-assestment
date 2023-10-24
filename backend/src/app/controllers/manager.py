from drf_yasg.utils import swagger_auto_schema

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes

from ..services.manager.service import manager_service

from ..dtos.manager import ManagerDto
from ..dtos.pagination import PaginationListDto


@swagger_auto_schema(
    method='GET',
    responses={status.HTTP_200_OK: PaginationListDto(ManagerDto)}
)
@api_view(['GET'])
@permission_classes([])
def get(request):
    return manager_service.get_all(request)
