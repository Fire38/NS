from rest_framework import generics, status
from rest_framework import permissions
from rest_framework.views import APIView
from django.http import Http404, HttpResponseRedirect, HttpResponse, JsonResponse
from django.shortcuts import reverse
from rest_framework.response import Response

from monitoring_app.models import Device, Address, Network_point
from .serializers import DeviceSerializer, AddressSerializer, DevicesSerializer, NetworkPointSerializer


# Create your views here.
class DevicesList(generics.ListCreateAPIView):
	"""
	List all devices or create new device
	"""
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
	queryset = Device.objects.all()
	serializer_class = DeviceSerializer
	lookup_url_kwarg = 'device_type'
	
	def get_queryset(self):
		device_type = self.kwargs.get(self.lookup_url_kwarg)
		try:
			devices = Device.objects.filter(device_type=device_type).order_by('host_ip')
			return devices
		except:
			raise Http404

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


class BindDeviceAndAddress(APIView):
	def post(self, request):
		print(request.data)
		return Response({'a':'123'})


class NetworkPoint(generics.ListCreateAPIView):
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
	queryset = Network_point.objects.all()
	serializer_class = NetworkPointSerializer
	
	
	def create(self, request, *args, **kwargs):
		print(request.data)
		ip = request.data.get('device')
		device = Device.objects.get(host_ip=ip)
		adr = request.data.get('address')
		address = Address.objects.get(street_and_house=adr)
		lat = request.data.get('lat')
		lng = request.data.get('lng')
		connected_from = request.data.get('connected_from')
		n = Network_point.objects.create(address=address, lat=lat, lng=lng, connected_from=connected_from)
		device.network_point = n
		device.save()
		
		return JsonResponse({'a':'pff'})
	

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