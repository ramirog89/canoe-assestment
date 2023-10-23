from django.db import models

from .fund_manager import FundManager


class Fund(models.Model):
    name = models.CharField(max_length=254)
    start_year = models.DateTimeField(default=None, null=True)
    created_at = models.DateField()

    manager = models.ForeignKey(FundManager, on_delete=models.CASCADE)

    def __str__(self):
        return f"({self.id}) {self.name}"
