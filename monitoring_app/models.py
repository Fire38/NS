from django.db import models

import subprocess
# Create your models here.

DEVICES_TYPE_CHOICES = (
    ('no_choice', 'Не указан'),
    ('switch', 'Коммутатор'),
    ('logdog', 'LogDog'),
    ('ups', 'UPS'),
	('gateway', 'Шлюз')
)

class Device(models.Model):
	device_type = models.CharField(max_length=15, choices=DEVICES_TYPE_CHOICES, default='no_choice')
	host_ip = models.GenericIPAddressField(protocol='IPv4', unique=True)
	address = models.CharField(max_length=50)
	description = models.CharField(max_length=500, blank=True)
	access_status = models.BooleanField(default=False)
	
	def __str__(self):
		return self.device_type + " " + self.host_ip
	
	def ping(self):
		res = subprocess.call(['ping', '-c', '2', '-W', '1', self.host_ip,])
		return res