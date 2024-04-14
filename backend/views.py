# from django.shortcuts import render

# Create your views here.
from backend.models import Music
from backend.serializers import MusicSerializer

from rest_framework import viewsets


# Create your views here.
class MusicViewSet(viewsets.ModelViewSet):
    queryset = Music.objects.all()
    serializer_class = MusicSerializer
