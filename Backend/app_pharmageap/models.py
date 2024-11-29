from django.contrib.auth.models import User
from django.db import models

# Modèle pour les grossistes
class Grossiste(models.Model):
    nom = models.CharField(max_length=255, unique=True)
    delai_livraison = models.CharField(max_length=50)
    commande_minimum = models.DecimalField(max_digits=10, decimal_places=2)
    evaluation = models.FloatField()

    def __str__(self):
        return self.nom


# Modèle pour les produits proposés par les grossistes
class ProduitGrossiste(models.Model):
    grossiste = models.ForeignKey(Grossiste, on_delete=models.CASCADE, related_name='produits')
    nom = models.CharField(max_length=255)
    prix = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.nom} - {self.grossiste.nom}"


# Modèle pour les statistiques générales affichées sur le tableau de bord
class StatistiquesCommandes(models.Model):
    total_commandes = models.PositiveIntegerField()
    livraisons_en_attente = models.PositiveIntegerField()
    depenses_mensuelles = models.DecimalField(max_digits=15, decimal_places=2)
    tendances_prix = models.FloatField()  # En pourcentage (exemple: 2.4 pour +2.4%)

    def __str__(self):
        return f"Statistiques du tableau de bord"


# Modèle pour gérer les commandes des utilisateurs
class Commande(models.Model):
    grossiste = models.ForeignKey(Grossiste, on_delete=models.CASCADE, related_name='commandes')
    produit = models.ForeignKey(ProduitGrossiste, on_delete=models.CASCADE, related_name='commandes')
    quantite = models.PositiveIntegerField()
    date_commande = models.DateTimeField(auto_now_add=True)
    statut = models.CharField(
        max_length=50,
        choices=[
            ('en_attente', 'En attente'),
            ('livree', 'Livrée'),
            ('annulee', 'Annulée'),
        ],
        default='en_attente',
    )

    def __str__(self):
        return f"Commande #{self.id} - {self.produit.nom} ({self.quantite} unités)"


class Pharmacie(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='pharmacie')
    nom = models.CharField(max_length=255)
    adresse = models.TextField()
    telephone = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    date_inscription = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.nom


# Modèle pour les paramètres de prédiction
class ParametrePrediction(models.Model):
    nom_parametre = models.CharField(max_length=255)
    valeur = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nom_parametre


# Modèle pour stocker les résultats d'analyse ou prédictions
class AnalysePrediction(models.Model):
    type_analyse = models.CharField(max_length=255, choices=[('prediction', 'Prédiction'), ('analyse', 'Analyse')])
    date_creation = models.DateTimeField(auto_now_add=True)
    resultat = models.TextField()

    def __str__(self):
        return f"{self.type_analyse} - {self.date_creation}"


# Modèle pour gérer les paramètres globaux de l'application
class ParametreGlobal(models.Model):
    cle = models.CharField(max_length=255, unique=True)
    valeur = models.TextField()

    def __str__(self):
        return self.cle