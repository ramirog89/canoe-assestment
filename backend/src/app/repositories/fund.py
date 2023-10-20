from .base import BaseRepository
from ..models import Fund


class FundRepository(BaseRepository):

    def __init__(self) -> None:
        super().__init__(Fund)

fund_repository = FundRepository()
