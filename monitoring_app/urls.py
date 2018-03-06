from django.urls import path

from .views import index, auth, logout_user

urlpatterns = [
    path('auth', auth, name='auth'),
    path('logout', logout_user, name='logout'),
    path('', index, name='index'),
    path('device/ups', index),
    path('device/logdog', index),
    path('device/switch', index),
    #детали устройства
    path('detail/<int:id>', index),
    #форма
    path('add_device', index, name='add'),
    #карта
    path('map', index)
]
