# Generated by Django 5.1.3 on 2024-11-28 21:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app_pharmageap", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="AnalysePrediction",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "type_analyse",
                    models.CharField(
                        choices=[("prediction", "Prédiction"), ("analyse", "Analyse")],
                        max_length=255,
                    ),
                ),
                ("date_creation", models.DateTimeField(auto_now_add=True)),
                ("resultat", models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name="ParametreGlobal",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("cle", models.CharField(max_length=255, unique=True)),
                ("valeur", models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name="ParametrePrediction",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("nom_parametre", models.CharField(max_length=255)),
                ("valeur", models.DecimalField(decimal_places=2, max_digits=10)),
                ("description", models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name="Pharmacie",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("nom", models.CharField(max_length=255)),
                ("adresse", models.TextField()),
                ("telephone", models.CharField(max_length=15)),
                ("email", models.EmailField(max_length=254)),
                (
                    "grossiste_principal",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="pharmacies",
                        to="app_pharmageap.grossiste",
                    ),
                ),
            ],
        ),
    ]