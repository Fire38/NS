# Generated by Django 2.0 on 2018-03-11 00:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('monitoring_app', '0035_remove_device_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Unmanaged_device',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('network_points', models.ManyToManyField(to='monitoring_app.Network_point')),
            ],
        ),
    ]
