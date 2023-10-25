from django.contrib import admin

from ..models import (Company, Event, Fund, FundAlias, FundManager)


admin.site.register([
  Company,
  Event,
  Fund,
  FundAlias,
  FundManager
])
