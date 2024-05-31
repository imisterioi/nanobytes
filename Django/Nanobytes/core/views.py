from django.shortcuts import render
from django.contrib.auth.views import logout_then_login

# Create your views here.
def home(request):
    return render(request, 'core/index.html')

def carrito(request):
    return render(request, 'core/carrito.html')

def nosotros(request):
    return render(request, 'core/nosotros.html')

def logout(request):
    return logout_then_login(request, login_url="home")