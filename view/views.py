from django.shortcuts import render
from django.http import HttpResponse
import urllib.request
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
    "apiKey": "AIzaSyBV_rxIEkOuxVL13UtzYTicE3C99g4zZx0",
    "authDomain": "fashionndealz.firebaseapp.com",
    "databaseURL": "https://fashionndealz.firebaseio.com",
    "storageBucket": "fashionndealz.appspot.com",
   
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
    db = firebase.database()

    all_imgs = db.child("customer_pic").get()
    for img in all_imgs.each():
        #print(user.key())
        #print(user.val()) # {name": "Mortimer 'Morty' Smith"}
        url=img.val()

    #storage = firebase.storage()

    #storage.child('pics/033ce231-24dc-4698-bd52-d4bc16f0b7a9.jpg').download('','downloaded.jpg')

    urllib.request.urlretrieve(url["url"], "img.jpg")
   

    return render(request,'view/about.html')