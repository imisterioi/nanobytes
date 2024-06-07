from django.db import models

class Producto(models.Model):
    id = models.CharField(max_length=4, primary_key=True)
    detalle = models.CharField(max_length=200)
    precio = models.IntegerField()
    stock = models.IntegerField()
    oferta = models.BooleanField()
    imagen = models.CharField(max_length=200)

    def tachado(self):
        if self.oferta:
            return "$"+str(round(self.precio * 1.2))
        return ""

    def __str__(self):
        return self.detalle+" ("+self.id+")"

