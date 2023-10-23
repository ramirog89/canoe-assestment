import os

from django.conf import settings

from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'src.app.config.settings')

app = Celery('assestment_celery_app')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

# Cron Jobs
app.conf.beat_schedule = {
    'record-generator': {
        'task': 'src.app.services.record.service.automatic_record_generator',
        'schedule': 10.0 # crontab(minutes='0/30')  # Every minute
    },
}
