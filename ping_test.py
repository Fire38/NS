import subprocess
import time
import shlex
import os
import re

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'NMS.settings')

import django
django.setup()
from monitoring_app.models import Device


q = Device.objects.all()

ip_array = []

for d in q:
  ip_array.append(d.host_ip)

#print('Все айпишники: ', ip_array)

host = ' '.join(ip_array)
cmd = 'fping {hosts} -c 4 -q'.format(hosts=host)

a = shlex.split(cmd)
print(a)

res = subprocess.Popen(a, stderr=subprocess.PIPE)
print("================================================")
result = res.communicate()[1]

ip = re.compile(r'(\d+.\d+.\d+.\d+)')
packets_count = re.compile(r'(\d+)\/(\d+)\/(\d+%)')
packets_details = re.compile(r'(\d+.\d+)\/(\d+.\d+)\/(\d+.\d+)')
for line in result.decode('utf-8').splitlines():
  print(line.split(':'))
  match_ip = ip.search(line.split(':')[0])
  h = Device.objects.get(host_ip=match_ip.groups()[0])
  print(type(h))
  #print(match_ip.groups())
  match_packets_count = packets_count.search(line.split(':')[1])
  #print(match_packets_count.groups())
  match_packets_details = packets_details.search(line.split(':')[1])
  #try:
    #print(match_packets_details.groups())
  #except:
    #pass
  
#print("RESULT=", result.decode('utf-8').splitlines())

#print(result)

#for line in result:
#  print("LINE=", line)


"""
def get_output(cmd):
  args = shlex.split(cmd)
  
  return subprocess.Popen(args, stdout=subprocess.PIPE)

def get_ping(hosts):
  for host in hosts:
    cmd = "fping {host} -C 10 -q -i 700 -t 3000".format(host=host)
    print(cmd)
    res = get_output(cmd)
    #print(res)
    time.sleep(1)

get_ping(ip_array)
"""
