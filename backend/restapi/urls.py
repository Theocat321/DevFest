'''
Url configuration for the restapi
'''
from django.urls import path
from . import views

urlpatterns = [
    path('get_products', views.GetAllProducts.as_view()),
    path('new_basket', views.new_basket),
    path('join_basket', views.join_basket)

]