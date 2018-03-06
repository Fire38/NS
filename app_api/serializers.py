from rest_framework import serializers
from monitoring_app.models import Device, Address, Network_point

class DeviceSerializer(serializers.ModelSerializer):
	address = serializers.SerializerMethodField()
	
	class Meta:
		model = Device
		fields = ('id','device_type', 'host_ip', 'description', 'access_status', 'last_activity', 'create_date', 'address')
	
	def get_address(self, obj):
		return self.context.get('address')
		
		
class AddressSerializer(serializers.ModelSerializer):
	class Meta:
		model = Address
		fields = ('id', 'street_and_house')


class DevicesSerializer(serializers.ModelSerializer):
	class Meta:
		model = Device
		fields = ('id', 'host_ip')
		
		
class NetworkPointSerializer(serializers.ModelSerializer):
	id = serializers.SerializerMethodField()
	address = serializers.SerializerMethodField()
	host_ip = serializers.SerializerMethodField()
	device_type = serializers.SerializerMethodField()
	access = serializers.SerializerMethodField()
	description = serializers.SerializerMethodField()
	
	class Meta:
		model = Network_point
		fields = ('lat', 'lng', 'connected_from', 'address', 'id', 'host_ip', 'device_type', 'access', 'description')

	def get_id(self, obj):
		return obj.device.id

	def get_address(self, obj):
		return obj.address.street_and_house
	
	def get_host_ip(self, obj):
		return obj.device.host_ip
	
	def get_device_type(self, obj):
		return obj.device.device_type
	
	def get_access(self, obj):
		return obj.device.access_status
	
	def get_description(self, obj):
		return obj.device.description