# -*- coding: utf-8 -*-
"""
Created on Sat Apr 27 19:12:09 2019

@author: Sahan Dilshan
"""

import numpy as np
from keras.models import load_model
from keras.preprocessing import image
import os
from os import listdir
from os.path import isfile, join
from keras.preprocessing.image import ImageDataGenerator


validation_data_dir = './mydata/test/'
img_width, img_height, img_depth = 299,299,3
batch_size = 64 

validation_datagen = ImageDataGenerator(rescale=1./255)

validation_generator = validation_datagen.flow_from_directory(
        validation_data_dir,
        target_size=(img_width, img_height),
        batch_size=batch_size,
        class_mode='categorical',
        shuffle=False)

class_labels = validation_generator.class_indices
class_labels = {v: k for k, v in class_labels.items()}



model = load_model('Trained Models/shirt_shoe.h5')
print("model was successfully loaded.")




#preImg = preImg.reshape((1, preImg.shape[0], preImg.shape[1], preImg.shape[2]))
#x = model.predict_classes(preImg)
#
#print(class_labels[x[0]])
def getMax(arr):
#    print("was here")
    max = 0.0
    x=0
    for i in range(0,len(arr)):
        if(arr[i]>max):
            max = arr[i]
            x=i
    return x

#randomly getting 4 images from the test dataset
for i in range(0,4):
    path = validation_data_dir
    folders = list(filter(lambda x: os.path.isdir(os.path.join(path, x)), os.listdir(path)))
    random_directory = np.random.randint(0,len(folders))
    path_class = folders[random_directory]
    
    file_path = path + path_class+'/'
    file_names = [f for f in listdir(file_path) if isfile(join(file_path, f))]
    random_file_index = np.random.randint(0,len(file_names))
    image_name = file_names[random_file_index]
    imgPath = file_path+image_name
#    print(file_path+"/"+image_name)
    preImg = image.load_img(imgPath,target_size=(299,299))
    preImg = image.img_to_array(preImg)
    preImg = preImg.astype("float") / 255.0
    preImg = np.expand_dims(preImg, axis=0)

    y = model.predict(preImg)
    res = np.argmax(y, axis=1)
    resVal = getMax(y[0])
#    print(str(res))
    print("Original :",path_class," predict :",class_labels[resVal])
    
    
    
    

#to check the result for one image

pathtoImg = 'mydata/mix/mix006.jpg'

preImg = image.load_img(path,target_size=(299,299))
preImg = image.img_to_array(preImg)
preImg = preImg.astype("float") / 255.0
preImg = np.expand_dims(preImg, axis=0)

y = model.predict(preImg)
for i in y[0]:
    print (i*100)
#res = np.argmax(y, axis=1)
#resVal = getMax(y[0])
##    print(str(res))
#print(" predict :",class_labels[resVal])
    

  

    



###########################################################################
