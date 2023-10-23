from celery.contrib.methods import task_method

from src.app.config.celery import app

from src.app.models import Fund, FundAlias, FundManager, Company

class RecordGeneratorService:
    ''' Create automated records '''

    @app.task(filter=task_method)
    def generate(self):
        print("generando records.. 1, 2, 3")

    def create_company(self):
        pass

    def create_fund_manager(self):
        pass

    def create_fund(self):
        pass

record_generator_service = RecordGeneratorService()


@app.task()
def automatic_record_generator():
    try:
        record_generator_service.generate()
    except Exception as err:
        raise err
