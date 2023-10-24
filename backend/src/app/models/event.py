from django.db import models


class EventType(models.TextChoices):
    INVESTMENT = "INVESTMENT"
    DUPLICATE_FUND_WARNING = "DUPLICATE_FUND_WARNING"
    FUND_CREATED = "FUND_CREATED"


class Event(models.Model):
    type = models.CharField(max_length=128, choices=EventType.choices)
    metadata = models.JSONField(default=None, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return f"({self.id}) {self.name}"
