from rest_framework import status
from rest_framework.response import Response

from ..repositories.fund import fund_repository
from ..dtos.fund import CreateUpdateFundDto, FundDto
from ..utils.pagination import paginate


class FundService:

  def get_all(self, request):
    try:
        funds = fund_repository.all()
        response = paginate(funds, request, FundDto)
        return Response(response)
    except Exception as err:
        return Response(data=dict(error=str(err)), status=status.HTTP_400_BAD_REQUEST)

  def create(self, payload):
    try:
        serializer = CreateUpdateFundDto(data=payload)
        serializer.is_valid(raise_exception=True)
        fund = serializer.save()
        response = FundDto(fund).data
        return Response(response)
    except Exception as err:
        return Response(data=dict(error=str(err)), status=status.HTTP_400_BAD_REQUEST)

  def update(self, id, payload):
    try:
        fund = fund_repository.get(id=id)
        response = FundDto(data=payload, instance=fund, partial=True)
        response.is_valid(raise_exception=True)
        response.save()
        response = FundDto(fund).data
        return Response(response)
    except Exception as err:
        return Response(data=dict(error=str(err)), status=status.HTTP_400_BAD_REQUEST)

  def delete(self, id):
    try:
        fund_repository.delete(id=id)
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Exception as err:
        return Response(data=dict(error=str(err)), status=status.HTTP_400_BAD_REQUEST)


fund_service = FundService()
