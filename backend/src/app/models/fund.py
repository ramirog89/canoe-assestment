from django.db import models

from .manager import Manager
from .company import Company


class Fund(models.Model):
    name = models.CharField(max_length=254)
    start_year = models.DateTimeField(default=None, null=True)
    alias = models.CharField(max_length=2)

    manager = models.ForeignKey(Manager, on_delete=models.CASCADE)
    companies = models.ManyToManyField(Company)

    def __str__(self):
        return f"({self.id}) {self.name}"
