from django.db import models


class Company(models.Model):
    name = models.CharField(max_length=128)

    def __str__(self):
        return f"({self.id}) {self.name}"
