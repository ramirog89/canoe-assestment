from django.db.models import Model


class BaseRepository:

    entity: Model = None

    def __init__(self, entity) -> None:
        self.entity = entity

    def get(self, **query):
        try:
            result = self.entity.objects.get(**query)
            return result
        except Exception as err:
            raise err

    def all(self):
        try:
            return self.entity.objects.all()
        except Exception as err:
            raise err

    def create(self, **kwargs):
        try:
            result = self.entity.objects.create(**kwargs)
            return result
        except Exception as err:
            raise err

    def update(self, pk: str, fields: dict) -> None:
        try:
            return self.entity.objects.filter(pk=pk).update(**fields)
        except Exception as err:
            raise err

    def filter(self, **kwargs):
        try:
            result = self.entity.objects.filter(**kwargs)
            return result
        except Exception as err:
            raise err

    def delete(self, **kwargs):
        try:
            return self.get(**kwargs).delete()
        except Exception as err:
            raise err
