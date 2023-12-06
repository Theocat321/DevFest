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

def get_current_basket(req):
    '''Using the incoming request find and return all items in basket'''
    print(req)
    # queryset = BasketItem.objects.filter()

    # return the relevant items

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
    Returns 200 if the basket details match and the user can
    join the basket
    '''
    body_unicode = req.body.decode('utf-8')
    body = json.loads(body_unicode)
    # only fetch code if both pin and pw present
    if 'pin' in body.keys() and 'pw' in body.keys():
        print(body)
        items = Basket.objects.all().filter(pin=body['pin']).filter(pw=body['pw'])# ignore error here
        # If the item is valid
        if len(items) == 0:
            return HttpResponseBadRequest("Pin and Password don't match")
        # Fetch item basket items
        basket_items = list(BasketItem.objects.all().filter(pin=body['pin']).values())
        return JsonResponse({"data":basket_items})
    return HttpResponseBadRequest("Pin and Password don't match")

