from rest_framework import serializers
from backend.models import Works, WorksTage


class WorksTageSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorksTage
        fields = ['name']

class WorksSerializer(serializers.ModelSerializer):
    WorksTage = WorksTageSerializer(many=True, read_only=True)

    class Meta:
        model = Works
        fields = ['id','title', 'url', 'status', 'updated_at', 'WorksTage']

class WorksDetailedSerializer(serializers.ModelSerializer):
    WorksTage = WorksTageSerializer(many=True, read_only=True)

    class Meta:
        model = Works
        fields = ['id','title', 'url', 'updated_at', 'WorksTage']