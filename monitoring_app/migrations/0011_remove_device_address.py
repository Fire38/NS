# Generated by Django 2.0 on 2018-02-24 23:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('monitoring_app', '0010_address'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='device',
            name='address',
        ),
    ]
