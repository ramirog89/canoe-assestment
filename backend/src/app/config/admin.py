from django.contrib import admin

from ..models import (Company, Fund, FundManager)


admin.site.register([
  Company,
  Fund,
  FundManager
])
