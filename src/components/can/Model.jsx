<template>
  <div class="model_container">
    <div ref="canvasRef" class="wrapper" />
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js"; 동적환경맵?
import gsap from "gsap";

const canvasRef = ref(null);
let camera;
let can;

const canAnimationTl = gsap.timeline();

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

const group = new THREE.Group();
scene.add(group);
const gltfLoader = new GLTFLoader();

gltfLoader.load("/can.glb", (gltf) => {
  can = gltf.scene;

  can.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });

  can.rotation.set(-Math.PI * 0.05, 0, 0.3);

  const box = new THREE.Box3().setFromObject(can);
  const center = new THREE.Vector3();
  box.getCenter(center);
  can.position.sub(center);

  scene.add(can);
  group.add(can);

  canAnimationTl.from(group.scale, {
    x: 2,
    y: 2,
    z: 2,
    duration: 2,
    ease: "power2",
    delay: 0.5,
  });
  canAnimationTl.to(group.rotation, {
    y: `+=${Math.PI * 2}`,
    duration: 10,
    ease: "none",
    repeat: -1,
  });
  canAnimationTl.to(
    group.rotation,
    {
      z: -0.3,
      duration: 5,
      ease: "none",
      repeat: -1,
      yoyo: true,
    },
    "<"
  );
});

const props = defineProps({
  selectedColor: String,
});

watch(
  () => props.selectedColor,
  () => {
    can.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        if (node.name === "model") {
          gsap.to(node.material.color, {
            r: new THREE.Color(props.selectedColor).r,
            g: new THREE.Color(props.selectedColor).g,
            b: new THREE.Color(props.selectedColor).b,
            duration: 0.75,
          });
        }
      }
    });
    gsap.to(can.rotation, {
      y: `+=${Math.PI * 2}`,
      duration: 0.75,
    });
  }
);

// light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

const init = () => {
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvasRef.value.offsetWidth, canvasRef.value.offsetHeight);
  canvasRef.value.appendChild(renderer.domElement);
};

const animate = () => {
  camera.updateMatrixWorld();
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
};

const onResize = () => {
  if (canvasRef.value) {
    camera.aspect = canvasRef.value.offsetWidth / canvasRef.value.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasRef.value.offsetWidth, canvasRef.value.offsetHeight);
  }
};

onMounted(() => {
  camera = new THREE.PerspectiveCamera(
    75,
    canvasRef.value.offsetWidth / canvasRef.value.offsetHeight,
    0.1,
    100
  );

  camera.position.set(0, 0, 5);

  init();
  animate();

  window.addEventListener("resize", onResize);
});
</script>

<style lang="scss" scoped>
.model_container {
  position: fixed;
  width: 100%;
  height: 100vh;
  pointer-events: none;
  z-index: 1;
  .wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>
