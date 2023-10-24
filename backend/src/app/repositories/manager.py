from .base import BaseRepository
from ..models import FundManager


class ManagerRepository(BaseRepository):

    def __init__(self) -> None:
        super().__init__(FundManager)


manager_repository = ManagerRepository()
