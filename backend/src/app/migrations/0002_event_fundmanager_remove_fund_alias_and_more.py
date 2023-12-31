# Generated by Django 4.2.6 on 2023-10-23 15:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('INVESTMENT', 'Investment'), ('DUPLICATE_FUND_WARNING', 'Duplicate Fund Warning'), ('FUND_CREATED', 'Fund Created')], max_length=128)),
                ('metadata', models.JSONField(default=None, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='FundManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('email', models.CharField(max_length=254)),
            ],
        ),
        migrations.RemoveField(
            model_name='fund',
            name='alias',
        ),
        migrations.RemoveField(
            model_name='fund',
            name='companies',
        ),
        migrations.AddField(
            model_name='company',
            name='funds',
            field=models.ManyToManyField(to='app.fund'),
        ),
        migrations.AddField(
            model_name='fund',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='fund',
            name='start_year',
            field=models.DateField(default=None, null=True),
        ),
        migrations.CreateModel(
            name='FundAlias',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('alias', models.CharField(max_length=128)),
                ('fund', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.fund')),
            ],
        ),
        migrations.AlterField(
            model_name='fund',
            name='manager',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.fundmanager'),
        ),
        migrations.DeleteModel(
            name='Manager',
        ),
    ]
