from django.shortcuts import render, HttpResponseRedirect, reverse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

from .tasks import ping_task
# Create your views here.

@login_required()
#если не авторизован см LOGIN_URL
def index(request, id=0):
	return render(request, 'monitoring_app/index.html')


def auth(request):
	error = False
	if request.method == 'POST':
		user_login = request.POST.get('login')
		password = request.POST.get('password')
		user = authenticate(username=user_login, password=password)
		if user is not None:
			if user.is_active:
				login(request, user)
				return HttpResponseRedirect(reverse('index'))
		else:
			error = True

	return render(request, 'monitoring_app/login.html', {'error': error})


def logout_user(request):
	logout(request)
	return HttpResponseRedirect(reverse('auth'))