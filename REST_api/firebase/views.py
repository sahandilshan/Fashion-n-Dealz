from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
import pyrebase, json
from django.views.decorators.csrf import csrf_exempt
from requests.exceptions import ConnectionError, HTTPError

config = {
    'apiKey': "AIzaSyCXt8OcSfXO5WSiSJa3SHDTiC9EcgS0dOw",
    'authDomain': "rest-api-ba7ba.firebaseapp.com",
    'databaseURL': "https://rest-api-ba7ba.firebaseio.com",
    'projectId': "rest-api-ba7ba",
    'storageBucket': "rest-api-ba7ba.appspot.com",
    'messagingSenderId': "629624904442"
}

fire = pyrebase.initialize_app(config)
auth = fire.auth()


@csrf_exempt
def login(request):
    data = request.body
    data = json.loads(data)
    print(data)
    email = data.get('email')
    pwd = data.get('pass')
    # print(f'{email} :{pwd}')
    try:
        user = auth.sign_in_with_email_and_password(email, pwd)
        print(user)
        return HttpResponse(user)

    except HTTPError as e:
        return JsonResponse({'result': 'invalid credentials'})
    except ConnectionError as e:
        return JsonResponse({'result': 'no network'})


@csrf_exempt
def createUser(request):
    data = request.body
    data = json.loads(data)
    print(data)

    email = data.get('email')
    pwd = data.get('pass')

    user = auth.create_user_with_email_and_password(email, pwd)
    print(user)
    auth.send_email_verification(user['idToken'])
    return HttpResponse(user)


@csrf_exempt
def resetPassword(request):
    data = request.body
    data = json.loads(data)
    print(data)
    email = data.get('email')
    user = auth.send_password_reset_email(email)
    print('user')
    return HttpResponse(user)
