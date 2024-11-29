from django.urls import path
from .views import RegisterView, LoginView

urlpatterns = [
    path('inscription/', RegisterView.as_view(), name='inscription'),
    path('connexion/', LoginView.as_view(), name='connexion'),
]
