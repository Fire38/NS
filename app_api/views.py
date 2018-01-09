from rest_framework import generics
from rest_framework import permissions
from django.http import Http404

from monitoring_app.models import Device
from .serializers import DeviceSerializer

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


class DeviceDetail(generics.RetrieveUpdateDestroyAPIView):
	"""
	Retrieve, update or delete device
	"""
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
	queryset = Device.objects.all()
	serializer_class = DeviceSerializer


class TotalStatistic(generics.ListAPIView):
	"""
	List general sstatistic values
	"""
	permission_classes = (permissions.IsAuthenticated,)
	quesryset = Device.objects.all()
	