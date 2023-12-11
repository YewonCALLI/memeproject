import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
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

/**
 * GLTF Models
 */
function loadModel(modelUrl, updateMaterialsCallback) {
  gltfLoader.load(
    modelUrl,
    (model) => {
      model.scene.scale.set(1, 1, 1);
      model.scene.position.set(0, -3, 0);
      model.scene.rotation.y = Math.PI * 0.5;
      scene.add(model.scene);

      updateMaterialsCallback && updateMaterialsCallback(model.scene);
    },
    (error) => {
      console.log(error);
    }
  );
}

loadModel("/models/meme/meme_house.glb", updateHouseMaterials);
loadModel("/models/meme/meme_hose.glb", updateHouseMaterials);
loadModel("/models/meme/meme_door.glb");
loadModel("/models/meme/meme_door2.glb");
loadModel("/models/meme/meme_soup1.glb");
loadModel("/models/meme/meme_soup2.glb");
loadModel("/models/meme/meme_strawberry.gltf", updateAllMaterials);
loadModel("/models/meme/meme_sink.glb");
loadModel("/models/meme/meme_bone.glb");
loadModel("/models/meme/meme_fire.glb");
loadModel("/models/meme/meme_frame.glb");
loadModel("/models/meme/meme_david.glb");
loadModel("/models/meme/meme_sofa.glb");
loadModel("/models/meme/meme_secondfloor.glb");
loadModel("/models/meme/meme_desk.glb");
loadModel("/models/meme/meme_stair.glb");

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

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  orbitControls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
