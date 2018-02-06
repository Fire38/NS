from celery import task

from .models import Device
from .ping import ping_all_hosts

"""
@task()
def hello_world():
	while True:
		print('Hello world')
		time.sleep(5)"""

		
@task()		
def ping_task():

	
	ping_all_hosts()
