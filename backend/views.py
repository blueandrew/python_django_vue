# from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

@require_http_methods(["GET"])
def show_books(request):
    data = {
        'name': 'John Doe',
        'age': 30,
        'email': 'john.doe@example.com'
    }
    response = JsonResponse(data, status=200)
    return response
