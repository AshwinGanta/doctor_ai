from django.urls import path
from .views import analyze, hospitals

urlpatterns = [

    path(
        "analyze/",
        analyze
    ),

    path(
        "hospitals/",
        hospitals
    )

]