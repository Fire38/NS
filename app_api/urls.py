from django.urls import re_path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import DevicesList,\
					DeviceDetail,\
					GeneralStatistic,\
					AddressForDropdownList,\
					DeviceForDropdownList,\
					NetworkPoint,\
					UnmanagedDevicesList,\
					BindDeviceAndNP,\
					NetworkPointCoords,\
					NetworkPointDetails


urlpatterns = [
	re_path('^devices/(?P<device_type>[a-z]+)/$', DevicesList.as_view()),
	re_path('^unmanaged_devices/$', UnmanagedDevicesList.as_view()),
	re_path('^device/(?P<pk>[0-9]+)/$', DeviceDetail.as_view()),
	re_path('^statistic/$', GeneralStatistic.as_view()),
	
	re_path('^dropdownaddresses/(?P<substring>.*)/$', AddressForDropdownList.as_view()),
	re_path('^dropdowndevices/(?P<ip>[0-9.]+)/$', DeviceForDropdownList.as_view()),
	
	re_path('^bind/$', BindDeviceAndNP.as_view()),
	re_path('^np/$', NetworkPoint.as_view()),
	re_path('^np/details/$', NetworkPointDetails.as_view()),
	re_path('^np/coords/$', NetworkPointCoords.as_view())

	
]

#urlpattern = format_suffix_patterns(urlpatterns)