'''Functions that are called when the user visits the root associated'''
import json
from rest_framework import permissions, generics
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponseBadRequest
from .models import Product, BasketItem, Basket
from .serializers import ProductSerializer


# Views here
class GetAllProducts(generics.ListCreateAPIView):
    '''
    Using django Rest-api to return all product objects
    '''
    permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]
    queryset = Product.objects.all() # Ignore the error - Django syntax - still works
    serializer_class = ProductSerializer

@csrf_exempt
def add_too_basket(req):
    '''Adding to the basket from request'''
    # Create new object with req info
    body_unicode = req.body.decode('utf-8')
    body = json.loads(body_unicode)
    # Check details are valid
    
    # Check if password and pin match
    items = Basket.objects.all().filter(pin=body['pin']).filter(pw=body['pw']).values()# ignore error here
    # If the item is not valid
    if len(items) == 0:
        return HttpResponseBadRequest("Pin and Password don't match")

    # Get the product instance to save
    current_product = Product.objects.all().filter(product_id=body['product_id'])

    # Get the basket instance to save
    current_basket = Basket.objects.all().filter(pin=body['pin'])

    # If log in valid push to table
    current_item = BasketItem(
        product_id = current_product[0],
        pin = current_basket[0],
        quantity= body['quantity'],
        cost= body['cost'],
        confirmed_item= body['confirmed'],
        user_added= body['user_added']
    )
    current_item.save()

    # return success
    return JsonResponse({"":""})

@csrf_exempt
def new_basket(req):
    '''Creates a new basket from the request body data'''
    #Todo: error handling
    body_unicode = req.body.decode('utf-8')
    body = json.loads(body_unicode)
    # todo: check values are correct
    basket = Basket(pin = body['pin'], 
                    host = body['browserfingerprint'],
                    pw = body['pw'],
                    end_date_time = body['endtime'])
    basket.save()
    return JsonResponse({'value':'success'})

@csrf_exempt
def join_basket(req):
    '''
    Checks details of current baskets to see if it matches
    Returns 200 and basket contents if request params corrects
    '''
    body_unicode = req.body.decode('utf-8')
    body = json.loads(body_unicode)
    # only fetch code if both pin and pw present
    if 'pin' in body.keys() and 'pw' in body.keys():
        items = Basket.objects.all().filter(pin=body['pin']).filter(pw=body['pw']).values()# ignore error here
        # If the item is valid
        if len(items) == 0:
            return HttpResponseBadRequest("Pin and Password don't match")
        # Get end time
        end_date_time = items[0]['end_date_time']
        # Fetch item basket items
        basket_items = list(BasketItem.objects.all().filter(pin=body['pin']).values())
        # Couldnt get inner join to work- heuristic apporach now
        for item in basket_items:
            # Get the current product info and adds it into the basket item list
            product_info = list(Product.objects.all().filter(product_id=item['product_id_id']).values()) # error is false
            item['product_info'] = product_info[0]
        return JsonResponse({"data":basket_items,'end_time':end_date_time})
    return HttpResponseBadRequest("Pin and Password don't match")

@csrf_exempt
def update_pending_items(req):
    '''Takes in a list from the request and updates the items to not be pending'''
    body_unicode = req.body.decode('utf-8')
    body = json.loads(body_unicode)
    if 'pin' in body.keys() and 'pw' in body.keys():
        items = Basket.objects.all().filter(pin=body['pin']).filter(pw=body['pw']).values()# ignore error here
        # If the item is valid
        if len(items) == 0:
            return HttpResponseBadRequest("Pin and Password don't match")
        # Updating the confirmed value in basket items
        product_to_update = body['updated_products']
        user_id = body['user_added']
        pin = body['pin']
        for product in product_to_update:
            current_id = product['product_id_id']
            current_basket_item =  list(BasketItem.objects.all().filter(product_id=current_id).filter(user_added=user_id).filter(pin=pin))
            current_basket_item = current_basket_item[0]
            current_basket_item.confirmed_item = True
            print(current_basket_item)
            current_basket_item.save()
        return JsonResponse({"":""})

    return HttpResponseBadRequest("Pin and Password don't match")

@csrf_exempt
def order_items(req):
    '''Function to order the basket items
    
    In practise it checks how many items in the cart and returns 200 if enough and deletes from db

    minumum_basket_items can be changed for the minimum number of items
    '''
    minimum_basket_items = 25
    body_unicode = req.body.decode('utf-8')
    body = json.loads(body_unicode)
    if 'pin' in body.keys() and 'pw' in body.keys():
        items = Basket.objects.all().filter(pin=body['pin']).filter(pw=body['pw']).values()# ignore error here
        # If the item is valid
        if len(items) == 0:
            return HttpResponseBadRequest("Pin and Password don't match")
        basket_items = BasketItem.objects.all().filter(pin = body['pin']).filter(confirmed_item = True).values()
        total_quantity = 0
        for item in basket_items:
            total_quantity += item['quantity']
        # Delete entry from db
        Basket.objects.filter(pin=body['pin']).delete()

        if total_quantity >= minimum_basket_items:
            return JsonResponse({"enough_items":True})
        return JsonResponse({"enough_items":False})
    return HttpResponseBadRequest()