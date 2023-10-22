from django.db import models


class Manager(models.Model):

    def __str__(self):
        return f"({self.id})"
