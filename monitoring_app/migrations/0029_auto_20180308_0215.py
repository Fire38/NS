# Generated by Django 2.0 on 2018-03-08 02:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('monitoring_app', '0028_auto_20180308_0149'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='network_point',
            unique_together={('lat', 'lng')},
        ),
    ]
