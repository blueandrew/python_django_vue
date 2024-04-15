from django.urls import path
from backend.views import works, data_test

urlpatterns = [
    path("works", works),
    path("data_test", data_test),

]