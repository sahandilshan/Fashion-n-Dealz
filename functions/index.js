const functions = require('firebase-functions');
 const cors=require("cors")({origin:true});
 const fs=require("fs");
 const UUID=require("uuid-v4");

 //const  gcconfig={
   //projectId:"fashionndealz",
   //keyFilename:"picture.json"
 //};
 //const gcs= require("@google-cloud/storage")({gcconfig});

const {Storage} = require('@google-cloud/storage');
const gcs = new Storage({
    projectId:"fashionndealz",
    keyFilename:"picture.json"
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.storeImage= functions.https.onRequest((request, response) => {
     cors(request,response,()=>{
         const body=JSON.parse(request.body);
        
         fs.writeFileSync("/tmp/uploaded-image.jpg",body.image,"base64",err => {
           console.log(err);
           return response.status(500).json({error:err});
         });
        
         const uuid=UUID();
         const bucket=gcs.bucket("fashionndealz.appspot.com");
         

         bucket.upload("/tmp/uploaded-image.jpg",{
           uploadType:"media",
           destination:"/pics/"+uuid+".jpg",
           metadata:{
               metadata:{
               contentType:"image/jpeg",
               firebaseStorageDownloadTokens:uuid
              }
           }
         },(err,file)=>{
             if(!err){
                  response.status(201).json({
                     // imageUrl:"https://firebasestorage.googleapis.com/v0/b/jesper-12dc1.appspot.com/o/images/firebase-logo.png?alt=media&token=adab88a6-0585-4c7d-8ecc-186f49859fc8"
                     imageUrl:"https://firebasestorage.googleapis.com/v0/b/"+
                      bucket.name +
                      "/o/"+
                      encodeURIComponent(file.name)+
                      "?alt=media&token="+uuid 
                  });
             }
             else{
                 console.log(err);
                 response.status(500).json({error:err});

             }
         }
         
         );
     });
  
 });