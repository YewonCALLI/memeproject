import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { gsap } from "gsap";
import {
  conversation,
  firstfloor,
  secondfloor,
  thirdfloor,
  fourthfloor,
  fifthfloor,
  sixthfloor,
  seventhfloor,
} from "./conversation.json";

import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/addons/renderers/CSS3DRenderer.js";

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
let drone;

//확인
backBtn.addEventListener("click", () => {
  step = 7;
  !backMove ? (backMove = true) : (backMove = false);
});
const floorBtn = document.querySelector(".floorBox");
const firstBtn = document.querySelector("#firstBtn");
const secondBtn = document.querySelector("#secondBtn");
const thirdBtn = document.querySelector("#thirdBtn");
const fourthBtn = document.querySelector("#fourthBtn");
const fifthBtn = document.querySelector("#fifthBtn");
const sixthBtn = document.querySelector("#sixthBtn");
const seventhBtn = document.querySelector("#seventhBtn");
const eigthBtn = document.querySelector("#eigthBtn");

const memeModal = document.querySelector("#myModal2");


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
  "meme/sound/2F-6.wav",
  "meme/sound/2F-7.wav",
  "meme/sound/2F-8.wav",
];

const sound3F = [
  "meme/sound/3F-1.wav",
  "meme/sound/3F-2.wav",
  "meme/sound/3F-3.wav",
  "meme/sound/3F-4.wav",
  "meme/sound/3F-5.wav",
];

const sound4F = [
  "meme/sound/4F-1.wav",
  "meme/sound/4F-2.wav",
  "meme/sound/4F-3.wav",
  "meme/sound/4F-4.wav",
  "meme/sound/4F-5.wav",
];

const sound5F = [
  "meme/sound/5F-1.wav",
  "meme/sound/5F-2.wav",
  "meme/sound/5F-3.wav",
  "meme/sound/5F-4.wav",
  "meme/sound/5F-5.wav",
];

const sound6F = [
  "meme/sound/6F-1.wav",
  "meme/sound/6F-2.wav",
  "meme/sound/6F-3.wav",
  "meme/sound/6F-4.wav",
  "meme/sound/6F-5.wav",
];

const sound7F = [
  "meme/sound/7F-1.wav",
  "meme/sound/7F-2.wav",
  "meme/sound/7F-3.wav",
  "meme/sound/7F-4.wav",
  "meme/sound/7F-5.wav",
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
 * Raycaster
 */
const raycaster = new THREE.Raycaster();
let currentIntersect = null;
const rayOrigin = new THREE.Vector3(-3, 0, 0);
const rayDirection = new THREE.Vector3(10, 0, 0);
rayDirection.normalize();

// raycaster.set(rayOrigin, rayDirection)

/**
 * Loaders
 */
const startContainer = document.querySelector(".start-container");
const startBtn = document.querySelector(".start-btn");
const info_apple = document.querySelector(".info-apple");
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
        gsap.to(info_apple, {
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
        7,
        typeWriter2(secondfloor, "host", "user", "user2", 130)
      );
    });

    thirdBtn.addEventListener("click", () => {
      turnOnTypeWriter(
        8,
        typeWriter3(thirdfloor, "host", "user", "user2", 130)
      );
    });

    fourthBtn.addEventListener("click", () => {
      turnOnTypeWriter(
        9,
        typeWriter4(fourthfloor, "host", "user", "user2", 140)
      );
    });

    fifthBtn.addEventListener("click", () => {
      turnOnTypeWriter(
        10,
        typeWriter5(fifthfloor, "host", "user", "user2", 165)
      );
    });

    sixthBtn.addEventListener("click", () => {
      turnOnTypeWriter(
        11,
        typeWriter6(sixthfloor, "host", "user", "user2", 130)
      );
    });

    seventhBtn.addEventListener("click", () => {
      turnOnTypeWriter(
        12,
        typeWriter7(seventhfloor, "host", "user", "user2", 158)
      );
      memeModal.style.display = "block"; // 모달 창 표시

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
    step = 6;
    prevStep = 6;
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
  isStarted && PlayAudio(sound2F[typeStep2]);
  if (typeStep2 == 4 - 1) {
    step = 7;
    prevStep = 7;
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
  isStarted && PlayAudio(sound3F[typeStep3]);
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
          conversation[index].sec - hostText.length * speed + 120 //100은 약간의 지연을 위한 값
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
    typeStep3 += 1;
    typeStepAll += 1;
    typeWriter3(conversation, hostId, userId, userId2, speed, nextIndex);
  }
  host();
}

let typeStep4 = 0;

function typeWriter4(conversation, hostId, userId, userId2, speed, index = 0) {
  isStarted && PlayAudio(sound4F[typeStep4]);
  if (index >= conversation.length) {
    typeStep4 = 0;
    scriptIsEnd = true;
    return; // 모든 대화가 완료되면 함수 종료
  }

  let hostText = conversation[index].Host;
  let userText = conversation[index].User;
  let userText2 = conversation[index].User2;
  let hostIndex = 0;

  function host() {
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
          conversation[index].sec - hostText.length * speed + 90 //100은 약간의 지연을 위한 값
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
    typeStep4 += 1;
    typeStepAll += 1;
    typeWriter4(conversation, hostId, userId, userId2, speed, nextIndex);
  }
  host();
}

let typeStep5 = 0;

function typeWriter5(conversation, hostId, userId, userId2, speed, index = 0) {
  isStarted && PlayAudio(sound5F[typeStep5]);
  if (index >= conversation.length) {
    typeStep5 = 0;
    scriptIsEnd = true;
    return; // 모든 대화가 완료되면 함수 종료
  }

  let hostText = conversation[index].Host;
  let userText = conversation[index].User;
  let userText2 = conversation[index].User2;
  let hostIndex = 0;

  function host() {
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
          conversation[index].sec - hostText.length * speed + 130 //100은 약간의 지연을 위한 값
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
    typeStep5 += 1;
    typeStepAll += 1;
    typeWriter5(conversation, hostId, userId, userId2, speed, nextIndex);
  }
  host();
}

let typeStep6 = 0;

function typeWriter6(conversation, hostId, userId, userId2, speed, index = 0) {
  isStarted && PlayAudio(sound6F[typeStep6]);
  if (index >= conversation.length) {
    typeStep6 = 0;
    scriptIsEnd = true;
    return; // 모든 대화가 완료되면 함수 종료
  }

  let hostText = conversation[index].Host;
  let userText = conversation[index].User;
  let userText2 = conversation[index].User2;
  let hostIndex = 0;

  function host() {
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
          conversation[index].sec - hostText.length * speed + 130 //100은 약간의 지연을 위한 값
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
    typeStep6 += 1;
    typeStepAll += 1;
    typeWriter6(conversation, hostId, userId, userId2, speed, nextIndex);
  }
  host();
}

let typeStep7 = 0;
function typeWriter7(conversation, hostId, userId, userId2, speed, index = 0) {
  isStarted && PlayAudio(sound7F[typeStep7]);
  if (index >= conversation.length) {
    typeStep7 = 0;
    scriptIsEnd = true;
    return; // 모든 대화가 완료되면 함수 종료
  }

  let hostText = conversation[index].Host;
  let userText = conversation[index].User;
  let userText2 = conversation[index].User2;
  let hostIndex = 0;

  function host() {
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
          conversation[index].sec - hostText.length * speed + 140 //100은 약간의 지연을 위한 값
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
    typeStep7 += 1;
    typeStepAll += 1;
    typeWriter7(conversation, hostId, userId, userId2, speed, nextIndex);
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

const video = document.getElementById("video");
// video.onloadeddata = function () {
//   video.play();
// };
const videoTexture = new THREE.VideoTexture(video);
videoTexture.needsUpdate = true;
videoTexture.flipY = false;
videoTexture.repeat.x = -1; // 수평으로 뒤집기
videoTexture.offset.x = 1; // 오프셋 조정으로 이미지 위치 재조정
videoTexture.colorSpace = THREE.SRGBColorSpace;

const videoMaterial = new THREE.MeshBasicMaterial({
  map: videoTexture,
  side: THREE.DoubleSide,
  lightMapIntensity: 0.1,
});
videoMaterial.needsUpdate = true;

const video2 = document.getElementById("video2");
video2.onloadeddata = function () {
  video2.play();
};

const video3 = document.getElementById("video3");
video3.onloadeddata = function () {
  video3.play();
};
const video4 = document.getElementById("video4");
video4.onloadeddata = function () {
  video4.play();
};

const videoTexture2 = new THREE.VideoTexture(video2);
videoTexture2.needsUpdate = true;
videoTexture2.flipY = true;
videoTexture2.repeat.x = -1; // 수평으로 뒤집기
videoTexture2.offset.x = 1; // 오프셋 조정으로 이미지 위치 재조정
videoTexture2.colorSpace = THREE.SRGBColorSpace;

const videoMaterial2 = new THREE.MeshBasicMaterial({
  map: videoTexture2,
  lightMapIntensity: 0.1,
});
videoMaterial2.needsUpdate = true;

const updateTVMaterials = (model) => {
  //update video texture to third child of model
  model.children[2].material = videoMaterial;
};

const updateTVMaterials2 = (model) => {
  //update video texture to third child of model
  model.material = videoMaterial2;
  model.children[0].material = videoMaterial2;
  model.children[1].material = videoMaterial2;
  model.children[2].material = videoMaterial2;
  model.children[3].material = videoMaterial2;
  model.children[4].material = videoMaterial2;
  model.children[5].material = videoMaterial2;
  model.children[6].material = videoMaterial2;
};

const videoTexture3 = new THREE.VideoTexture(video3);
videoTexture3.needsUpdate = true;
videoTexture3.flipY = true;
videoTexture3.repeat.x = -1; // 수평으로 뒤집기
videoTexture3.offset.x = 1; // 오프셋 조정으로 이미지 위치 재조정
videoTexture3.colorSpace = THREE.SRGBColorSpace;

const videoMaterial3 = new THREE.MeshBasicMaterial({
  map: videoTexture3,
});
videoMaterial3.needsUpdate = true;

const updateTVMaterials3 = (model) => {
  //update video texture to third child of model
  model.children[0].material = videoMaterial3;
  model.children[1].material = videoMaterial3;
  model.children[2].material = videoMaterial3;
  model.children[3].material = videoMaterial3;
  model.children[4].material = videoMaterial3;
};

const videoTexture4 = new THREE.VideoTexture(video4);
videoTexture4.needsUpdate = true;
videoTexture4.flipY = true;
videoTexture4.repeat.x = -1; // 수평으로 뒤집기
videoTexture4.offset.x = 1; // 오프셋 조정으로 이미지 위치 재조정
videoTexture4.colorSpace = THREE.SRGBColorSpace;

const videoMaterial4 = new THREE.MeshBasicMaterial({
  map: videoTexture4,
});
videoMaterial4.needsUpdate = true;

const updateTVMaterials4 = (model) => {
  //update video texture to third child of model
  model.children[0].material = videoMaterial4;
  model.children[1].material = videoMaterial4;
  model.children[2].material = videoMaterial4;
  model.children[3].material = videoMaterial4;
  model.children[4].material = videoMaterial4;
};

const internet = document.getElementById("internet");
const ineternetTexture = new THREE.CanvasTexture(internet);
ineternetTexture.canvas = internet;

const internetMaterial = new THREE.MeshBasicMaterial({
  map: ineternetTexture,
  side: THREE.DoubleSide,
  lightMapIntensity: 0.1,
});
internetMaterial.needsUpdate = true;

const updateInternetMaterials = (model) => {
  model.children[3].material = internetMaterial;
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
      DoubleSide: true,
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

//"against the meme"
const grafti03 = createGraftiPlane(1.0, 0.5, "/meme/Frame 6.png");
grafti03.position.x = -2.5;
grafti03.position.z = 6;
grafti03.position.y = -2.5;
grafti03.rotateY(Math.PI / 2);
scene.add(grafti03);

let mixer = null;
let mixer2 = null;

/**
 * GLTF Models
 */
function loadModel(modelUrl, updateMaterialsCallback) {
  gltfLoader.load(modelUrl, (model) => {
    model.scene.scale.set(1, 1, 1);
    model.scene.position.set(0, -3, 0);
    model.scene.rotation.y = Math.PI * 0.5;
    model.scene.castShadow = true;
    model.scene.receiveShadow = true;
    model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.name = "meme1";
      }
    });
    scene.add(model.scene);
    updateMaterialsCallback && updateMaterialsCallback(model.scene);
  });
}
let touchableModel = null;
function touchableLoadModel(modelUrl, updateMaterialsCallback) {
  gltfLoader.load(modelUrl, (model) => {
    touchableModel = model.scene;
    model.scene.scale.set(1, 1, 1);
    model.scene.position.set(0, -3, 0);
    model.scene.rotation.y = Math.PI * 0.5;
    model.scene.castShadow = true;
    model.scene.receiveShadow = true;
    model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.name = "meme1";
      }
    });
    scene.add(model.scene);
    updateMaterialsCallback && updateMaterialsCallback(model.scene);
  });
}

function loadModel2(modelUrl, updateMaterialsCallback) {
  gltfLoader.load(modelUrl, (model) => {
    mixer2 = new THREE.AnimationMixer(model.scene);
    const action = mixer2.clipAction(model.animations[7]);
    action.play();

    model.scene.scale.set(1, 1, 1);
    model.scene.position.set(0, -3, 0);
    model.scene.rotation.y = Math.PI * 0.5;
    model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    scene.add(model.scene);
    updateMaterialsCallback && updateMaterialsCallback(model.scene);
  });
}

var meme6;
var meme1;
var meme4;
var meme5;

function meme1loadModel(modelUrl, updateMaterialsCallback) {
  gltfLoader.load(modelUrl, (model) => {
    model.scene.scale.set(1, 1, 1);
    model.scene.position.set(0, -3, 0);
    model.scene.rotation.y = Math.PI * 0.5;
    model.scene.castShadow = true;
    model.scene.receiveShadow = true;
    model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    meme1 = model.scene.children[3];
    scene.add(model.scene);
    updateMaterialsCallback && updateMaterialsCallback(model.scene);
  });
}

var meme6_1, meme6_2, meme6_3;

function meme6loadModel(modelUrl, updateMaterialsCallback) {
  gltfLoader.load(modelUrl, (model) => {
    model.scene.scale.set(1, 1, 1);
    model.scene.position.set(0, -3, 0);
    model.scene.rotation.y = Math.PI * 0.5;
    model.scene.castShadow = true;
    model.scene.receiveShadow = true;
    model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    meme6_1 = model.scene.children[2];
    meme6_2 = model.scene.children[3];
    meme6_3 = model.scene.children[4];
    meme6 = model.scene.children[0];
    scene.add(model.scene);
    updateMaterialsCallback && updateMaterialsCallback(model.scene);
  });
}

var meme8_1, meme8_2, meme8_3, meme8_4, meme8_5;
function meme8loadModel(modelUrl, updateMaterialsCallback) {
  gltfLoader.load(modelUrl, (model) => {
    model.scene.scale.set(1, 1, 1);
    model.scene.position.set(0, -3, 0);
    model.scene.rotation.y = Math.PI * 0.5;
    model.scene.castShadow = true;
    model.scene.receiveShadow = true;
    model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    meme8_1 = model.scene.children[0];
    meme8_2 = model.scene.children[1];
    meme8_3 = model.scene.children[2];
    meme8_4 = model.scene.children[3];
    meme8_5 = model.scene.children[4];

    scene.add(model.scene);
    updateMaterialsCallback && updateMaterialsCallback(model.scene);
  });
}

function meme4loadModel(modelUrl, updateMaterialsCallback) {
  gltfLoader.load(modelUrl, (model) => {
    model.scene.scale.set(1, 1, 1);
    model.scene.position.set(0, -3, 0);
    model.scene.rotation.y = Math.PI * 0.5;
    model.scene.castShadow = true;
    model.scene.receiveShadow = true;
    model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    meme4 = model.scene.children[0];
    scene.add(model.scene);
    updateMaterialsCallback && updateMaterialsCallback(model.scene);
  });
}
function meme5loadModel(modelUrl, updateMaterialsCallback) {
  gltfLoader.load(modelUrl, (model) => {
    model.scene.scale.set(1, 1, 1);
    model.scene.position.set(0, -3, 0);
    model.scene.rotation.y = Math.PI * 0.5;
    model.scene.castShadow = true;
    model.scene.receiveShadow = true;
    model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    meme5 = model.scene.children[3];
    scene.add(model.scene);
    updateMaterialsCallback && updateMaterialsCallback(model.scene);
  });
}

var meme7;

function meme7loadModel(modelUrl, updateMaterialsCallback) {
  gltfLoader.load(modelUrl, (model) => {
    model.scene.scale.set(1, 1, 1);
    model.scene.position.set(0, -3, 0);
    model.scene.rotation.y = Math.PI * 0.5;
    model.scene.castShadow = true;
    model.scene.receiveShadow = true;
    model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    meme7 = model.scene.children[3];
    scene.add(model.scene);
    updateMaterialsCallback && updateMaterialsCallback(model.scene);
  });
}

function loadModel3(modelUrl, updateMaterialsCallback) {
  gltfLoader.load(modelUrl, (model) => {
    model.scene.scale.set(1.2, 1.2, 1.0);
    model.scene.position.set(1.5, -2.9, -2.0);
    model.scene.rotation.y = Math.PI * 0.5;
    scene.add(model.scene);
    updateMaterialsCallback && updateMaterialsCallback(model.scene);
  });
}

/**
 * PLY Models
 */
const loader = new PLYLoader();
const pajamaTexture = new THREE.TextureLoader().load(
  "/meme/material_0_baseColor.png"
);

function loadPLYModel(modelUrl, updateMaterialsCallback) {
  loader.load(modelUrl, (geometry) => {
    geometry.computeVertexNormals();
    const material = new THREE.MeshStandardMaterial({ map: pajamaTexture });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(-Math.PI / 2);
    mesh.scale.set(1.0, 1.0, 1.0);
    mesh.position.set(0, -3.0, 0.77);
    mesh.rotateZ(Math.PI / 2);
    scene.add(mesh);

    // model.scene.scale.set(1, 1, 1);
    // model.scene.position.set(0, -3, 0);
    // model.scene.rotation.y = Math.PI * 0.5;
    // scene.add(model.scene);
    // updateMaterialsCallback && updateMaterialsCallback(model.scene);
  });
}

loadModel("/models/meme/meme_house.glb", updateHouseMaterials);
loadModel("/models/meme/meme_hose.glb", updateHouseMaterials);
loadModel("/models/meme/meme_house_floor.glb", updateTVMaterials2);
loadModel("/models/meme/meme_house_wall1.glb", updateTVMaterials2);

loadModel("/models/meme/meme_door.glb");
loadModel("/models/meme/meme_door2.glb");
loadModel("/models/meme/meme_soup1.glb");
loadModel("/models/meme/meme_soup2.glb");
loadModel("/models/meme/meme_sink.glb");
loadModel("/models/meme/meme_bone.glb");
loadModel("/models/meme/meme_fire.glb");

loadModel("/models/meme/tv.glb", updateTVMaterials);
loadModel("/models/meme/meme_poster1.glb");
loadModel("/models/meme/meme_poster_achive.glb");
loadPLYModel("/models/meme/meme1.ply");
meme1loadModel("/models/meme/meme1.glb");
loadModel("/models/meme/meme2.glb");
loadModel2("/models/meme/meme3.glb");
meme4loadModel("/models/meme/meme4.glb");
meme5loadModel("/models/meme/meme5.glb");
meme6loadModel("/models/meme/meme6.glb");
touchableLoadModel("/models/meme/meme_plane.glb", updateTVMaterials4);
meme8loadModel("/models/meme/meme8.glb");
// loadModel("/models/meme/meme_stone.glb");
// loadModel2("/models/meme/meme_priest.glb");

//when device is mobile, load low poly models
if (!isMobile) {
  loadModel("/models/meme/meme_house_wall2.glb", updateTVMaterials3);
}
// loadModel("/models/meme/meme_david_bottom.glb");
// !isMobile && loadModel("/models/meme/meme_hermes.glb");

loadModel("/models/meme/meme_stair.glb");

const fbxLoader = new FBXLoader();
gltfLoader.load("/models/meme/model.gltf", (object2) => {
  // mixer = new THREE.AnimationMixer(object2.scene);
  // const action = mixer.clipAction(object2.animations[0]);
  // action.play();
  object2.scene.scale.set(100, 100, 100);
  scene.add(object2.scene);
  updateCatMaterials(object2.scene);
});

const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  DoubleSide: true,
});

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
const ambientLight = new THREE.AmbientLight("#ffffff", 1.5);

const directionalLight = new THREE.DirectionalLight("#ffffff", 4);
directionalLight.castShadow = true;
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.normalBias = 0.05;
directionalLight.position.set(3, 3, -4.25);
directionalLight.target.position.set(3, 2, 0);

scene.add(ambientLight, directionalLight);

const pointLight2 = new THREE.PointLight("#C3FFE3", 6);
pointLight2.castShadow = true;
pointLight2.shadow.camera.far = 15;
pointLight2.shadow.mapSize.set(1024, 1024);
pointLight2.shadow.normalBias = 0.05;
pointLight2.position.set(-3, -3, 4.5);

scene.add(pointLight2);

const pointLight3 = new THREE.PointLight("#FFD6A5", 6);
pointLight3.castShadow = true;
pointLight3.shadow.camera.far = 15;
pointLight3.shadow.mapSize.set(1024, 1024);
pointLight3.shadow.normalBias = 0.05;
pointLight3.position.set(-4, 0, 5);
scene.add(pointLight3);

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
 * Video Texture
 */

// const video = document.getElementById( 'video' );
// const texture = new THREE.VideoTexture( video );
// texture = new THREE.Texture(video);
// texture.minFilter = THREE.LinearFilter;
// texture.magFilter = THREE.LinearFilter;
// texture.generateMipmaps = false;

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
      moveCamera(-3, -1, 0.9); //냉장고 바로 앞
      camera.lookAt(-2.0, -1, -4);
      setTimeout(() => {
        video.play();
      }, 20000);
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
      moveCamera(-3, -2.5, 3.7); //1번 밈
      camera.lookAt(0, -2.5, 3.7);
      showBackBtn();
      break;
    case 7:
      moveCamera(-3, -2.5, 4.5); //2번 밈
      camera.lookAt(0, -2.5, 4.5);
      showBackBtn();
      break;
    case 8:
      moveCamera(-3, -2.5, 5.3); //3번 밈
      camera.lookAt(0, -2.5, 5.3);
      showBackBtn();
      break;
    case 9:
      moveCamera(-3.7, -2.4, 5.3); //4번 밈
      camera.lookAt(3, -3.5, 9.3);
      showBackBtn();
      break;
    case 10:
      moveCamera(-4.6, -2.4, 5.3); // 5번 밈
      camera.lookAt(3, -3.5, 10.0);
      showBackBtn();
      break;
    case 11:
      moveCamera(-4.5, -0.3, 6.8); //2층
      camera.lookAt(-3.0, -0.3, 3);
      showBackBtn();
      break;
    case 12:
      moveCamera(-2.5, 2.35, 4.7); //3층
      camera.lookAt(0, 2.35, 4.7);
      showBackBtn();
      break;
  }
}

/**
 * Animate
 */
const clock = new THREE.Clock();
let oldElapsedTime = 0;
let meme1MaterialOriginalColor = null; // meme1 오브젝트의 원래 색상을 저장할 변수

const close = document.querySelector(".close");

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - oldElapsedTime;
  oldElapsedTime = elapsedTime;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);



  close.addEventListener("click", () => {
    memeModal.style.display = "none"; // 모달 창 숨김
  });
  



  if (mixer) {
    mixer.update(deltaTime * 1.5);
  }
  if (mixer2) {
    mixer2.update(deltaTime * 1.5);
  }
  if (meme1) {
    meme1.rotation.z += 0.01;
    meme1.position.y = Math.sin(elapsedTime) * 0.1 + 0.54;
  }
  if (meme6) {
    meme6.rotation.z += 0.01;
    meme6.position.y = Math.sin(elapsedTime) * 0.06 + 2.45;
    meme6_1.rotation.y += 0.01;
    meme6_1.rotation.x += 0.01;
    meme6_2.rotation.y -= 0.01;
    meme6_2.rotation.x -= Math.sin(elapsedTime) * 0.01;
    meme6_3.rotation.y -= 0.01;
    meme6_3.rotation.z -= Math.sin(elapsedTime) * 0.01;
  }
  if (meme4) {
    meme4.position.y = Math.sin(elapsedTime) * 0.1 + 0.7;
    meme4.rotation.y += 0.01;
  }
  if (meme5) {
    meme5.rotation.z -= 0.01;
    meme5.position.y = Math.sin(elapsedTime) * 0.1 + 0.34;
  }
  if (meme8_1) {
    meme8_1.position.x = Math.sin(elapsedTime) * 0.5 - 4;
    meme8_2.position.x = Math.sin(elapsedTime) * 0.5 - 4;
    meme8_3.position.x = Math.sin(elapsedTime * 0.8) * 0.5 - 4;
    meme8_4.position.x = Math.sin(elapsedTime) * 0.5 - 4;
    meme8_5.position.x = Math.sin(elapsedTime * 0.8) * 0.3 - 5;
  }
  //update controls

  controls.update();

  //Update Camera
  movingCamera();

  // Render
  renderer.render(scene, camera);
  // console.log("position", camera.position);
  // console.log("rotation", camera.rotation);
  // showFloorBtn();

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
