from rest_framework import status
from rest_framework.response import Response

from ...repositories.manager import manager_repository
from ...dtos.manager import ManagerDto
from ...utils.pagination import paginate


class ManagerService:

  def get_all(self, request):
    try:
        funds = manager_repository.all()
        response = ManagerDto(funds, many=True)
        return Response(response.data)
    except Exception as err:
        return Response(data=dict(error=str(err)), status=status.HTTP_400_BAD_REQUEST)


manager_service = ManagerService()
