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

def add_too_basket(req):
    '''Adding to the basket from request'''
    # Create new object with req info

    # Push to table

    # return success

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

