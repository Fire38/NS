# Generated by Django 2.0 on 2018-04-02 22:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('monitoring_app', '0038_auto_20180311_0058'),
    ]

    operations = [
        migrations.CreateModel(
            name='TestClass',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('device_type', models.CharField(choices=[('no_choice', 'Не указан'), ('switch', 'Коммутатор'), ('logdog', 'LogDog'), ('ups', 'UPS'), ('gateway', 'Шлюз'), ('other', 'Другое')], default='no_choice', max_length=15)),
                ('host_ip', models.GenericIPAddressField(blank=True, null=True, protocol='IPv4', unique=True)),
                ('description', models.CharField(blank=True, max_length=500)),
                ('access_status', models.BooleanField(default=False)),
                ('last_activity', models.DateTimeField(auto_now_add=True)),
                ('create_date', models.DateTimeField(auto_now_add=True, null=True)),
                ('name', models.CharField(max_length=50)),
            ],
        ),
    ]
