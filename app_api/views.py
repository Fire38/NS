from rest_framework import generics, status
from rest_framework import permissions
from rest_framework.views import APIView
from django.http import Http404, HttpResponseRedirect, HttpResponse, JsonResponse
from django.shortcuts import reverse
from rest_framework.response import Response

from .logic import get_coords
from monitoring_app.models import Device, Address, Network_point, Unmanaged_device
from .serializers import DeviceSerializer, AddressSerializer, DevicesSerializer, NetworkPointSerializer, UnmanagedDeviceSerializer


# Create your views here.
class DevicesList(generics.ListCreateAPIView):
	"""
	List all devices with specified type or create new device
	"""
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
	queryset = Device.objects.all()
	serializer_class = DeviceSerializer
	lookup_url_kwarg = 'device_type'
	
	def get_queryset(self):
		device_type = self.kwargs.get(self.lookup_url_kwarg)
		if device_type == 'all':
			devices = Device.objects.all()
			return devices
		else:
			try:
				devices = Device.objects.filter(device_type=device_type).order_by('host_ip')
				return devices
			except:
				raise Http404


class UnmanagedDevicesList(generics.ListAPIView):
	""" Return unmanaged devices list """
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
	queryset = Unmanaged_device.objects.all()
	serializer_class = UnmanagedDeviceSerializer


	# перепишем post для замены return
	def create(self, request, *args, **kwargs):
		response = {'successing_create': False}
		data = request.data
		serializer = self.get_serializer(data=request.data)
		if serializer.is_valid():
			self.perform_create(serializer)
			headers = self.get_success_headers(serializer.data)
			response['successing_create'] = True
		return JsonResponse(response)


class DeviceDetail(generics.RetrieveUpdateDestroyAPIView):
	""" Return device details """
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
	queryset = Device.objects.all()
	serializer_class = DeviceSerializer
	lookup_url_kwarg = 'pk'

	def get_serializer_context(self):
		context = super().get_serializer_context()
		device_id = self.kwargs.get(self.lookup_url_kwarg)
		try:
			network_point = Network_point.objects.get(device=device_id)
			context['address'] = network_point.address.street_and_house
		except:
			context['address'] = 'Устройство еще не прикреплено к адресу'
		return context


class AddressForDropdownList(generics.ListAPIView):
	serializer_class = AddressSerializer
	lookup_url_kwarg = 'substring'
	
	def get_queryset(self):
		addresses = [address for address in Address.objects.all() if self.kwargs.get(self.lookup_url_kwarg).capitalize() in address.street_and_house]
		return addresses


class DeviceForDropdownList(generics.ListAPIView):
	serializer_class = DeviceSerializer
	lookup_url_kwarg = 'ip'
	
	def get_queryset(self):
		devices = [device for device in Device.objects.all() if self.kwargs.get(self.lookup_url_kwarg) in device.host_ip]
		return devices


class BindDeviceAndNP(APIView):
	def post(self, request):
		np_id = request.data.get('networkPoint')
		network_point = Network_point.objects.get(id=np_id)
		device_id = request.data.get('device')
		#костыль т к 2 таблицы устройств и разные id
		try:
			device = Device.objects.get(id=device_id)
			device.network_point = network_point
		except:
			device = Unmanaged_device.objects.get(id=device_id)
			device.network_points.add(network_point)
		device.save()
		return Response({'a':'123'})


class NetworkPoint(generics.ListCreateAPIView):
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
	queryset = Network_point.objects.all()
	serializer_class = NetworkPointSerializer
	
	def create(self, request, *args, **kwargs):
		response = {'successing_create': False}
		address = Address.objects.get(street_and_house=self.request.data['address']).id
		request.data['address'] = address
		serializer = self.get_serializer(data=request.data)
		if serializer.is_valid():
			self.perform_create(serializer)
			headers = self.get_success_headers(serializer.data)
			response['successing_create'] = True
		return JsonResponse(response)

class NetworkPointDetails(APIView):
	def get(self, request):
		response = []
		np = Network_point.objects.all()
		for point in np:
			mas = {}
			mas['point_id'] = point.id
			mas['parent_id'] = point.connected_from
			mas['address'] = point.address.street_and_house
			
			unman_dev = point.unmanaged_device_set.all()
			unman_devices = UnmanagedDeviceSerializer(unman_dev, many=True)
			mas['unman_devices'] = unman_devices.data
			
			man_dev = point.device_set.all()
			man_devices = DeviceSerializer(man_dev, many=True)
			mas['man_devices'] = man_devices.data
			
			mas['description'] = point.description
			mas['lat'] = point.lat
			mas['lng'] = point.lng
			response.append(mas)
		return Response(response)
			
		
class NetworkPointCoords(APIView):
	def get(self, request):
		coords = get_coords()
		print(coords)
		return Response(coords)






class GeneralStatistic(APIView):
	"""
	List general statistic values
	"""
	#permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
	
	def get(self, request):
		device_count = Device.objects.count()
		active_devices = Device.objects.filter(access_status=True).count()
		inactive_devices = Device.objects.filter(access_status=False).count()
		a = {}
		a['device_count'] = device_count
		a['active_devices'] = active_devices
		a['inactive_devices'] = inactive_devices
		return Response(a)