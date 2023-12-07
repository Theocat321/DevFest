"""
URL configuration for backend project.
"""
from django.contrib import admin
from django.urls import path, include
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include("restapi.urls"))
]

admin.site.site_header = 'Admin Panel'
