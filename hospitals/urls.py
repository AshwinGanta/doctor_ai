from django.urls import path
from .views import get_hospitals

urlpatterns = [

    path("nearby/", get_hospitals),

]