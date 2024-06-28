from django.shortcuts import render, redirect
from django.contrib.auth.views import logout_then_login
from .models import *
from django.urls import reverse
from .forms import *
from django.shortcuts import redirect 
import requests
from django.contrib import messages


def comprar(request):
    if not request.user.is_authenticated:
        return redirect(to="login")
    carro = request.session.get("carro", [])
    total = 0
    for item in carro:  
        total += item["total"]
    venta = Venta()
    venta.cliente = request.user
    venta.total = total
    venta.save()
    for item in carro:
        producto = Producto.objects.get(id=item["id"])
        
        # Actualizar stock
        if producto.stock < item["cantidad"]:
            messages.error(request, f"¡No hay suficiente stock para {producto.detalle}! Solo quedan {producto.stock} unidades.")
            return redirect(to="carrito")
        
        producto.stock -= item["cantidad"]
        producto.save()

        detalle = DetalleVenta()
        detalle.producto = Producto.objects.get(id = item["id"])
        detalle.precio = item["precio"]
        detalle.cantidad = item["cantidad"]
        detalle.venta = venta
        detalle.save()
        request.session["carro"] = []
    return redirect(to="carrito")

def home(request):
    return render(request, 'core/index.html')
    suscrito(request, context)
    print(context)

def suscrito(request, context):
    if request.user.is_authenticated:
        email = request.user.email
        resp = requests.get("http://127.0.0.1:8000/api/suscrito/{email}")
        context["suscrito"] = resp.jason()["suscrito"]


def nosotros(request):
    return render(request, 'core/nosotros.html')

def catalogo(request):
    productos = Producto.objects.all()
    return render(request, 'core/catalogo.html', {'productos':productos, "carro":request.session.get("carro", [])})

def login(request):
    return render(request, 'core/login.html')

def logout(request):
    return logout_then_login(request, login_url="home")

def registro(request):
    if request.method == "POST":
        registro = Registro(request.POST)
        if registro.is_valid():
            registro.save()
            return redirect(to="login")
    else:
        registro = Registro()
    return render(request, 'core/registro.html', {'form':registro})

def limpiar(request):
    request.session.flush()
    return redirect(to="home")

def addToCar(request, id):
    carro = request.session.get("carro", [])
    producto = Producto.objects.get(id=id)
    cantidad = 1
    for p in carro:
        if p["id"] == id:
            p["cantidad"] += 1
            p["total"] = p["precio"] * p["cantidad"]
            break
    else:
        carro.append({"id":id, 
                        "nombre":producto.detalle, 
                        "precio":producto.precio,
                        "imagen":producto.imagen,
                        "cantidad":1,
                        "total":producto.precio
                        })
    request.session["carro"] = carro
    return redirect(to="catalogo")

def delToCar(request, id):
    carro = request.session.get("carro", [])
    for p in carro:
        if p["id"] == id:
            if p["cantidad"] > 1:
                p["cantidad"] -= 1
                p["total"] = p["precio"] * p["cantidad"]
            else:
                carro.remove(p)
            break
    request.session["carro"] = carro
    return redirect (reverse('carrito') ) # cambiar el por id el de la seccion

def carrito(request):
    carro = request.session.get("carro", [])
    subtotal = sum(item["total"] for item in carro)
    return render(request, 'core/carrito.html', {"carro": carro, "subtotal": subtotal})

def borrarSesion(request):
    request.session.flush()
    return redirect(to="home")

def armado(request):
    return render(request, 'core/armado.html')
def reparacion(request):
    return render(request, 'core/reparacion.html')
