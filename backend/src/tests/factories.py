import factory

from ..app.models import Fund, Company, Manager, Event


class CompanyFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Company

    email = factory.Sequence(lambda n: 'user{}@example.com'.format(n))
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')


class EventFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Event

    email = factory.Sequence(lambda n: 'user{}@example.com'.format(n))
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')


class FundFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Fund

    email = factory.Sequence(lambda n: 'user{}@example.com'.format(n))
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')

class ManagerFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Manager

    email = factory.Sequence(lambda n: 'user{}@example.com'.format(n))
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
