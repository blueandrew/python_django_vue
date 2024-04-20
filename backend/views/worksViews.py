# from django.shortcuts import render

# Create your views here.
import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core import serializers  
from django.views.decorators.csrf import csrf_exempt

from backend.serializers.worksSerializers import WorksSerializer, WorksDetailedSerializer
from backend.models import Works


@csrf_exempt
@require_http_methods(['GET', 'POST', 'PATCH', 'DELETE'])
def works(request):
    if request.method =='GET':
        query_data = Works.objects.filter(status=1)

        query_data_serializer = WorksSerializer(query_data, many=True)
        response = JsonResponse(query_data_serializer.data, safe=False)

        return response

    if request.method =='POST':
        request_data = json.loads(request.body)
        query_create = Works.objects.create(
            title=request_data['title'],
            url=request_data['url']
        )

        result_info = {
            'message': 'ok' if query_create else 'errpr'
        }
        response = JsonResponse(result_info)

        return response
    if request.method =='PATCH':
        request_data = json.loads(request.body)
        work_id = request_data['work_id']
        
        query_data = Works.objects.filter(id=work_id)
        query_data.update(
            title=request_data['title'],
            url=request_data['url'],
            status=request_data['status']
        )

        result_info = {
            'message': 'ok' if query_data else 'errpr'
        }
        response = JsonResponse(result_info)

        return response

    if request.method =='DELETE':
        request_data = json.loads(request.body)
        work_id = request_data['work_id']

        query_data = Works.objects.get(id=work_id)
        query_data.delete()

        result_info = {
            'message': 'ok' if query_data else 'errpr'
        }
        response = JsonResponse(result_info)

        return response

@csrf_exempt
@require_http_methods(['POST'])
def worksDetailed(request):
    request_data = json.loads(request.body)
    work_id = request_data['work_id']
    query_data = Works.objects.get(id=work_id)

    query_data_serializer = WorksDetailedSerializer(query_data)
    response = JsonResponse(query_data_serializer.data)

    return response