from django.contrib import admin

from ..models import (Company, Fund, FundAlias, FundManager)


admin.site.register([
  Company,
  Fund,
  FundAlias,
  FundManager
])
