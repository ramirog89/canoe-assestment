from rest_framework import status
from rest_framework.response import Response

from .tasks import fund_created

from ...repositories.fund import fund_repository
from ...repositories.fund_alias import fund_alias_repository
from ...repositories.manager import manager_repository

from ...dtos.fund import CreateUpdateFundDto, FundDto
from ...utils.pagination import paginate


class FundService:

  def get_all(self, request):
    try:
        filter = request.query_params.get("filter", "all")
        if filter == "duplicates":
          funds = fund_repository.filter(is_duplicated=True).order_by('-id')
        else:
          funds = fund_repository.all().order_by('-id')

        response = paginate(funds, request, FundDto)
        return Response(response)
    except Exception as err:
        return Response(data=dict(error=str(err)), status=status.HTTP_400_BAD_REQUEST)

  def create(self, payload):
    try:
        serializer = CreateUpdateFundDto(data=payload)
        serializer.is_valid(raise_exception=True)

        manager = manager_repository.get(id=serializer.data['manager'])
        fund = fund_repository.create(
           name=serializer.data['name'],
           manager=manager,
           start_year=serializer.data['start_year'],
        )

        for alias in serializer.data['alias']:
           fund_alias_repository.create(alias=alias, fund=fund)

        # Task event call
        fund_created.apply_async(args=[fund.pk, fund.name])

        response = FundDto(fund).data
        return Response(response, status=status.HTTP_201_CREATED)
    except Exception as err:
        return Response(data=dict(error=str(err)), status=status.HTTP_400_BAD_REQUEST)

  def update(self, id, payload):
    try:
        fund = fund_repository.get(id=id)
        response = FundDto(data=payload, instance=fund, partial=True)
        response.is_valid(raise_exception=True)
        response.save()

        fund_alias_repository.filter(fund=fund).all().delete()
        for alias in payload['alias']:
           fund_alias_repository.create(alias=alias, fund=fund)

        response = FundDto(fund).data
        return Response(response)
    except Exception as err:
        print(err)
        return Response(data=dict(error=str(err)), status=status.HTTP_400_BAD_REQUEST)

  def delete(self, id):
    try:
        fund_repository.delete(id=id)
        return Response(data=str("success"), status=status.HTTP_200_OK)
    except Exception as err:
        return Response(data=dict(error=str(err)), status=status.HTTP_400_BAD_REQUEST)


fund_service = FundService()
