from rest_framework import serializers
from django.contrib.auth.models import User
from app_pharmageap.models import Pharmacie




class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)
    confirmPassword = serializers.CharField(write_only=True, min_length=8)
    phoneNumber = serializers.CharField(max_length=15, write_only=True)
    profileType = serializers.ChoiceField(
        choices=[("pharmacie", "Pharmacie")],
        write_only=True,
    )
    nomPharmacie = serializers.CharField(max_length=255, write_only=True)
    adressePharmacie = serializers.CharField(max_length=255, write_only=True)

    def validate(self, data):
        if data["password"] != data["confirmPassword"]:
            raise serializers.ValidationError({"password": "Les mots de passe ne correspondent pas."})

        if User.objects.filter(email=data["email"]).exists():
            raise serializers.ValidationError({"email": "Cet email est déjà utilisé."})

        return data

    def create(self, validated_data):
        # Création de l'utilisateur
        user = User.objects.create_user(
            username=validated_data["email"].split('@')[0],  # Utilisation de l'email pour le nom d'utilisateur
            email=validated_data["email"],
            password=validated_data["password"],
        )

        # Création de l'objet Pharmacie
        Pharmacie.objects.create(
            user=user,
            nom=validated_data["nomPharmacie"],
            adresse=validated_data["adressePharmacie"],
            email=validated_data["email"],
            telephone = validated_data["phoneNumber"]
        )

        return user

    def to_representation(self, instance):
        return {
            "user": {
                "id": instance.id,
                "username": instance.username,
                "email": instance.email,
            },
            "message": "Utilisateur et pharmacie créés avec succès."
        }

    def to_representation(self, instance):
        return {
            "user": {
                "id": instance.id,
                "username": instance.username,
                "email": instance.email,
                "fullName": f"{instance.first_name} {instance.last_name}".strip()
            },
            "message": "Utilisateur et pharmacie créés avec succès."
        }


class LoginSerializer(serializers.Serializer):
    username_or_email = serializers.CharField()
    password = serializers.CharField(write_only=True)
