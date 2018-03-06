# Generated by Django 2.0 on 2018-03-01 23:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('monitoring_app', '0017_auto_20180301_0018'),
    ]

    operations = [
        migrations.AlterField(
            model_name='network_point',
            name='device',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='monitoring_app.Device'),
        ),
    ]