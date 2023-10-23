## Fund creation handler that manages Duplicates

'''
a. Si se crea un nuevo fondo con un nombre y administrador que coincide con el nombre o alias de un fondo existente con el mismo administrador,
lanzar un evento de advertencia de fondo_duplicado.

b. Escriba un proceso para consumir el evento duplicado_fund_warning
'''

from ...models import Event, EventType
from ...repositories.fund import fund_repository
from ...repositories.fund_alias import fund_alias_repository


class FundProcesses:

    def fund_created(self, fund):
        # find duplicated

        fundNameExists = fund_repository.filter(name=fund.name)
        aliasAndManagerMatches = fund_alias_repository.filter(fund=fund)

        isPotentialDuplicate = len(fundNameExists) > 0 or len(aliasAndManagerMatches) > 0

        if isPotentialDuplicate:
            Event.objects.create(
                type=EventType.DUPLICATE_FUND_WARNING,
                metadata={
                    'fund_id': fund.id
                }
            )


fund_process_service = FundProcesses()
