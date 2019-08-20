from django.shortcuts import render,HttpResponse
from django.http import JsonResponse
from .detection.Object_detection_image import test

# Create your views here.

def getItems(request):
    for item in test():
        print (item)
    return JsonResponse(test(),safe=False)

    # return HttpResponse('<p>test</p>')