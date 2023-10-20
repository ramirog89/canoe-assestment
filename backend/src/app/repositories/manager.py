from .base import BaseRepository
from ..models import Manager


class ManagerRepository(BaseRepository):

    def __init__(self) -> None:
        super().__init__(Manager)


manager_repository = ManagerRepository()
