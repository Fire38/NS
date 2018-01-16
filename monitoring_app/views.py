from django.shortcuts import render
from .tasks import ping_task
# Create your views here.

def index(request, id=0):
	return render(request, 'monitoring_app/index.html')