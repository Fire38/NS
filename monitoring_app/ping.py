import os
import re
import shlex
import subprocess
from datetime import datetime

from .models import Device, Statistic

from django.db import connection

def ping_all_hosts():
	"""Ping all host from database"""
	print("Начали")
	hosts = Device.objects.all()
	ip_array = []
	for host in hosts:
		print(host)
		ip_array.append(host.host_ip)
	hosts = ' '.join(ip_array)
	args = 'fping {hosts} -c 40 -q'.format(hosts=hosts)
	cmd = shlex.split(args)
	
	res = subprocess.Popen(cmd, stderr=subprocess.PIPE)
	result = res.communicate()[1]
	
	ip = re.compile(r'(\d+.\d+.\d+.\d+)')
	packets_count = re.compile(r'(\d+)\/(\d+)\/(\d+%)')
	packets_details = re.compile(r'(\d+.\d+)\/(\d+.\d+)\/(\d+.\d+)')
	
	for line in result.decode('utf-8').splitlines():
		match_ip = ip.search(line.split(':')[0])
		match_packets_count = packets_count.search(line.split(':')[1])
		match_packets_details = packets_details.search(line.split(':')[1])
		host_ip = match_ip.groups()[0]
		device = Device.objects.get(host_ip = host_ip)
		stat = Statistic.objects.create(device=device)
		print(device)
		send_packets, rec_packets, loss = match_packets_count.groups()
		stat.send_packets = send_packets
		stat.rec_packets = rec_packets
		stat.loss_packets = int(loss[:len(loss)-1])
		if loss != '100%':
			device.access_status = True
			device.last_activity = datetime.now()
			min_time, avg_time, max_time = match_packets_details.groups()
			stat.min_time = min_time
			stat.avg_time = avg_time
			stat.max_time = max_time
			
		else:
			device.access_status = False
		device.save()
		stat.save()
	print("Закончили")
	
	

		