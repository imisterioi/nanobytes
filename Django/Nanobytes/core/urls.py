from django.urls import path
from .views import *
from django.contrib.auth.views import LoginView

urlpatterns = [
    path('', home, name="home"),
    path('logout', logout, name="logout"),
    path('carrito', carrito, name="carrito"),
    path('armado', armado, name="armado"),
    path('reparacion', reparacion, name="reparacion"),
    path('nosotros', nosotros, name="nosotros"),
    path('login', LoginView.as_view(template_name="core/login.html"), name="login"),
    path('addToCar/<id>', addToCar, name="addToCar"),
    path('delToCar/<id>', delToCar, name="delToCar"),
    path('borrar', borrarSesion, name="borrar"),
    path('catalogo', catalogo, name="catalogo"),
    path('registro', registro, name="registro"),
    path('limpiar', limpiar),
    path('comprar', comprar, name="comprar"),


]
