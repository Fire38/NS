from rest_framework import generics, status
from rest_framework import permissions
from rest_framework.views import APIView
from django.http import Http404, HttpResponseRedirect, HttpResponse, JsonResponse
from django.shortcuts import reverse
from rest_framework.response import Response

from monitoring_app.models import Device
from .serializers import DeviceSerializer

# Create your views here.
class DevicesList(generics.ListCreateAPIView):
	"""
	List all devices or create new device
	"""
	#permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
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
		serializer = self.get_serializer(data=request.data)
		if serializer.is_valid():
			self.perform_create(serializer)
			headers = self.get_success_headers(serializer.data)
			response['successing_create'] = True
		return JsonResponse(response)
	




class DeviceDetail(generics.RetrieveUpdateDestroyAPIView):
	"""
	Retrieve, update or delete device
	"""
	#permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
	queryset = Device.objects.all()
	serializer_class = DeviceSerializer
	

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