from rest_framework import generics
from rest_framework import permissions

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


class DeviceDetail(generics.RetrieveUpdateDestroyAPIView):
	"""
	Retrieve, update or delete device
	"""
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
	queryset = Device.objects.all()
	serializer_class = DeviceSerializer
