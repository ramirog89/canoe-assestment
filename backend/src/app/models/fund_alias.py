from django.db import models

from .fund import Fund


class FundAlias(models.Model):
    alias = models.CharField(max_length=128)
    fund = models.ForeignKey(Fund, on_delete=models.CASCADE)

    def __str__(self):
        return f"({self.id}) {self.alias}"
