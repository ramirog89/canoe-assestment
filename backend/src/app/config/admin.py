from django.contrib import admin

from ..models import (Company, Fund, Manager)


admin.site.register([
  Company,
  Fund,
  Manager
])
