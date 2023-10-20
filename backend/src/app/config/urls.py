from django.urls import path

from . import controllers

urlpatterns = [
    # FUND
    path('fund', controllers.authentication.login, name='login'),

    # MANAGER
    path('manager', controllers.authentication.login, name='login'),

    # COMPANY
    path('company', controllers.authentication.login, name='login'),
]
