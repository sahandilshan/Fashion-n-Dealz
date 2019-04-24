from django.shortcuts import render
from django.http import HttpResponse
import pyrebase
posts=[
    {
       'Name':'Muaaz',
       'Age':'22',
       'Job':'Software Engineer'
    },
    {
       'Name':'Roy',
       'Age':'24',
       'Job':'QA'

    }
]
config = {
    "apiKey": "AIzaSyDgCSuHb1FL4UbA7CJsWtKanpMxPdiqUFQ",
    "authDomain": "app1-3223c.firebaseapp.com",
    "databaseURL": "https://app1-3223c.firebaseio.com",
    "storageBucket": "app1-3223c.appspot.com"
    }
# Create your views here.
def home(request):
    context={
        'posts':posts
    }
    m=2*2
    return render(request,'view/home.html',context)

def about(request):
    

    firebase = pyrebase.initialize_app(config)

    storage = firebase.storage()

    storage.child('pics/033ce231-24dc-4698-bd52-d4bc16f0b7a9.jpg').download('','downloaded.jpg')
   

    return render(request,'view/about.html')