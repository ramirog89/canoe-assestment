from django.urls import path

from drf_yasg import openapi
from drf_yasg.views import get_schema_view

from rest_framework import permissions

from src.app import controllers
from .admin import *

schema_view = get_schema_view(
    openapi.Info(
        title="Backend API",
        description="API Docs",
        default_version="v1.0.0",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
    url="http://localhost:8000/",
    urlconf="src.app.config.urls"
)

urlpatterns = [
    path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('admin/', admin.site.urls),

    path('fund', controllers.fund.get_create, name='get all funds'),
    path('fund/<int:id>', controllers.fund.update_delete, name='update delete funds'),
    path('fund/duplicates', controllers.fund.get_duplicate_funds, name='get all funds'),

    path('manager', controllers.manager.get),
]
