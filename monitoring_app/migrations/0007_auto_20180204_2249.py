# Generated by Django 2.0 on 2018-02-04 22:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('monitoring_app', '0006_auto_20180204_2211'),
    ]

    operations = [
        migrations.AlterField(
            model_name='statistic',
            name='avg_time',
            field=models.FloatField(blank=True),
        ),
        migrations.AlterField(
            model_name='statistic',
            name='loss_packets',
            field=models.IntegerField(blank=True),
        ),
        migrations.AlterField(
            model_name='statistic',
            name='max_time',
            field=models.FloatField(blank=True),
        ),
        migrations.AlterField(
            model_name='statistic',
            name='min_time',
            field=models.FloatField(blank=True),
        ),
        migrations.AlterField(
            model_name='statistic',
            name='rec_packets',
            field=models.IntegerField(blank=True),
        ),
        migrations.AlterField(
            model_name='statistic',
            name='send_packets',
            field=models.IntegerField(blank=True),
        ),
    ]
