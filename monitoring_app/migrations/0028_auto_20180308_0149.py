# Generated by Django 2.0 on 2018-03-08 01:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('monitoring_app', '0027_auto_20180308_0141'),
    ]

    operations = [
        migrations.AlterField(
            model_name='device',
            name='device_type',
            field=models.CharField(choices=[('no_choice', 'Не указан'), ('switch', 'Коммутатор'), ('logdog', 'LogDog'), ('ups', 'UPS'), ('gateway', 'Шлюз')], default='no_choice', max_length=15),
        ),
    ]
