from django.db import connection
import datetime

def ping_all_hosts(hosts):
	"""Ping all host from database"""
	for host in hosts:
		res = host.ping()
		if res == 0:
			host.access_status = True
			host.last_activity = datetime.datetime.now()
			print('МЫ ТУТ')
		else:
			host.access_status = False
		host.save()
	print("И закончили")
	
		