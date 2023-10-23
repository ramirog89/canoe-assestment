from django.db import models


class FundManager(models.Model):
    name = models.CharField(max_length=128)
    email = models.CharField(max_length=254)

    created_at = models.DateField()

    def __str__(self):
        return f"({self.id}) {self.name}"
