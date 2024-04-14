from django.urls import path, include
from rest_framework.routers import DefaultRouter

from backend import views


router = DefaultRouter()
router.register('bakcend', views.MusicViewSet)

urlpatterns = [
    path('', include(router.urls)),
]