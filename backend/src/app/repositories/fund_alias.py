from .base import BaseRepository
from ..models import FundAlias


class FundAliasRepository(BaseRepository):

    def __init__(self) -> None:
        super().__init__(FundAlias)

fund_alias_repository = FundAliasRepository()
