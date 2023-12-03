'''Functions that are called when the user visits the root associated'''
from rest_framework import permissions, generics
from .models import Product, BasketItem
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

def join_basket(req):
    '''User can join a basket'''
    pass
