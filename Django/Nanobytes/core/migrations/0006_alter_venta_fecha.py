# Generated by Django 5.0.6 on 2024-06-08 21:08

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_alter_venta_fecha'),
    ]

    operations = [
        migrations.AlterField(
            model_name='venta',
            name='fecha',
            field=models.DateTimeField(default=datetime.datetime(2024, 6, 8, 17, 8, 0, 340782)),
        ),
    ]
