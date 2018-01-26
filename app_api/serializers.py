from rest_framework import serializers
from monitoring_app.models import Device

class DeviceSerializer(serializers.ModelSerializer):
	class Meta:
		model = Device
		fields = ('id','device_type', 'host_ip', 'address', 'description', 'access_status', 'last_activity')
		

