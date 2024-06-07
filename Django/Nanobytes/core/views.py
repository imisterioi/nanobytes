from django.shortcuts import render, redirect
from django.contrib.auth.views import logout_then_login
from .models import *

# Create your views here.
def home(request):
    return render(request, 'core/index.html')

def carrito(request):
    return render(request, 'core/carrito.html')

def nosotros(request):
    return render(request, 'core/nosotros.html')

def catalogo(request):
    productos = Producto.objects.all()
    return render(request, 'core/catalogo.html', {'productos':productos})

def login(request):
    return render(request, 'core/login.html')

def logout(request):
    return logout_then_login(request, login_url="home")

def addToCar(request, id):
    carrito = request.session.get("carrito", [])
    producto = Producto.objects.get(id=id)
    cantidad = 1
    for p in carrito:
        if p["id"] == id:
            p["cantidad"] += 1
            p["total"] = p["precio"] * p["cantidad"]
            break
    else:
        carrito.append({"id":id, 
                        "nombre":producto.nombre, 
                        "precio":producto.precio,
                        "imagen":producto.imagen,
                        "cantidad":1,
                        "total":producto.precio
                        })
    request.session["carrito"] = carrito
    print(carrito)
    return redirect(to="home")

def carrito(request):
    carrito = request.session.get("carrito", [])
    return render(request, 'carrito.html', {"carrito":carrito})

def borrarSesion(request):
    request.session.flush()
    return redirect(to="home")
