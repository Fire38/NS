from django.contrib import admin
from .models import Device, Statistic, Address, Network_point, Unmanaged_device

# Register your models here.
admin.site.register(Device)
admin.site.register(Statistic)
admin.site.register(Address)
admin.site.register(Network_point)
admin.site.register(Unmanaged_device)
