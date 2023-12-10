import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from "gsap";

/**
 * Loaders
 */
const loadingOverlayElement = document.querySelector(".loading-overlay");
const loadingBarElement = document.querySelector(".loading-bar");
const loadingTitleElement = document.querySelector(".loading-title");
const loadingManager = new THREE.LoadingManager(
  // Loaded
  () => {
    // Wait a little
    window.setTimeout(() => {
      gsap.to(loadingOverlayElement, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          loadingOverlayElement.style.display = "none";
        },
      });
      loadingBarElement.classList.add("ended");
      loadingBarElement.style.transform = "";
      loadingTitleElement.classList.add("fade-out");
    }, 500);

    gsap.to(camera.position, {
      duration: 1,
      delay: 1,
      ease: "power2.out",
      x: 70,
      y: 10,
      z: -70,
    });
  },

  // Progress
  (itemUrl, itemsLoaded, itemsTotal) => {
    // Calculate the progress and update the loadingBarElement
    const progressRatio = itemsLoaded / itemsTotal;
    loadingBarElement.style.transform = `scaleX(${progressRatio})`;
  }
);
const gltfLoader = new GLTFLoader(loadingManager);

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

const backBtn = document.querySelector(".back-btn");
backBtn.addEventListener("click", () => {
  gsap.to(camera.position, {
    duration: 1,
    ease: "power2.out",
    x: 70,
    y: 10,
    z: -70,
  });
  gsap.to(backBtn, {
    duration: 1,
    ease: "power2.out",
    opacity: 0,
    display: "none",
  });
});

window.addEventListener("click", () => {
  if (currentIntersect) {
    switch (currentIntersect.object) {
      case box1:
        gsap.to(camera.position, {
          duration: 1,
          ease: "power2.out",
          x: 0.03516649356963226,
          y: 0.027630716096911576,
          z: 0.00020807680718219095,
        });
        gsap.to(backBtn, {
          duration: 1,
          ease: "power2.out",
          opacity: 1,
          display: "block",
        });
        break;
    }
  }
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

const updateHouseMaterials = () => {
  scene.traverse((child) => {
    child.material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
    });
    child.material.side = THREE.DoubleSide;
  });
};

/**
 * Models
 */
gltfLoader.load("/models/meme/meme_house.gltf", (house) => {
  house.scene.scale.set(1, 1, 1);
  house.scene.position.set(0, -3, 0);
  house.scene.rotation.y = Math.PI * 0.5;
  scene.add(house.scene);
  updateHouseMaterials();
});
gltfLoader.load("/models/meme/meme_hose.gltf", (hose) => {
  hose.scene.scale.set(1, 1, 1);
  hose.scene.position.set(0, -3, 0);
  hose.scene.rotation.y = Math.PI * 0.5;
  scene.add(hose.scene);
  updateHouseMaterials();
});
gltfLoader.load("/models/meme/meme_door.gltf", (door) => {
  door.scene.scale.set(1, 1, 1);
  door.scene.position.set(0, -3, 0);
  door.scene.rotation.y = Math.PI * 0.5;
  scene.add(door.scene);
});
gltfLoader.load("/models/meme/meme_door2.gltf", (door2) => {
  door2.scene.scale.set(1, 1, 1);
  door2.scene.position.set(0, -3, 0);
  door2.scene.rotation.y = Math.PI * 0.5;
  scene.add(door2.scene);
});
gltfLoader.load("/models/meme/meme_stair.glb", (stair) => {
  stair.scene.scale.set(1, 1, 1);
  stair.scene.position.set(0, -3, 0);
  stair.scene.rotation.y = Math.PI * 0.5;
  scene.add(stair.scene);
});
gltfLoader.load("/models/meme/meme_soup1.glb", (soup1) => {
  soup1.scene.scale.set(1, 1, 1);
  soup1.scene.position.set(0, -3, 0);
  soup1.scene.rotation.y = Math.PI * 0.5;
  scene.add(soup1.scene);
});




const box1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({
    color: "#ff0000",
  })
);
box1.position.set(-3, -2.5, 0);
box1.castShadow = true;
box1.receiveShadow = true;
scene.add(box1);

/**
 * Helpers
 */
const size = 50;
const divisions = 50;

const gridHelper = new THREE.GridHelper(size, divisions);
gridHelper.position.set(0, 0, 0);
// scene.add(gridHelper);

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
  15,
  sizes.width / sizes.height,
  1,
  10000
);
camera.position.set(200, 300, -200);
scene.add(camera);

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster();

// Orbit Controls
const orbitControls = new OrbitControls(camera, canvas);
// orbitControls.autoRotate = true;
// orbitControls.autoRotateSpeed = 1;
orbitControls.enableDamping = true;
orbitControls.maxPolarAngle = Math.PI * 0.49;
orbitControls.minDistance = 0.01;
orbitControls.maxDistance = 150;

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

/**
 * Animate
 */
const clock = new THREE.Clock();

let currentIntersect = null;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  raycaster.setFromCamera(mouse, camera);

  const objectsToTest = [box1];
  const intersects = raycaster.intersectObjects(objectsToTest);

  // 교차하는 Object가 있는데, currentIntersect에 저장된 것이 없으면, mouse가 들어온 것! currentIntersect를 저장해준다.
  if (intersects.length) {
    if (!currentIntersect) {
      console.log("mouse enter");
    }

    currentIntersect = intersects[0];
  }
  // 교차하는 것이 없는데 currentIntersect에 저장된 것이 있으면, mouse가 떠난 것! currentIntersect를 다시 null로 바꾸어준다.
  else {
    if (currentIntersect) {
      console.log("mouse leave");
    }

    currentIntersect = null;
  }

  //마우스가 롤오버 되었을 때
  for (const intersect of intersects) {
    intersect.object.material.emissive.set("#919191");
  }
  //마우스가 롤오버 안 되었을 때
  for (const object of objectsToTest) {
    if (!intersects.find((intersect) => intersect.object === object)) {
      object.material.emissive.set("#000000");
    }
  }

  // Update controls
  orbitControls.update();

  //fixed text by html element show current camera position
  console.log(
    "camera position: ",
    camera.position.x,
    camera.position.y,
    camera.position.z
  );

  // Render
  renderer.render(scene, camera);

  // Cast a ray from the mouse and handle events
  raycaster.setFromCamera(mouse, camera);

  // Test intersect with a model

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
