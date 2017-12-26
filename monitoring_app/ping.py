from django.db import connection


def ping_all_hosts(hosts):
	"""Ping all host from database"""
	for host in hosts:
		res = host.ping()
		if res == 0:
			host.access_status = True
		else:
			host.access_status = False
		host.save()
	print("И закончили")
	
		