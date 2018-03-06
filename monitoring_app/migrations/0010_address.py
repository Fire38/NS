# Generated by Django 2.0 on 2018-02-24 22:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('monitoring_app', '0009_device_create_date'),
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('street_and_house', models.CharField(max_length=60)),
                ('connected_from', models.IntegerField(null=True)),
            ],
        ),
    ]
