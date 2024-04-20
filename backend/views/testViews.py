# from django.shortcuts import render

# Create your views here.
import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core import serializers  
from django.views.decorators.csrf import csrf_exempt


@require_http_methods(['GET'])
def data_test(request):
    data = [{"title": f"title{i}", "url": f"url{i}", "status":  'false' }  for i in range(5) ] 

    response = JsonResponse(data, safe=False)
    return response