from django.urls import re_path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import DevicesList, DeviceDetail, GeneralStatistic


urlpatterns = [
	re_path('^devices/(?P<device_type>[a-z]+)/$', DevicesList.as_view()),
	re_path('^device/(?P<pk>[0-9]+)/$', DeviceDetail.as_view()),
	re_path('^statistic/$', GeneralStatistic.as_view()),
]

#urlpattern = format_suffix_patterns(urlpatterns)