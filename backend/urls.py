from django.urls import path

from backend.views import worksViews, testViews


urlpatterns = [
    path('works', worksViews.works),
    path('worksDetailed', worksViews.worksDetailed),
    path('data_test', testViews.data_test),
]