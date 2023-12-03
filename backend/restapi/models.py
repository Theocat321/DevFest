'''Model definitions for the restapi, handled by django'''
import uuid
from django.utils import timezone
from django.db import models

class Product(models.Model):
    '''
    Defining the product table

    id: Uniquly generated id
    title: Title of the product to be seen on page
    description: Description for the product
    cost_per_unit: cost per unit
    unit_name: what the unit is called on the website
    sourced_country: where the item is sourced
    warehouse_location: where the item is stored
    '''
    product_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=1000)
    cost_per_unit = models.FloatField()
    unit_name = models.CharField(max_length=100)
    sourced_country = models.CharField(max_length=100)
    warehouse_location = models.CharField(max_length=100)

class Basket(models.Model):
    '''
    Defining the basket table

    basket_id = unique basket ID field
    pin: 8 digit pin
    host: Host id
    end_date_time: end date time for the basket
    '''
    basket_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    pin= models.BigIntegerField(default=00000000)
    host= models.CharField(max_length=1000, default="")
    end_date_time= models.DateTimeField(default=timezone.now, blank=True)

class BasketItem(models.Model):
    '''
    Defining the basketItems link table

    product_id:  Forgien key to Product table
    basket_id: Forgien key to Basket table
    quantity: Quantity of items in the order
    cost: Price of this quantity of items
    confirmed_item: Whether item is confirmed or pending
    user_added: User id for who added it
    '''
    product_id= models.ForeignKey(Product, on_delete=models.CASCADE)
    basket_id= models.ForeignKey(Basket, on_delete=models.CASCADE)
    quantity= models.IntegerField()
    cost= models.FloatField()
    confirmed_item= models.BooleanField()
    user_added= models.CharField(max_length=1000)

##TODO: research into how to store the user id