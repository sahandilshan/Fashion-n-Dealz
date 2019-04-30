# -*- coding: utf-8 -*-
"""
Created on Sat Apr 27 16:21:37 2019

@author: Sahan Dilshan
"""

from keras.applications.xception import Xception
from keras.preprocessing import image
from keras.layers import GlobalAveragePooling2D, Dense, Dropout,Activation,Flatten
from keras.layers import Input
from keras.models import Model
from keras.preprocessing.image import ImageDataGenerator
from keras.callbacks import ModelCheckpoint, EarlyStopping, ReduceLROnPlateau
from keras.optimizers import Adam,SGD,RMSprop



train_data_dir = 'mydata\\train'
test_data_dir = 'mydata\\test'
img_rows,img_cols = 299,299
#batch_size = 64
train_batchsize = 8
val_batchsize = 8



train_datagen = ImageDataGenerator(
      rescale=1./255,
      rotation_range=30,
      width_shift_range=0.3,
      height_shift_range=0.3,
      horizontal_flip=True,
      fill_mode='nearest')

    
 
test_datagen = ImageDataGenerator(rescale=1./255)
 
train_generator = train_datagen.flow_from_directory(
        train_data_dir,
        target_size=(img_rows, img_cols),
        batch_size=train_batchsize,
        class_mode='categorical',
        shuffle=True)
 
test_generator = test_datagen.flow_from_directory(
        test_data_dir,
        target_size=(img_rows, img_cols),
        batch_size=val_batchsize,
        class_mode='categorical',
        shuffle=False)

no_of_trainImgs = train_generator.n
classes = train_generator.num_classes
no_of_testImgs = test_generator.n





xcep = Xception(include_top=False, weights='imagenet',input_shape = (img_rows, img_cols, 3))
xcep.summary()


for layer in xcep.layers:
	layer.trainable = False

last_layer = xcep.output



top_model = xcep.output
top_model = GlobalAveragePooling2D()(top_model)
top_model = Dense(1024,activation='relu')(top_model)
top_model = Dense(1024,activation='relu')(top_model)
top_model = Dense(512,activation='relu')(top_model)
top_model = Dense(classes,activation='softmax')(top_model)



# this is the model we will train
test = Model(inputs=xcep.input, outputs=top_model)

test.summary()

test.layers[-1].trainable


checkpoint = ModelCheckpoint("Trained Models/sdgp.h5",
                             monitor="val_loss",
                             mode="min",
                             save_best_only = True,
                             verbose=1)

earlystop = EarlyStopping(monitor = 'val_loss', 
                          min_delta = 0, 
                          patience = 6,
                          verbose = 1,
                          restore_best_weights = True)

reduce_lr = ReduceLROnPlateau(monitor = 'val_loss',
                              factor = 0.2,
                              patience = 2,
                              verbose = 1,
                              min_delta = 0.0001)


callbacks = [earlystop, checkpoint, reduce_lr]

sgd = SGD(lr=0.0001, decay=1e-6, momentum=0.9, nesterov=True)
#rms = RMSprop(lr = 0.0001) 
adam = Adam(lr=0.0001, beta_1=0.9, beta_2=0.999, epsilon=None, decay=0.0, amsgrad=False)

batch_size = 64


test.compile(loss = 'categorical_crossentropy',
              optimizer = RMSprop(lr = 0.0001) ,
              metrics = ['accuracy'])

history = test.fit_generator(
    train_generator,
    steps_per_epoch = no_of_trainImgs // batch_size,
    epochs = 40,
    callbacks = callbacks,
    validation_data = test_generator,
    validation_steps = no_of_testImgs // batch_size)

