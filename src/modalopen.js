let step=1;

const modal = document.querySelector('.modal2-container');
const modal3 = document.querySelector('.modal3-container');
const btnOpenModal=document.querySelector('.btn-open-modal');
const btnOpenModal2=document.querySelector('.btn-open-modal2');

const button4 = document.querySelector('.Rectangle-57');
const button5 = document.querySelector('.Rectangle-56');
const button6 = document.querySelector('.Rectangle-61');
const meme_info1 = document.querySelector('.meme_info1');
const meme_info2 = document.querySelector('.meme_info2');
const meme_info3 = document.querySelector('.meme_info3');
const meme_info4 = document.querySelector('.meme_info4');

btnOpenModal.addEventListener("click", ()=>{
    modal.style.display="flex";
    if(step==1){
    meme_info1.style.display="block";
    meme_info2.style.display="none";
    meme_info3.style.display="none";
    meme_info4.style.display="none";
    }else if(step==2){
      meme_info1.style.display="none";
      meme_info2.style.display="flex";
      meme_info3.style.display="none";
      meme_info4.style.display="none";
    }else if(step==3){
      meme_info1.style.display="none";
      meme_info2.style.display="none";
      meme_info3.style.display="block";
      meme_info4.style.display="none";
    }else if(step==4){  
      meme_info1.style.display="none";
      meme_info2.style.display="none";
      meme_info3.style.display="none";
      meme_info4.style.display="block";
    }else if(step==5){
      modal.style.display="none";
      step=1;
    }
});


btnOpenModal2.addEventListener("click", ()=>{
    console.log("click");
  getImageFrom();
});

button4.addEventListener("click", ()=>{
    step++;
    console.log(step);

    if(step==1){
    meme_info1.style.display="block";
    meme_info2.style.display="none";
    meme_info3.style.display="none";
    meme_info4.style.display="none";
    }else if(step==2){
      meme_info1.style.display="none";
      meme_info2.style.display="block";
      meme_info3.style.display="none";
      meme_info4.style.display="none";
    }else if(step==3){
      meme_info1.style.display="none";
      meme_info2.style.display="none";
      meme_info3.style.display="block";
      meme_info4.style.display="none";
    }else if(step==4){  
      meme_info1.style.display="none";
      meme_info2.style.display="none";
      meme_info3.style.display="none";
      meme_info4.style.display="block";
    }else if(step==5){
      modal.style.display="none";
      step=1;
    }
});

button5.addEventListener("click", ()=>{
    step--;

    if(step==1){
    meme_info1.style.display="block";
    meme_info2.style.display="none";
    meme_info3.style.display="none";
    meme_info4.style.display="none";
    }else if(step==2){
      meme_info1.style.display="none";
      meme_info2.style.display="block";
      meme_info3.style.display="none";
      meme_info4.style.display="none";
    }else if(step==3){
      meme_info1.style.display="none";
      meme_info2.style.display="none";
      meme_info3.style.display="block";
      meme_info4.style.display="none";
    }else if(step==4){  
      meme_info1.style.display="none";
      meme_info2.style.display="none";
      meme_info3.style.display="none";
      meme_info4.style.display="block";
    }else if(step==5){
      modal.style.display="none";
      step=1;
    }
});

button6.addEventListener("click", ()=>{
    modal3.style.display="none";
});