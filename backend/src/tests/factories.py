import factory

from src.app.models import (
  Company,
  Event,
  Fund,
  FundAlias,
  FundManager,
)

class CompanyFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Company

    name = factory.Faker('name')


class EventFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Event

    created_at = factory.Faker('date')

class FundManagerFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = FundManager

    name = factory.Faker('name')
    email = factory.Sequence(lambda n: 'user{}@example.com'.format(n))

class FundFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Fund

    name = factory.Faker('name')
    start_year = factory.Faker('date')
    created_at = factory.Faker('date')
    is_duplicated = False

    manager = factory.SubFactory(FundManagerFactory)

class FundAliasFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = FundAlias

    alias = factory.Faker('name')

    fund = factory.SubFactory(FundFactory)
