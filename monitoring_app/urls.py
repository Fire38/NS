from django.urls import path

from .views import index

urlpatterns = [
    path('', index, name='index'),
    path('device/ups', index),
    path('device/logdog', index),
    path('device/switch', index),
    path('device/detail', index),
    #форма
    path('add_device', index, name='add')
]
