# Here goes the endpoints
from django.urls import path
from . import views

urlpatterns = [
  path('words/', views.getData),
]