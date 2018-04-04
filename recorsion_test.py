import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'NMS.settings')

import django
django.setup()
from monitoring_app.models import Device, Network_point



all_point = Network_point.objects.all()
root = Network_point.objects.get(id=64)

coords = []
def get_arrays(obj, queryset):
	global coords
	print(len(queryset))
	for i in queryset:
		print(i)
		if i.connected_from == obj.id:
			coords.append([i.address.street_and_house, i.lat, i.lng])
			get_arrays(i, queryset)
		else:
			pass
	return coords



a = get_arrays(root, all_point)
print(a)

"""
dict = {
	'1': [[lat, lng], [lat, lng]]
	
}





def get_children(parent, queryset):
	child = queryset.objects.get(connected_from=parent.id)
	if child:
		coords = [child.lat, child.lng]
		print(coords)
		return coords
	else:
		return 0



def build_tree():
	brunch = {}
	children = Network_point.objects.filter(connected_from!=-1)
	all_points = Network_point.objects.all()
	for i, child in enumerate(children):
		if get_children(child, all_points) == 0:
			return 1
		else:
			get_children(child_all_points)

build_tree();
"""		


