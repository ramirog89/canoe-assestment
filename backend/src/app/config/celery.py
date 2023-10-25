import os

from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'src.app.config.settings')

app = Celery('assestment_celery_app')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

# Cron Jobs
app.conf.beat_schedule = {
    'record-generator': {
        'task': 'src.app.services.record.service.automatic_record_generator',
        'schedule': 25.0 # Every 25 seconds
    },
}
