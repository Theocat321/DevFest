'''Serializers for the database tables'''
from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    '''
    Serializing the objects in the products table
    '''
    class Meta:
        '''
        Containing the fields for the model
        '''
        model = Product
        fields = [
            "product_id",
            "title",
            "description",
            "cost_per_unit",
            "unit_name",
            "sourced_country",
            "warehouse_location",
            "image_url",
            "co2_saved"
        ]
