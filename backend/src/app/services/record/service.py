import uuid
import random
import datetime

from src.app.config.celery import app
from src.app.models import Fund, FundManager, Company
from src.app.services.fund.service import fund_service

LIST_OF_ALIASES = ['alias 1', 'alias 2', 'alias 3', 'alias 4', 'random alias', 'carity fund']
LIST_OF_FUND_NAMES = ['fund 1', 'fund 2', 'fund 3', 'fund 4', 'randmo fund', 'fund 8']
LIST_OF_COMPANY_NAMES = ['company 1', 'company 2', 'company 3', 'company 4', 'company 5']

class RecordGeneratorService:
    ''' Create automated records '''

    def generate(self, stop = 10, i = 0):
        ''' This creates 10 records every time job is triggered '''
        if i == stop:
            return

        if i == 0:  # create only 1 manager per generator iteration
            manager = self.create_fund_manager()
        else:
            manager = FundManager.objects.all().first()

        self.create_duplicated_fund(manager=manager)
        self.create_unique_fund(manager=manager)
        self.create_company()
        self.generate(i=i+1)

    def create_company(self):
        try:
            all_funds = Fund.objects.all()
            company = Company.objects.create(
                name=random.choice(LIST_OF_COMPANY_NAMES),
            )
            for f in random.choices(all_funds, k=random.randint(0, len(all_funds))):
                company.funds.add(f)
            company.save()
            return company
        except Exception as err:
            raise Exception('Error creating Company', err)

    def create_fund_manager(self):
        try:
            id = uuid.uuid4()
            return FundManager.objects.create(
                name=f"manager+{id}",
                email=f"manager+{id}@test.com",
            )
        except Exception as err:
            raise Exception('Error creating Fund Manager', err)

    def create_duplicated_fund(self, manager):
        try:
            fund_service.create(payload={
                'name': random.choice(LIST_OF_FUND_NAMES),
                'manager': manager.id,
                'start_year': self.random_date().date(),
                'alias': random.choices(LIST_OF_ALIASES, k=3)
            })
        except Exception as err:
            raise Exception('Error creating Fund', err)

    def create_unique_fund(self, manager):
        try:
            unique_aliases = [f'alias+{random.randint(i, 9999999)}' for i in range(1, 5)]
            fund_service.create(payload={
                'name': f'fund+{uuid.uuid4()}',
                'manager': manager.id,
                'start_year': self.random_date().date(),
                'alias': random.choices(unique_aliases, k=3)
            })
        except Exception as err:
            raise Exception('Error creating Fund', err)

    def random_date(self):
        start = datetime.datetime.strptime('1/1/2000', '%m/%d/%Y')
        end = datetime.datetime.strptime('1/1/2050', '%m/%d/%Y')
        return start + datetime.timedelta(
            seconds=random.randint(0, int((end - start).total_seconds()))
        )

record_generator_service = RecordGeneratorService()


@app.task()
def automatic_record_generator():
    try:
        print("Automatic Generator Record")
        record_generator_service.generate()
    except Exception as err:
        raise err
