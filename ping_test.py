import subprocess
import time
import shlex
import os
import re
import requests
import lxml.html as html
import psycopg2


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'NMS.settings')

import django
django.setup()
from monitoring_app.models import Device

conn = psycopg2.connect("host='localhost' dbname='nms_db' user='admin' password='Zte261192'")
cur = conn.cursor()

res = requests.get('https://kladr-rf.ru/38/000/005/041/')

doc = html.document_fromstring(res.content)

streets = doc.cssselect('div.span4 p a')
for street in streets:
  if 'кооператив' not in street.text_content():
    print(street.text_content())
    link = street.get('href')
    res = requests.get(link)
    doc = html.document_fromstring(res.content)
    tables = doc.cssselect('div.span8 table')
    for table in tables:
      if 'Интервал домов' in table.text_content():
        rows = table.cssselect('tbody tr')
        for row in rows:
          house_numbers = row.cssselect('td')
          num = house_numbers[0].text_content().split(',')
          print(num)
          for n in num:
            address = street.text_content() + " " + n
            address = address.split()
            for i in address:
              if i == 'Улица' or i == 'Переулок' or i == 'Проспект':
                name = i
                index_st = address.index(i)
                del address[index_st]
                print(address)
                address.insert(0, name.lower())
                
                address = ' '.join(address)
                print(address)
            cur.execute("INSERT INTO monitoring_app_address (street_and_house) VALUES (%s)",(str(address),))
            conn.commit()
            
    """
    for i in table:
      print(i.text_content())"""
  else:
    print(street.text_content())
  

