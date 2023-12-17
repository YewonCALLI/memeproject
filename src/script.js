import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { gsap } from "gsap";
import {
  conversation,
  firstfloor,
  secondfloor,
  thirdfloor,
} from "./conversation.json";

var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); // 안드로이드 아이폰을 검사해 체크
/**
 *
 * Style Script
 */
let step = 0;
let prevStep = 0;
let scriptIsEnd = false;
const backMove = false;
const backBtn = document.querySelector(".back-btn");
backBtn.addEventListener("click", () => {
  step = 1;
  !backMove ? (backMove = true) : (backMove = false);
});
const floorBtn = document.querySelector(".floorBox");
const firstBtn = document.querySelector("#firstBtn");
const secondBtn = document.querySelector("#secondBtn");
const thirdBtn = document.querySelector("#thirdBtn");

function moveCamera(x, y, z) {
  gsap.to(camera.position, {
    x,
    y,
    z,
    duration: 5,
  });
}

function showBackBtn() {
  gsap.to(backBtn, {
    duration: 1,
    ease: "power2.out",
    opacity: 1,
    display: "block",
  });
}
function hideBackBtn() {
  gsap.to(backBtn, {
    duration: 1,
    ease: "power2.out",
    opacity: 0,
    display: "none",
  });
}

function showFloorBtn() {
  gsap.to(floorBtn, {
    duration: 1,
    ease: "power2.out",
    opacity: 1,
    display: "flex",
  });
}

function hideFloorBtn() {
  gsap.to(floorBtn, {
    duration: 1,
    ease: "power2.out",
    opacity: 0,
    display: "none",
  });
}

/**
 * Audio
 */
const soundArray = [
  "meme/sound/01.wav",
  "meme/sound/02.wav",
  "meme/sound/03.wav",
  "meme/sound/04.wav",
  "meme/sound/05.wav",
  "meme/sound/06.wav",
  "meme/sound/07.wav",
  "meme/sound/08.wav",
  "meme/sound/09.wav",
  "meme/sound/10.wav",
  "meme/sound/11.wav",
  "meme/sound/12.wav",
  "meme/sound/13.wav",
  "meme/sound/14.wav",
  "meme/sound/15.wav",
  "meme/sound/16.wav",
];

const sound1F = [
  "meme/sound/1F-1.wav",
  "meme/sound/1F-2.wav",
  "meme/sound/1F-3.wav",
  "meme/sound/1F-4.wav",
  "meme/sound/1F-5.wav",
  "meme/sound/1F-6.wav",
  "meme/sound/1F-7.wav",
];

const sound2F = [
  "meme/sound/2F-1.wav",
  "meme/sound/2F-2.wav",
  "meme/sound/2F-3.wav",
  "meme/sound/2F-4.wav",
  "meme/sound/2F-5.wav",
];

const listener = new THREE.AudioListener();

// create a global audio source
const sound = new THREE.Audio(listener);

const audioLoader = new THREE.AudioLoader();

const PlayAudio = (audio) => {
  // console.log("audio", audio);
  audioLoader.load(audio, function (buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(false);
    sound.setVolume(0.5);
    sound.play();
  });
};

/**
 * Loaders
 */
const startContainer = document.querySelector(".start-container");
const startBtn = document.querySelector(".start-btn");
let isStarted = false;
const loadingOverlayElement = document.querySelector(".loading-overlay");
const loadingBarElement = document.querySelector(".loading-bar");
const loadingTitleElement = document.querySelector(".loading-title");
const loadingProgress = document.querySelector(".loading-progress");
const modal = document.querySelector(".modal");
const loadingManager = new THREE.LoadingManager(
  // Loaded
  () => {
    loadingOverlayElement.style.display = "none";
    loadingBarElement.classList.add("ended");
    loadingBarElement.style.transform = "";
    loadingTitleElement.classList.add("fade-out");
    startContainer.style.display = "flex";
    startBtn.addEventListener("click", () => {
      // Wait a little
      window.setTimeout(() => {
        gsap.to(startContainer, {
          display: "none",
          duration: 0.5,
        });
      }, 100);
      isStarted = true;
    });

    step = 1;

    window.setTimeout((scriptIsEnd) => {
      !scriptIsEnd && modal.classList.add("on");
    }, 1500);

    typeWriter0(conversation, "host", "user", "user2", 100);

    firstBtn.addEventListener("click", () => {
      turnOnTypeWriter(
        6,
        typeWriter1(firstfloor, "host", "user", "user2", 100)
      );
    });

    secondBtn.addEventListener("click", () => {
      turnOnTypeWriter(
        8,
        typeWriter2(secondfloor, "host", "user", "user2", 100)
      );
    });

    thirdBtn.addEventListener("click", () => {
      turnOnTypeWriter(
        10,
        typeWriter3(thirdfloor, "host", "user", "user2", 100)
      );
    });
  },

  // Progress
  (itemUrl, itemsLoaded, itemsTotal) => {
    // Calculate the progress and update the loadingBarElement
    const progressRatio = itemsLoaded / itemsTotal;
    loadingBarElement.style.transform = `scaleX(${progressRatio})`;
    //html에 로딩 퍼센트 표시
    loadingProgress.textContent = `${Math.round(progressRatio * 100)}%`;
  }
);

function turnOnTypeWriter(cameraStep, typeWriter) {
  // console.log("turnOnTypeWriter");
  scriptIsEnd = false;
  modal.classList.add("on");
  step = cameraStep;
  typeWriter && typeWriter();
}

let typeStepAll = 0;

let typeStep0 = 0;

//typeWriter 단계 - host와 user의 대화를 구분하기 위한 변수 host와 user의 대화가 끝나면 0으로 초기화
function typeWriter0(conversation, hostId, userId, userId2, speed, index = 0) {
  if (typeStep0 == 3 - 1) {
    step = 2;
    prevStep = 2;
  } else if (typeStep0 == 11 - 1) {
    step = 3;
    prevStep = 3;
  } else if (typeStep0 == 13 - 1) {
    step = 4;
    prevStep = 4;
  } else if (typeStep0 == 16 - 1) {
    step = 5;
    prevStep = 5;
  }

  if (index >= conversation.length) {
    typeStep0 = 0;
    scriptIsEnd = true;
    return; // 모든 대화가 완료되면 함수 종료
  }

  let hostText = conversation[index].Host;
  let userText = conversation[index].User;
  let userText2 = conversation[index].User2;
  let hostIndex = 0;
  let userIndex = 0;

  function handleNext() {
    next(index + 1);
  }

  function host() {
    isStarted && PlayAudio(soundArray[typeStep0]);
    // console.log("json index", conversation[index].index);
    if (hostIndex < hostText.length) {
      document.getElementById(hostId).innerHTML += hostText.charAt(hostIndex);
      hostIndex++;
      setTimeout(host, speed);
    } else {
      // Host 텍스트가 모두 표시된 후 User 함수 호출
      if (userText.length > 0 || userText2.length > 0) {
        user();
      } else {
        // User 텍스트가 없는 경우 conversation[index].sec에서 타이핑된 시간을 뺀 만큼의 지연 후에 다음 대화로 넘어감
        setTimeout(
          handleNext,
          conversation[index].sec - hostText.length * speed + 100 //100은 약간의 지연을 위한 값
        );
      }
    }
  }

  function user() {
    document.getElementById(userId).innerHTML = userText;
    document.getElementById(userId2).innerHTML = userText2;

    // 기존 이벤트 리스너 제거 및 새 이벤트 리스너 추가
    if (userText.length > 0 || userText2.length > 0) {
      document.getElementById(userId).removeEventListener("click", handleNext);
      document.getElementById(userId2).removeEventListener("click", handleNext);
      document.getElementById(userId).addEventListener("click", handleNext);
      document.getElementById(userId2).addEventListener("click", handleNext);
    }
  }

  function next(nextIndex) {
    // 다음 대화로 넘어가기 전에 필요한 초기화 작업
    document.getElementById(userId).removeEventListener("click", handleNext);
    document.getElementById(userId2).removeEventListener("click", handleNext);
    document.getElementById(hostId).innerHTML = "";
    document.getElementById(userId).innerHTML = "";
    document.getElementById(userId2).innerHTML = "";
    typeStep0 += 1;
    typeStepAll += 1;
    typeWriter0(conversation, hostId, userId, userId2, speed, nextIndex);
  }
  host();
}

let typeStep1 = 0;

function typeWriter1(conversation, hostId, userId, userId2, speed, index = 0) {
  if (typeStep1 == 5 - 1) {
    step = 7;
    prevStep = 7;
  }

  if (index >= conversation.length) {
    typeStep1 = 0;
    scriptIsEnd = true;
    return; // 모든 대화가 완료되면 함수 종료
  }

  let hostText = conversation[index].Host;
  let userText = conversation[index].User;
  let userText2 = conversation[index].User2;
  let hostIndex = 0;

  function host() {
    isStarted && PlayAudio(sound1F[typeStep1]);
    if (hostIndex < hostText.length) {
      document.getElementById(hostId).innerHTML += hostText.charAt(hostIndex);
      hostIndex++;
      setTimeout(host, speed);
    } else {
      // Host 텍스트가 모두 표시된 후 User 함수 호출
      if (userText.length > 0 || userText2.length > 0) {
        user();
      } else {
        // User 텍스트가 없는 경우 약간의 지연 후에 다음 대화로 넘어감
        setTimeout(
          handleNext,
          conversation[index].sec - hostText.length * speed + 100 //100은 약간의 지연을 위한 값
        );
      }
    }
  }

  function handleNext() {
    next(index + 1);
  }

  function user() {
    document.getElementById(userId).innerHTML = userText;
    document.getElementById(userId2).innerHTML = userText2;

    // 기존 이벤트 리스너 제거 및 새 이벤트 리스너 추가
    if (userText.length > 0 || userText2.length > 0) {
      document.getElementById(userId).removeEventListener("click", handleNext);
      document.getElementById(userId2).removeEventListener("click", handleNext);
      document.getElementById(userId).addEventListener("click", handleNext);
      document.getElementById(userId2).addEventListener("click", handleNext);
    }
  }

  function next(nextIndex) {
    // 다음 대화로 넘어가기 전에 필요한 초기화 작업
    document.getElementById(userId).removeEventListener("click", handleNext);
    document.getElementById(userId2).removeEventListener("click", handleNext);
    document.getElementById(hostId).innerHTML = "";
    document.getElementById(userId).innerHTML = "";
    document.getElementById(userId2).innerHTML = "";
    typeStep1 += 1;
    typeStepAll += 1;
    typeWriter1(conversation, hostId, userId, userId2, speed, nextIndex);
  }
  host();
}

let typeStep2 = 0;

function typeWriter2(conversation, hostId, userId, userId2, speed, index = 0) {
  if (typeStep2 == 4 - 1) {
    step = 9;
    prevStep = 9;
  }

  if (index >= conversation.length) {
    typeStep2 = 0;
    scriptIsEnd = true;
    return; // 모든 대화가 완료되면 함수 종료
  }

  let hostText = conversation[index].Host;
  let userText = conversation[index].User;
  let userText2 = conversation[index].User2;
  let hostIndex = 0;

  function host() {
    isStarted && PlayAudio(sound2F[typeStep2]);
    if (hostIndex < hostText.length) {
      document.getElementById(hostId).innerHTML += hostText.charAt(hostIndex);
      hostIndex++;
      setTimeout(host, speed);
    } else {
      // Host 텍스트가 모두 표시된 후 User 함수 호출
      if (userText.length > 0 || userText2.length > 0) {
        user();
      } else {
        // User 텍스트가 없는 경우 약간의 지연 후에 다음 대화로 넘어감
        setTimeout(
          handleNext,
          conversation[index].sec - hostText.length * speed + 100 //100은 약간의 지연을 위한 값
        );
      }
    }
  }

  function handleNext() {
    next(index + 1);
  }

  function user() {
    document.getElementById(userId).innerHTML = userText;
    document.getElementById(userId2).innerHTML = userText2;

    // 기존 이벤트 리스너 제거 및 새 이벤트 리스너 추가
    if (userText.length > 0 || userText2.length > 0) {
      document.getElementById(userId).removeEventListener("click", handleNext);
      document.getElementById(userId2).removeEventListener("click", handleNext);
      document.getElementById(userId).addEventListener("click", handleNext);
      document.getElementById(userId2).addEventListener("click", handleNext);
    }
  }

  function next(nextIndex) {
    // 다음 대화로 넘어가기 전에 필요한 초기화 작업
    document.getElementById(userId).removeEventListener("click", handleNext);
    document.getElementById(userId2).removeEventListener("click", handleNext);
    document.getElementById(hostId).innerHTML = "";
    document.getElementById(userId).innerHTML = "";
    document.getElementById(userId2).innerHTML = "";
    typeStep2 += 1;
    typeStepAll += 1;
    typeWriter2(conversation, hostId, userId, userId2, speed, nextIndex);
  }
  host();
}
let typeStep3 = 0;

function typeWriter3(conversation, hostId, userId, userId2, speed, index = 0) {
  if (index >= conversation.length) {
    typeStep3 = 0;
    scriptIsEnd = true;
    return; // 모든 대화가 완료되면 함수 종료
  }

  let hostText = conversation[index].Host;
  let userText = conversation[index].User;
  let userText2 = conversation[index].User2;
  let hostIndex = 0;

  function host() {
    if (host.length > 0 || userText2.length > 0)
      if (hostIndex < hostText.length) {
        document.getElementById(hostId).innerHTML += hostText.charAt(hostIndex);
        hostIndex++;
        setTimeout(host, speed);
      } else {
        // Host 텍스트가 모두 표시된 후 User 함수 호출
        if (userText.length > 0 || userText2.length > 0) {
          user();
        } else {
          // User 텍스트가 없는 경우 약간의 지연 후에 다음 대화로 넘어감
          setTimeout(handleNext, 500);
        }
      }
  }

  function handleNext() {
    next(index + 1);
  }

  function user() {
    document.getElementById(userId).innerHTML = userText;
    document.getElementById(userId2).innerHTML = userText2;

    // 기존 이벤트 리스너 제거 및 새 이벤트 리스너 추가
    if (userText.length > 0 || userText2.length > 0) {
      document.getElementById(userId).removeEventListener("click", handleNext);
      document.getElementById(userId2).removeEventListener("click", handleNext);
      document.getElementById(userId).addEventListener("click", handleNext);
      document.getElementById(userId2).addEventListener("click", handleNext);
    }
  }

  function next(nextIndex) {
    // 다음 대화로 넘어가기 전에 필요한 초기화 작업
    document.getElementById(userId).removeEventListener("click", handleNext);
    document.getElementById(userId2).removeEventListener("click", handleNext);
    document.getElementById(hostId).innerHTML = "";
    document.getElementById(userId).innerHTML = "";
    document.getElementById(userId2).innerHTML = "";
    typeStep3 += 1;
    typeStepAll += 1;
    typeWriter3(conversation, hostId, userId, userId2, speed, nextIndex);
  }
  host();
}

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");
const gltfLoader = new GLTFLoader(loadingManager);
gltfLoader.setDRACOLoader(dracoLoader);

/**
 * Base
 */
// Debug
const debugObject = {};

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Mouse
 */
const mouse = new THREE.Vector2();

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;
});

/**
 * Update all materials
 */
const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (
      child instanceof THREE.Mesh &&
      child.material instanceof THREE.MeshStandardMaterial
    ) {
      // child.material.envMap = environmentMap
      child.material.side = THREE.DoubleSide;
      child.material.envMapIntensity = debugObject.envMapIntensity;
      child.material.needsUpdate = true;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
};

const updateHouseMaterials = (model) => {
  model.traverse((child) => {
    child.material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
    });
    child.material.side = THREE.DoubleSide;
  });
};

const catTexture = new THREE.TextureLoader().load("/meme/cat-texture.png");
catTexture.flipY = false;

const updateCatMaterials = (model) => {
  model.traverse((child) => {
    child.material = new THREE.MeshLambertMaterial({
      map: catTexture,
      transparent: true,
      alphaTest: 0.5,
    });
  });
};

/**
 * Grafti Planes
 *  */
function createGraftiPlane(width, height, imgSrc) {
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(imgSrc),
      transparent: true,
      alphaTest: 0.5,
    })
  );
  plane.rotateY(Math.PI / 2);
  return plane;
}

//"meme project"
const grafti01 = createGraftiPlane(4, 2.5, "/meme/Frame 8.png");
grafti01.position.x = -0.25;
scene.add(grafti01);

//"everythin is meme"
const grafti02 = createGraftiPlane(3.5, 2, "/meme/Frame 9.png");
grafti02.position.x = -0.25;
grafti02.position.z = -5;
grafti02.position.y = -1.0;
grafti02.rotateZ(-Math.PI / 6);
scene.add(grafti02);

const grafti03 = createGraftiPlane(3.5, 2, "/meme/bubble.png");
grafti03.position.x = -1.5;
grafti03.position.z = 6;
grafti03.position.y = 0.2;
grafti03.scale.set(0.2, 0.2);
grafti03.rotateY(-Math.PI - Math.PI / 3);
scene.add(grafti03);

const grafti04 = createGraftiPlane(1.5, 1.5, "/meme/heart.png");
grafti04.position.x = -1.2;
grafti04.position.z = 5.5;
grafti04.position.y = 0;
grafti04.rotateY(-Math.PI);
grafti04.scale.set(0.15, 0.15);
scene.add(grafti04);

const grafti05 = createGraftiPlane(1.5, 1.5, "/meme/light.png");
grafti05.position.x = -1.2;
grafti05.position.z = 6.0;
grafti05.position.y = 0;
grafti05.scale.set(0.1, 0.1);
grafti05.rotateY(-Math.PI);
scene.add(grafti05);

/**
 * GLTF Models
 */
function loadModel(modelUrl, updateMaterialsCallback) {
  gltfLoader.load(modelUrl, (model) => {
    model.scene.scale.set(1, 1, 1);
    model.scene.position.set(0, -3, 0);
    model.scene.rotation.y = Math.PI * 0.5;
    scene.add(model.scene);
    updateMaterialsCallback && updateMaterialsCallback(model.scene);
  });
}

loadModel("/models/meme/meme_house.glb", updateHouseMaterials);
loadModel("/models/meme/meme_hose.glb", updateHouseMaterials);
loadModel("/models/meme/meme_door.glb");
loadModel("/models/meme/meme_door2.glb");
loadModel("/models/meme/meme_soup1.glb");
loadModel("/models/meme/meme_soup2.glb");
loadModel("/models/meme/meme_strawberry.glb");
loadModel("/models/meme/meme_sink.glb");
loadModel("/models/meme/meme_bone.glb");
loadModel("/models/meme/meme_fire.glb");
loadModel("/models/meme/meme_frame.glb");
//when device is mobile, load low poly models
if (isMobile) {
  loadModel("/models/meme/meme_david_top_lo.glb");
} else {
  loadModel("/models/meme/meme_david_top.glb");
}
loadModel("/models/meme/meme_david_bottom.glb");
!isMobile && loadModel("/models/meme/meme_hermes.glb");

loadModel("/models/meme/meme_sofa.glb");
loadModel("/models/meme/meme_secondfloor.glb");

loadModel("models/meme/meme_desk.glb");

loadModel("/models/meme/meme_stair.glb");
let mixer = null;

!isMobile &&
  gltfLoader.load("/models/meme/meme_cat-no_tex.glb", (cat) => {
    mixer = new THREE.AnimationMixer(cat.scene);
    const action = mixer.clipAction(cat.animations[0]);
    action.play();
    cat.scene.scale.set(1, 1, 1);
    cat.scene.position.set(0, -3, 0);
    cat.scene.rotation.y = Math.PI * 0.5;
    cat.receiveShadow = true;
    cat.castShadow = true;
    scene.add(cat.scene);
    updateCatMaterials(cat.scene);
  });

/**
 * Helpers
 */
const size = 50;
const divisions = 50;

const gridHelper = new THREE.GridHelper(size, divisions);
gridHelper.position.set(0, 0, 0);
// scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight("#ffffff", 1);

const directionalLight = new THREE.DirectionalLight("#ffffff", 3);
directionalLight.castShadow = true;
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.normalBias = 0.05;
directionalLight.position.set(0.25, 3, -2.25);

scene.add(ambientLight, directionalLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  1,
  10000
);
camera.position.set(100, 150, -100);
camera.lookAt(0, 0, 0);

camera.add(listener);

// scene.add(camera);

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true, //transparent background
});
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 3;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

function movingCamera() {
  switch (step) {
    case 0:
      moveCamera(100, 150, -100); //초기 카메라 위치
      camera.lookAt(0, 0, 0);
      break;
    case 1:
      moveCamera(20, 5, -20); //로드된 후 카메라 위치
      camera.lookAt(0, 0, 0);
      hideBackBtn();
      break;
    case 2:
      moveCamera(-3, -1, 2); //냉장고 바로 앞
      camera.lookAt(-2.5, -2, -6);
      showBackBtn();
      break;
    case 3:
      moveCamera(-2, 1, -2); //원시 수프 앞
      camera.lookAt(-5, -3, -5);
      showBackBtn();
      break;
    case 4:
      moveCamera(-1.5, -1, -4); //고양이 앞
      camera.lookAt(-2, -2, -1);
      showBackBtn();
      break;
    case 5:
      moveCamera(-2, -2, 0); //1층 입구 앞
      camera.lookAt(-2, -2, 3);
      showBackBtn();
      break;
    case 6:
      moveCamera(-4, -2, 3); //1층 그림 앞
      camera.lookAt(0, -2, 5);
      showBackBtn();
      break;
    case 7:
      moveCamera(-1, -2, 3); //1층 다비드 앞
      camera.lookAt(-1, -2, 5);
      showBackBtn();
      break;
    case 8:
      moveCamera(-3.5, -0.3, 4.5); //2층 헤르메스 앞
      camera.lookAt(-1, 0, 6);
      showBackBtn();
      break;
    case 9:
      moveCamera(-3.5, -0.3, 6); //2층 컴퓨터 앞
      camera.lookAt(-4, 0, 0);
      showBackBtn();
      break;
    case 10:
      moveCamera(-3.5, 1.5, 4.5); // 3층 앞
      camera.lookAt(-1, 1.5, 4.5);
      showBackBtn();
      break;
  }
}

/**
 * Animate
 */
const clock = new THREE.Clock();
let oldElapsedTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - oldElapsedTime;
  oldElapsedTime = elapsedTime;

  if (mixer) {
    mixer.update(deltaTime * 1.5);
  }
  //update controls
  controls.update();

  //Update Camera
  movingCamera();

  // Render
  renderer.render(scene, camera);
  // console.log("position", camera.position);
  // console.log("rotation", camera.rotation);

  scriptIsEnd ? (showFloorBtn(), modal.classList.remove("on")) : hideFloorBtn();

  // console.log("typeStep0", typeStep0);
  // console.log("typeStep1", typeStep1);
  // console.log("typeStep2", typeStep2);
  // console.log("typeStep3", typeStep3);
  // console.log("typeStepAll", typeStepAll);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
