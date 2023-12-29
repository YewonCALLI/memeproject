import { updateMetadata } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDfPi21no_LTdi5szygldb0jF6l_ZDj9HQ",
    authDomain: "memeprojectimage.firebaseapp.com",
    projectId: "memeprojectimage",
    storageBucket: "memeprojectimage.appspot.com",
    messagingSenderId: "483003395248",
    appId: "1:483003395248:web:31c748750795d997ed1f75"
};

firebase.initializeApp(firebaseConfig);

var fileText=document.getElementById(".fileText");
var uploadPercentage = document.getElementById(".uploadPercentage");
var progress = document.getElementById(".progress");
var percentVal;
var fileItem;
var fileName;

const firestore = firebase.firestore();

function getFileTo(e){
  fileItem = e.target.files[0];
  fileName = fileItem.name;
  fileText.innerHTML = fileName;
}

function uploadImage(){
    let storageRef = firebase.storage().ref('images/'+fileName);
    const metadata = {
        customMetadata: {
          customMetadata: '0',
          contentType: 'value2'
        }
    };

    uploadTask.on('state_changed', function(snapshot){
        // console.log(snapshot);
        console.log("update")
        percentVal = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log(percentVal);
        uploadPercentage.innerHTML = percentVal + '%';
        progress.style.width = percentVal + '%';
    
    },(error)=>{
        console.log(error);
    }
    );
}