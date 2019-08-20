from django.shortcuts import render
from rest_framework.response import Response
from django.http import JsonResponse, HttpResponse
from django.core import serializers
from .models import Book


def getBook(request):
    data = {
        'name': 'Vitor',
        'location': 'Finland',
        'is_active': True,
        'count': 28
    }
    arr = [1, 2, 3, 4, 5]
    books = Book.objects.all()
    print(type(books))
    print(books)
    # serialized_obj = serializers.serialize('json', [books, ])

    # return HttpResponse(
    #     serializers.ser
    #     ialize("json", books),
    #     content_type="application/json"
    # )

    # return JsonResponse(arr, safe=False)

    dictionaries = [obj.as_dict() for obj in books]
    return JsonResponse(dictionaries, safe=False)
