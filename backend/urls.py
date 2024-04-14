from django.urls import path
from backend.views import show_books

urlpatterns = [
    path("add_book", show_books, ),
]