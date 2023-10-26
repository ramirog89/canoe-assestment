from django.db.models import Q
from functools import reduce
from operator import or_

from src.app.config.celery import app

from ...models import Event, EventType, FundAlias
from ...repositories.fund import fund_repository
from ...repositories.fund_alias import fund_alias_repository


class FundProcessor:

    def fund_created(self, fund_id: int, fund_name: str):
        fund = fund_repository.get(id=fund_id)

        fundNameExists = fund_repository.filter(name=fund_name)
        managerAliasMatches = []

        fundAliases = fund.fundalias_set.all()
        if len(fundAliases) > 0:
            managerAliasMatches = FundAlias.objects.filter(
                reduce(or_, [Q(alias__icontains=a.alias) for a in fundAliases])
            ) & FundAlias.objects.filter(
                fund__manager=fund.manager
            )

        isDuplicate = len(fundNameExists) > 1 or len(managerAliasMatches) > 0

        if isDuplicate:
            try:
                Event.objects.create(
                    type=EventType.DUPLICATE_FUND_WARNING,
                    metadata={ # We may even store to which funds is duplicated
                        'fund_id': fund.id
                    }
                )

                fund.is_duplicated = True
                fund.save()
            except Exception as err:
                raise err


fund_processor_service = FundProcessor()


@app.task()
def fund_created(fund_id: int, fund_name: str):
    try:
        fund_processor_service.fund_created(fund_id, fund_name)
    except Exception as err:
        raise err
