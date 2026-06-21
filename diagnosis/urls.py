from django.urls import path
from diagnosis.views import analyze, hospitals

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
 
