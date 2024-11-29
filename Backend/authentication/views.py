from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import RegisterSerializer, LoginSerializer


class RegisterView(APIView):
    serializer_class = RegisterSerializer
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# Classe pour gérer la connexion d'un utilisateur (nom d'utilisateur/email et mot de passe)
class LoginView(APIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username_or_email = serializer.validated_data['username_or_email']
            password = serializer.validated_data['password']

            # Vérifier si l'entrée est un email ou un nom d'utilisateur
            user = None
            if '@' in username_or_email:
                user = User.objects.filter(email=username_or_email).first()
            else:
                user = User.objects.filter(username=username_or_email).first()

            # Si un utilisateur est trouvé, tenter de l'authentifier
            if user and authenticate(username=user.username, password=password):
                # Générer les tokens d'accès et de rafraîchissement
                refresh = RefreshToken.for_user(user)
                return Response({
                    "message": "Connexion réussie",
                    "access_token": str(refresh.access_token),
                    "refresh_token": str(refresh),
                }, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Identifiants incorrects"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)