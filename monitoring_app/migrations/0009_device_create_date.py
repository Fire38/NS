# Generated by Django 2.0 on 2018-02-06 21:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('monitoring_app', '0008_auto_20180204_2252'),
    ]

    operations = [
        migrations.AddField(
            model_name='device',
            name='create_date',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
