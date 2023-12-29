import { getStorage, ref, listAll, getMetadata, updateMetadata } from "firebase/storage";

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

  //custom metadata for each image
  const metadata = {
      customMetadata: {
        like_number: 0 
      }
  };

  //uploading metadata to firebase storage
  let uploadTask = storageRef.put(fileItem,metadata);


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
          fileText.src=downloadURL;
      });
  }
  );
}

const background = document.querySelector(".background img");
const memeItem = document.createElement("div");
let like_clicked_number;
let j=0;
let totalLike = 0;

window.getImageFrom= function(){

    var storageRef = firebase.storage().ref("images");
    const likebutton = document.querySelector(".like");
    let imagelist = [];
    let i = 0;

    let newMetadata;

    // Now we get the references of these images
    storageRef.listAll().then(function(result) {
      result.items.forEach(function(imageRef) {
        // And finally display them
        imagelist.push(imageRef);
        i++;

        //좋아요 수 들고오기
        // imageRef.getMetadata().then(function(metadata) {
        //   like_clicked_number = metadata.customMetadata.like_number;
        // });

        //좋아요 수 업데이트
        // likeClicked(imageRef);
      });
    }).then(function() {
      displayImage(imagelist,newMetadata);

    }).catch(function(error) {
      // Handle any errors
    });


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
      const gaze2Div = memeItemDiv.querySelector(".gaze-2");
      const memepng = document.getElementById("memepng");
      const memenumber = document.getElementById("totalmeme2");

      memenumber.innerHTML = 'Total number of meme : ' +  i;

      imageRef.getDownloadURL().then(function(url) {
        memeImage.src=url;
        background.src= url;        
      })

      //좋아요 수 들고오기
      imageRef.getMetadata().then(function(metadata) {
        const likeNumber = metadata.customMetadata.like_number;
        console.log(likeNumber);

        totalLike += parseInt(likeNumber);

        const totalLikeDiv = document.getElementById("totalmeme");
        totalLikeDiv.innerHTML = 'Total number of like : ' +  totalLike;

        gaze2Div.style.width = Math.floor(likeNumber * 0.85) + '%';
        
      });


      memeImage.addEventListener("click", function () {
        handleMemeImageClick(memeImage.src);
        j = index;
        memepng.innerHTML = imageRef.name;
      });
    }
    

    // 전역 변수로 현재 등록된 이벤트 핸들러를 저장할 변수 추가
    let currentLikeClickHandler = null;

    function handleMemeImageClick(url) {
      const memeClickedImage = document.querySelector(".meme-clicked img");

      const findMatchingImage = () => {
        return new Promise((resolve, reject) => {
          const findImage = async (imageRef) => {
            const url2 = await imageRef.getDownloadURL();
            if (url2 === url) {
              resolve(imageRef);
            }
          };

          Promise.all(imagelist.map(findImage)).then(() => {
            reject(new Error("매칭되는 이미지를 찾을 수 없습니다."));
          });
        });
      };

      // 이미지 찾기 Promise 실행
      findMatchingImage()
        .then((matchingImageRef) => {
          console.log("매칭된 imageRef:", matchingImageRef);
          matchingImageRef.getMetadata().then(function(metadata) {
            like_clicked_number = metadata.customMetadata.like_number;
          });

          // 이전에 등록된 이벤트 핸들러 제거
          if (currentLikeClickHandler) {
            likebutton.removeEventListener("click", currentLikeClickHandler);
          }

          // 새로운 이벤트 핸들러 등록
          const newLikeClickHandler = likeClickHandler.bind(null, matchingImageRef);
          likebutton.addEventListener("click", newLikeClickHandler);

          // 현재 등록된 이벤트 핸들러 저장
          currentLikeClickHandler = newLikeClickHandler;
        })
        .catch((error) => {
          if (error.message.includes("429")) {
            console.log("요청 속도 제한 초과. 기다린 후 다시 시도합니다.");
            setTimeout(() => {
              handleMemeImageClick(url); 
            }, 5000); 
          } else {
            console.error(error.message);
          }
        });

      memeClickedImage.src = url;
    }


    // 새로운 likeClickHandler 함수를 정의
    function likeClickHandler(imageRef) {
      like_clicked_number++;
      console.log(like_clicked_number);

      const newMetadata = {
        customMetadata: {
          like_number: like_clicked_number,
        },
      };

      const totalLikeDiv = document.getElementById("totalmeme");
        totalLikeDiv.innerHTML = 'Total number of ♥LIKE♥  : ' +  totalLike;


      imageRef.updateMetadata(newMetadata).then(() => {
        console.log("Like clicked. Metadata updated.");

        imageRef.getMetadata().then(function(metadata) {
          const likeNumber = metadata.customMetadata.like_number;
          console.log(likeNumber);

          const gaze2Div1 = document.querySelector("#meme-item-" + j + " .gaze-2");
          gaze2Div1.style.width = Math.floor(likeNumber * 0.7) + '%';
          
          console.log(totalLike);
        
        });
      });
    }

    // 페이지 로딩 시에도 이벤트 핸들러 초기화
    window.addEventListener("load", function() {
      likebutton.removeEventListener("click", currentLikeClickHandler);
    });

    function getImageIndex(imageRef) {
      return imagelist.findIndex((item) => {
        console.log(item.url);
        return item.url === imageRef.downloadURL;
      });
    }
    
}
