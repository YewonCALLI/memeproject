import p5 from "p5";

var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); // 안드로이드 아이폰을 검사해 체크

let started = false;

var sketch = (p5) => {
  let img;
  let selButton = 0;

  let paintColor = (0, 0, 0);
  let box = 70;
  let canvas;
  let canvas2;
  let selectimg = "";
  let preselectimg = "";
  let input2 = document.getElementById("textinput");
  let img1;
  let cat;
  let n = 0;
  let result2 = "";
  let preinput;
  let savefile;

  let result = document.getElementById("result");

  p5.setup = () => {
    canvas = p5.createCanvas(350, 420);
    canvas2 = p5.createGraphics(350, 420);
    p5.stroke(0, 0, 0);
    p5.background(255);
  };

  p5.preload = () => {
    img1 = p5.loadImage("./meme/palette.png");
    cat = p5.loadImage("./meme/cat.jpg");
  };

  p5.draw = () => {
    if (n == 0) {
      canvas2.background(255);
    }
    p5.image(canvas2, 0, 0, 350, 420);
    p5.image(img1, 0, 0, 350, 70);
    // console.log("selectedimg", selectimg);

    // image(img[2], 0, 0);
    // image(img[3], 550, 0);
    // image(img[4], 0, 530);
    p5.strokeWeight(3);
    p5.stroke(255);

    if ((selectimg != "") & (n == 0)) {
      canvas2;
      console.log("go");
      canvas2.image(selectimg, 0, 120, 350, 200);
      preselectimg = selectimg;
      n++;
    }

    if (selectimg != preselectimg) {
      selectimg = selectimg;
      n = 0;
    }

    // //click result image to add to canvas
    result.onclick = (e) => {
      console.log(e.target.src);
      let img = p5.createImg(e.target.src);
      selectimg = img;
      img.onload = function () {
        console.log("image loaded");
      };
    };

    // //click submit button to save canvas
    let button3 = document.getElementById("button3");
    let modal3 = document.querySelector(".modal3-container");

    button3.onclick = () => {
      console.log("submit button clicked");
      input2 = document.getElementById("textinput");
      p5.push();
      canvas2.strokeWeight(0);
      canvas2.textSize(15);
      canvas2.textAlign(p5.CENTER);
      canvas2.text(input2.value, 175, 370);
      p5.pop();
      p5.saveCanvas(canvas2, "myCanvas", "jpg");
      modal3.style.display = "flex";
    };

    //crayons
    if (p5.mouseIsPressed == true) {
      let a = 21.875;
      let b = 5;
      if (p5.mouseX < a && p5.mouseX > 0 && p5.mouseY < box && p5.mouseY > 0) {
        b = 5;
        paintColor = p5.color(233, 125, 129);
      }
      if (
        p5.mouseX < a * 2 &&
        p5.mouseX > a &&
        p5.mouseY < box &&
        p5.mouseY > 0
      ) {
        b = 5;
        paintColor = p5.color(255, 155, 115);
      }
      if (
        p5.mouseX < a * 3 &&
        p5.mouseX > a * 2 &&
        p5.mouseY < box &&
        p5.mouseY > 0
      ) {
        b = 5;
        paintColor = p5.color(209, 178, 116);
      }
      if (
        p5.mouseX < a * 4 &&
        p5.mouseX > a * 3 &&
        p5.mouseY < box &&
        p5.mouseY > 0
      ) {
        b = 5;
        paintColor = p5.color(207, 204, 162);
      }
      if (
        p5.mouseX < a * 5 &&
        p5.mouseX > a * 4 &&
        p5.mouseY < box &&
        p5.mouseY > 0
      ) {
        b = 5;
        paintColor = p5.color(189, 213, 94);
      }
      if (
        p5.mouseX < a * 6 &&
        p5.mouseX > a * 5 &&
        p5.mouseY < box &&
        p5.mouseY > 0
      ) {
        b = 5;
        paintColor = p5.color(169, 219, 208);
      }
      if (
        p5.mouseX < a * 7 &&
        p5.mouseX > a * 6 &&
        p5.mouseY < box &&
        p5.mouseY > 0
      ) {
        b = 5;
        paintColor = p5.color(83, 174, 168);
      }
      if (
        p5.mouseX < a * 8 &&
        p5.mouseX > a * 7 &&
        p5.mouseY < box &&
        p5.mouseY > 0
      ) {
        b = 5;
        paintColor = p5.color(106, 101, 187);
      }
      if (
        p5.mouseX < a * 9 &&
        p5.mouseX > a * 8 &&
        p5.mouseY < box &&
        p5.mouseY > 0
      ) {
        b = 5;
        paintColor = p5.color(154, 84, 206);
      }
      if (
        p5.mouseX < a * 10 &&
        p5.mouseX > a * 9 &&
        p5.mouseY < box &&
        p5.mouseY > 0
      ) {
        b = 5;
        paintColor = p5.color(229, 115, 174);
      }
      if (
        p5.mouseX < a * 11 &&
        p5.mouseX > a * 10 &&
        p5.mouseY < box &&
        p5.mouseY > 0
      ) {
        b = 5;
        paintColor = p5.color(149, 16, 21);
      }
      if (
        p5.mouseX < a * 12 &&
        p5.mouseX > a * 11 &&
        p5.mouseY < box &&
        p5.mouseY > 0
      ) {
        b = 5;
        paintColor = p5.color(69, 36, 91);
      }
      if (
        p5.mouseX < a * 13 &&
        p5.mouseX > a * 12 &&
        p5.mouseY < box &&
        p5.mouseY > 0
      ) {
        b = 5;
        paintColor = p5.color(76, 81, 31);
      }
      if (
        p5.mouseX < a * 14 &&
        p5.mouseX > a * 13 &&
        p5.mouseY < box &&
        p5.mouseY > 0
      ) {
        b = 5;
        paintColor = p5.color(0, 0, 0);
      }
      if (
        p5.mouseX < a * 15 &&
        p5.mouseX > a * 14 &&
        p5.mouseY < box &&
        p5.mouseY > 0
      ) {
        b = 5;
        paintColor = p5.color(154, 154, 154);
      }
      if (
        p5.mouseX < a * 16 &&
        p5.mouseX > a * 15 &&
        p5.mouseY < box &&
        p5.mouseY > 0
      ) {
        canvas2.background(255);
      }

      canvas2.strokeWeight(b);
      canvas2.stroke(paintColor);

      if (p5.mouseY > 100 && p5.mouseY < 300) {
        canvas2.line(p5.pmouseX, p5.pmouseY, p5.mouseX, p5.mouseY);
      }
    }
  };
};

new p5(sketch);
