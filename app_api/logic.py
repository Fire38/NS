from monitoring_app.models import Network_point


def get_coords():
	all_point = Network_point.objects.all()
	matrix = {}
	massiv = []
	for i, point in enumerate(all_point):
		print(point)
		for child in all_point:
			if child.connected_from == point.id:
				b = [[child.lat, child.lng], [point.lat, point.lng]]
				massiv.append(b)
	return massiv









"""
def get_coords():
	all_point = Network_point.objects.all()
	matrix = {}

	for i, point in enumerate(all_point):
		print(point)
		a = []
		for child in all_point:
			
			if child.connected_from == point.id:
				b = [child.lat, child.lng]
				a.append(b)
		matrix[i] = a
		
	return matrix"""



 