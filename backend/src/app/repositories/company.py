from .base import BaseRepository
from ..models import Company


class CompanyRepository(BaseRepository):

    def __init__(self) -> None:
        super().__init__(Company)

company_repository = CompanyRepository()
