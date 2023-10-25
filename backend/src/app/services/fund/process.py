from src.app.config.celery import app
'''
a. Si se crea un nuevo fondo con un nombre y administrador que coincide con el nombre o alias de un fondo existente con el mismo administrador,
lanzar un evento de advertencia de fondo_duplicado.

b. Escriba un proceso para consumir el evento duplicado_fund_warning
'''

from ...models import Event, EventType
from ...repositories.fund import fund_repository
from ...repositories.fund_alias import fund_alias_repository


class FundProcessor:

    def fund_created(self, fund_id: int, fund_name: str):
        fund = fund_repository.get(id=fund_id)
        fundNameExists = fund_repository.filter(name=fund_name)
        aliasAndManagerMatches = fund_alias_repository.filter(fund=fund)
        isDuplicate = len(fundNameExists) > 0 or len(aliasAndManagerMatches) > 0

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
