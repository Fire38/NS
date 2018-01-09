from rest_framework.test import APITestCase, APIRequestFactory, APIClient
from rest_framework import status

from django.contrib.auth.models import User

from monitoring_app.models import Device

# Create your tests here.

class DeviceListTest(APITestCase):
	def setUp(self):
		self.client = APIClient()
		# про авторизацию https://stackoverflow.com/questions/2619102/djangos-self-client-login-does-not-work-in-unit-tests
		self.user = User.objects.create_user('testuser', email='test@test.com')
		self.user.set_password('test_password')
		self.user.save()
		
	def test_get_method(self):
		res = self.client.get('/api/devices/switch/')
		self.assertEqual(res.status_code, status.HTTP_200_OK)
		
	def test_post_method_without_auth(self):
		res = self.client.post('/api/devices/switch/', {'device_type': 'switch', 'host_ip': '192.168.1.1', 'address': '123'})
		self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)
		
	def test_post_method_auth(self):
		self.client.login(username='testuser', password='test_password')
		res = self.client.post('/api/devices/switch/',  {'device_type': 'switch', 'host_ip': '192.168.1.1', 'address': '123'})
		self.assertEqual(res.status_code, status.HTTP_201_CREATED)
		self.assertEqual(Device.objects.count(), 1)
		
	def test_post_method_with_incorrect_ip(self):
		self.client.login(username='testuser', password='test_password')
		res = self.client.post('/api/devices/switch/',  {'device_type': 'switch', 'host_ip': '192.168.270.1', 'address': '123'})
		self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
		
		
class DeviceDetailTest(APITestCase):
	def setUp(self):
		self.client = APIClient()
		self.user = User.objects.create_user('testuser', email='test@test.com')
		self.user.set_password('test_password')
		self.user.save()
	
	def test_get_method_with_correct_id(self):
		Device.objects.create(host_ip='192.168.23.32', address='312')
		res = self.client.get('/api/device/1/')
		self.assertEqual(res.status_code, status.HTTP_200_OK)
		self.assertEqual(Device.objects.get().host_ip, '192.168.23.32')
		self.assertEqual(Device.objects.get().address, '312')

	def test_put_method_without_auth(self):
		res = self.client.put('/api/device/1/', {'host_ip': '192.135.32.11', 'address': '12', 'device_type': 'switch'})
		self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)


	def test_put_method_with_auth(self):
		Device.objects.create(host_ip='192.168.23.32', address='312')
		self.client.login(username='testuser', password='test_password')
		res = self.client.put('/api/device/2/', {'host_ip': '192.135.23.3', 'address': '12', 'device_type': 'switch'})
		self.assertEqual(res.status_code, status.HTTP_200_OK)
		self.assertEqual(Device.objects.get().host_ip, '192.135.23.3')
		
#доделать тесты
"""
	def test_delete_method_without_auth(self):
		Device.objects.create(host_ip='192.168.33.31', address='3312')
		self.assertEqual(Device.objects.count(), 1)
		print(Device.objects.get(host_ip='192.168.23.32').id)
		res = self.client.delete('/api/device/3/')"""
		
		
	