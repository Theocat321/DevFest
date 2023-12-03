'''Classes to register Models to Admin dashboard'''
from django.contrib import admin
from .models import Product, Basket, BasketItem

# Register models to admin
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    '''
    Adds the Product table to the admin page
    '''
    list_display = "product_id","title"

@admin.register(Basket)
class BasketAdmin(admin.ModelAdmin):
    '''
    Adds the Basket table to the admin page
    '''
    list_display = "basket_id","pin"

@admin.register(BasketItem)
class BasketItemsAdmin(admin.ModelAdmin):
    '''
    Adds the BasketItems link table to the admin page
    '''
    list_display = "product_id","basket_id"