# from django.shortcuts import render

# Create your views here.
import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core import serializers  
from django.views.decorators.csrf import csrf_exempt

from backend.models import Works


@csrf_exempt
@require_http_methods(['GET', 'POST', 'PATCH', 'DELETE'])
def works(request):
    if request.method =='GET':
        query_data = Works.objects.all()
        query_data = serializers.serialize("json", query_data)  

        response = JsonResponse(query_data, status=200, safe=False)

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
        response = JsonResponse(result_info, status=200)

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
        response = JsonResponse(result_info, status=200)

        return response

    if request.method =='DELETE':
        request_data = json.loads(request.body)
        work_id = request_data['work_id']

        query_data = Works.objects.get(id=work_id)
        query_data.delete()

        result_info = {
            'message': 'ok' if query_data else 'errpr'
        }
        response = JsonResponse(result_info, status=200)

        return response

@require_http_methods(['GET'])
def data_test(request):
    data = [{"title": f"title{i}", "url": f"url{i}", "status":  'false' }  for i in range(5) ] 

    response = JsonResponse(data, status=200, safe=False)
    return response