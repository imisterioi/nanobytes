from django.urls import path
from .views import *
from django.contrib.auth.views import LoginView

urlpatterns = [
    path('', home, name="home"),
    path('logout', logout, name="logout"),
    path('carrito', carrito, name="carrito"),
    path('nosotros', nosotros, name="nosotros"),
    path('login', LoginView.as_view(template_name="core/login.html"), name="login"),
    path('addToCar/<id>', addToCar, name="carrito"),
    path('borrar', borrarSesion, name="borrar"),
]
