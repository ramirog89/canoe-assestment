from django.db import models

from .fund import Fund


class Company(models.Model):
    name = models.CharField(max_length=128)

    funds = models.ManyToManyField(Fund)

    def __str__(self):
        return f"({self.id}) {self.name}"
