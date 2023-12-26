import { getStorage, ref, listAll } from "firebase/storage";

var fileText=document.querySelector(".fileText");
var uploadPercentage = document.querySelector(".uploadPercentage");
var progress = document.querySelector(".progress");
var percentVal;
var fileItem;
var fileName;
const firebaseConfig = {
    apiKey: "AIzaSyDfPi21no_LTdi5szygldb0jF6l_ZDj9HQ",
    authDomain: "memeprojectimage.firebaseapp.com",
    projectId: "memeprojectimage",
    storageBucket: "memeprojectimage.appspot.com",
    messagingSenderId: "483003395248",
    appId: "1:483003395248:web:31c748750795d997ed1f75"
    };

firebase.initializeApp(firebaseConfig);


window.getFileTo = function(event){
fileItem = event.target.files[0];
fileName = fileItem.name;
}

window.uploadImageTo= function(){
let storageRef = firebase.storage().ref('images/'+fileName);
let uploadTask = storageRef.put(fileItem);

uploadTask.on('state_changed', function(snapshot){
    console.log(snapshot);
    percentVal = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    console.log(percentVal);
    uploadPercentage.innerHTML = percentVal + '%';
    progress.style.width = percentVal + '%';
},(error)=>{
    console.log(error);
},()=>{
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=>{
        console.log(downloadURL);
        fileText.src=downloadURL;
    });
}
);
}

let worldfile = document.querySelector(".world img");

window.getImageFrom= function(){

    // Create a reference under which you want to list
    const listRef = firebase.storage().ref('images/'+fileName);

    // Find all the prefixes and items.
    listAll(listRef)
    .then((res) => {
        res.prefixes.forEach((folderRef) => {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
        });
        res.items.forEach((itemRef) => {
        // All the items under listRef.
        });
    }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error)
    });

}