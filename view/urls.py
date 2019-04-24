from django.urls import path
from . import views

urlpatterns = [
    path('',views.home,name='view-home'),
     path('about/',views.about,name='view-about'),
]