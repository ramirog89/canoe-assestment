from django.db import models


class Company(models.Model):
    addressLine1 = models.CharField(max_length=64)
    addressLine2 = models.CharField(max_length=64, blank=True)
    city = models.CharField(max_length=64)
    stateOrProvince = models.CharField(max_length=2)
    postalCode = models.CharField(max_length=9)
    country = models.CharField(max_length=2, default='US')

    def __str__(self):
        return f"({self.id}) {self.addressLine1} | {self.stateOrProvince}"
