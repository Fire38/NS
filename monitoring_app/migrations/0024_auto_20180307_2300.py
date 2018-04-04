# Generated by Django 2.0 on 2018-03-07 23:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('monitoring_app', '0023_auto_20180306_0035'),
    ]

    operations = [
        migrations.AddField(
            model_name='device',
            name='name',
            field=models.CharField(blank=True, max_length=40),
        ),
        migrations.AlterField(
            model_name='device',
            name='device_type',
            field=models.CharField(choices=[('no_choice', 'Не указан'), ('switch', 'Управляемый коммутатор'), ('logdog', 'LogDog'), ('ups', 'UPS'), ('gateway', 'Шлюз'), ('unmanaged_switch', 'Неуправляемый коммутатор')], default='no_choice', max_length=15),
        ),
        migrations.AlterField(
            model_name='device',
            name='host_ip',
            field=models.GenericIPAddressField(blank=True, null=True, protocol='IPv4', unique=True),
        ),
        migrations.AlterField(
            model_name='device',
            name='network_point',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='monitoring_app.Network_point'),
        ),
    ]
