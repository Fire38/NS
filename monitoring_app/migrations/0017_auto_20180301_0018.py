# Generated by Django 2.0 on 2018-03-01 00:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('monitoring_app', '0016_device_network_point'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='device',
            name='network_point',
        ),
        migrations.AddField(
            model_name='network_point',
            name='device',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='monitoring_app.Device'),
        ),
    ]
