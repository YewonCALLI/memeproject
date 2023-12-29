var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); // 안드로이드 아이폰을 검사해 체크

let img;
let selButton = 0;

let paintColor = (0, 0, 0);
let box = 70;
let canvas;
let canvas2;
let selectimg="";
let preselectimg="";
let input2 = document.getElementById('textinput');
let img1;
let n=0;
let result2="";
let preinput;
let savefile;


function setup() {

  canvas = createCanvas(350, 420);
  canvas2 = createGraphics(350, 420);
  stroke(0, 0, 0);
  background(255);

}


function preload(){
  img1 = loadImage("./meme/palette.png");
}

function draw() {

  if(n==0){
    canvas2.background(255); 
  }
  image(canvas2, 0, 0, 350, 420);
  image(img1, 0, 0, 350,70);


  // image(img[2], 0, 0);
  // image(img[3], 550, 0);
  // image(img[4], 0, 530);
  strokeWeight(3);
  stroke(255);
  if (selectimg != ""&n==0){
    canvas2.image(selectimg,0,120,350,200);
    preselectimg = selectimg;
    n++;
  }
  
  if (selectimg != preselectimg){
    selectimg = selectimg;
    n=0;
  }

  //click result image to add to canvas
  result.onclick = function(e) {
    let img = new Image();
    img.src = e.target.src;
    img.onload = function() {
      selectimg = loadImage(img.src);
    };
  };

  //click submit button to save canvas
  let button3 = document.getElementById('button3');
  let modal3 = document.querySelector('.modal3-container');

  button3.onclick = function() {
    input2 = document.getElementById('textinput');
    push();
    canvas2.strokeWeight(0);
    canvas2.textSize(15);
    canvas2.textAlign(CENTER);
    canvas2.text(input2.value, 175, 370);
    pop();
    saveCanvas(canvas2, 'myCanvas', 'jpg');
    modal3.style.display="flex";

  };

  //crayons
  if (mouseIsPressed == true) {
    let a = 21.875;
    let b=5;
    if (mouseX < a && mouseX > 0 && mouseY < box && mouseY > 0) {
      b=5;
      paintColor = color(233, 125, 129);
    }
    if (mouseX < a*2 && mouseX >a && mouseY <box && mouseY >0) {
      b=5;
      paintColor = color(255, 155, 115);
    }
    if (mouseX < a*3 && mouseX >a*2 && mouseY <box && mouseY >0) {
      b=5;
      paintColor = color(209, 178, 116);
    }
    if (mouseX < a*4 && mouseX >a*3 && mouseY <box && mouseY >0) {
      b=5;
      paintColor = color(207, 204, 162);
    }
    if (mouseX < a*5 && mouseX >a*4 && mouseY <box && mouseY >0) {
      b=5;
      paintColor = color(189, 213, 94);
    }
    if (mouseX < a*6 && mouseX >a*5 && mouseY <box && mouseY >0) {
      b=5;
      paintColor = color(169, 219, 208);
    }
    if (mouseX < a*7 && mouseX >a*6 && mouseY <box && mouseY >0) {
      b=5;
      paintColor = color(83, 174, 168);
    }
    if (mouseX < a*8 && mouseX >a*7 && mouseY <box && mouseY >0) {
      b=5;
      paintColor = color(106, 101, 187);
    }
    if (mouseX < a*9 && mouseX >a*8 && mouseY <box && mouseY >0) {
      b=5;
      paintColor = color(154, 84, 206);
    }
    if (mouseX < a*10 && mouseX >a*9 && mouseY <box && mouseY >0) {
      b=5;
      paintColor = color(229, 115, 174);
    }
    if (mouseX < a*11 && mouseX >a*10 && mouseY <box && mouseY >0) {
      b=5;
      paintColor = color(149, 16, 21);
    }
    if (mouseX < a*12 && mouseX >a*11 && mouseY <box && mouseY >0) {
      b=5;
      paintColor = color(69, 36, 91);
    }
    if (mouseX < a*13 && mouseX >a*12 && mouseY <box && mouseY >0) {
      b=5;
      paintColor = color(76, 81, 31);
    }
    if (mouseX < a*14 && mouseX >a*13 && mouseY <box && mouseY >0) {
      b=5;
      paintColor = color(0, 0, 0);
    }
    if (mouseX < a*15 && mouseX >a*14 && mouseY <box && mouseY >0) {
      b=5;
      paintColor = color(154, 154, 154);
    }
    if (mouseX < a*16 && mouseX >a*15 && mouseY <box && mouseY >0) {
      canvas2.background(255);
    }
    

    
    canvas2.strokeWeight(b);
    canvas2.stroke(paintColor);


    if (mouseY > 100 && mouseY < 300) {
      canvas2.line(pmouseX, pmouseY, mouseX, mouseY);
    }


  }


}

  