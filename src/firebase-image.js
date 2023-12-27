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
let background = document.querySelector(".background img");
let memefile = document.querySelector(".meme-image img");
const memeItem = document.createElement("div");

window.getImageFrom= function(){

    var storageRef = firebase.storage().ref("images");

    let imagelist = [];
    let i = 0;

    // Now we get the references of these images
    storageRef.listAll().then(function(result) {
      result.items.forEach(function(imageRef) {
        // And finally display them
        imagelist.push(imageRef);
        console.log(imagelist.length)
        i++;
      });
    }).then(function() {
      displayImage(imagelist);
    }).catch(function(error) {
      // Handle any errors
    });

    // function displayImage(imageRef) {
    //     imageRef.getDownloadURL().then(function(url) {
    //         memefile.src=url;
    //         background.src= url;
    //         console.log(url);
    //         worldfile.src=url;
    //     }).catch(function(error) {
    //       // Handle any errors
    //     });
    // }

    function displayImage(imagelist){

      const memeContainer3 = document.createElement("div");
      memeContainer3.className = "meme-container3";

      document.body.appendChild(memeContainer3);

      imagelist.forEach(function (imageRef,index){
        createMemeItem(imageRef,index,memeContainer3);
      });
    }

    function createMemeItem(imageRef,index,container){
      const memeItemDiv = document.createElement("div");
      memeItemDiv.className = "meme-item";
      memeItemDiv.id = "meme-item-"+index;

      memeItemDiv.innerHTML = `
          <div class="gaze-1">
              <div class="gaze-2"></div>
          </div>
          <div class="meme-image">
              <img src="">
          </div>
        `;

        memeItemDiv.style.animationDelay = -index*3+"s";

      container.appendChild(memeItemDiv);
      const memeImage = memeItemDiv.querySelector(".meme-image img");

      imageRef.getDownloadURL().then(function(url) {
        memeImage.src=url;
        background.src= url;
        console.log(url);
      }).catch(function(error) {
        // Handle any errors
      });
    }

}