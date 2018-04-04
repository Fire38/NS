from django.db import models

from django.utils import timezone
import subprocess
# Create your models here.

DEVICES_TYPE_CHOICES = (
    ('no_choice', 'Не указан'),
    ('switch', 'Коммутатор'),
    ('logdog', 'LogDog'),
    ('ups', 'UPS'),
	('gateway', 'Шлюз'),
	('other', 'Другое')
)

class Device(models.Model):
	device_type = models.CharField(max_length=15, choices=DEVICES_TYPE_CHOICES, default='no_choice')
	host_ip = models.GenericIPAddressField(protocol='IPv4', unique=True, blank=True, null=True)
	description = models.CharField(max_length=500, blank=True)
	access_status = models.BooleanField(default=False)
	last_activity = models.DateTimeField(auto_now_add=True, blank=True)
	create_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)
	network_point = models.ForeignKey('Network_point', null=True, blank=True, on_delete=models.CASCADE)
	
	def __str__(self):
		return self.device_type + " " + self.host_ip


class Network_point(models.Model):
	connected_from = models.IntegerField(null=True)
	address = models.ForeignKey('Address', on_delete=models.CASCADE)
	description = models.CharField(max_length=500, blank=True)
	lat = models.DecimalField(max_digits=20, decimal_places=16, blank=True, null=True)
	lng = models.DecimalField(max_digits=20, decimal_places=16, blank=True, null=True)
	
	class Meta:
		unique_together = ('lat', 'lng',)

	def __str__(self):
		return  str(self.address) + ", " + "cетевой узел" + " " + str(self.id)
	

class Unmanaged_device(models.Model):
	name = models.CharField(max_length=50)
	network_points = models.ManyToManyField(Network_point, blank=True)
	
	def __str__(self):
		return self.name
	

class Address(models.Model):
	street_and_house = models.CharField(max_length=60, blank=False, null= False)
	#network_point = models.ForeignKey('Network_point', on_delete=models.CASCADE)
	
	def __str__(self):
		return self.street_and_house

class Statistic(models.Model):
	device = models.ForeignKey('Device', on_delete=models.CASCADE)
	send_packets = models.IntegerField(blank=True, null=True)
	rec_packets = models.IntegerField(blank=True, null=True)
	loss_packets = models.IntegerField(blank=True, null=True)
	min_time = models.FloatField(blank=True, null=True)
	avg_time = models.FloatField(blank=True, null=True)
	max_time = models.FloatField(blank=True, null=True)
	datetime = models.DateTimeField(auto_now_add=True, blank=True)
	
	def __str__(self):
		return self.device.host_ip + " " + str(self.datetime)
	
