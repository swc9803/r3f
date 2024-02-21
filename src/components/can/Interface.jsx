<template>
  <div class="switch_container">
    <div ref="nameRef" class="name">{{ currentName }}</div>
    <div class="fruit">
      <Grape ref="grapeRef" />
      <Strawberry ref="strawberryRef" />
      <Peach ref="peachRef" />
      <Orange ref="orangeRef" />
      <Lime ref="limeRef" />
    </div>
    <div class="switch_wrapper">
      <button
        v-for="item in flavor"
        :key="item.id"
        @click="selectFlavor(item.color, item.name)"
      >
        {{ item.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import gsap from "gsap";
import Grape from "@/assets/flavor/Grape.vue";
import Strawberry from "@/assets/flavor/Strawberry.vue";
import Peach from "@/assets/flavor/Peach.vue";
import Orange from "@/assets/flavor/Orange.vue";
import Lime from "@/assets/flavor/Lime.vue";

const flavor = [
  { name: "Grape", color: "#4EBC38" },
  { name: "Strawberry", color: "#FC5A8D" },
  { name: "Peach", color: "#FFE5B4" },
  { name: "Orange", color: "#FFA500" },
  { name: "Lime", color: "#BFFF00" },
];

const fruitTL = gsap.timeline({});

const grapeRef = ref(null);
const strawberryRef = ref(null);
const peachRef = ref(null);
const orangeRef = ref(null);
const limeRef = ref(null);

const nameRef = ref(null);

const currentName = ref("Grape");
const preventClick = ref(false);
const emit = defineEmits(["changeColor"]);
const selectFlavor = (color, name) => {
  if (!preventClick.value && currentName.value !== name) {
    preventClick.value = true;
    currentName.value = name;
    emit("changeColor", color);

    fruitTL.from(nameRef.value, {
      scale: 5,
      onStart: () => {
        if (name === "Grape") {
          grapeRef.value.grapeRef.style.zIndex = 1;
          strawberryRef.value.strawberryRef.style.zIndex = 0;
          peachRef.value.peachRef.style.zIndex = 0;
          orangeRef.value.orangeRef.style.zIndex = 0;
          limeRef.value.limeRef.style.zIndex = 0;

          gsap.fromTo(
            grapeRef.value.grapeRef,
            {
              scale: 0.1,
            },
            {
              scale: 3,
              duration: 0.75,
            }
          );
        } else if (name === "Strawberry") {
          grapeRef.value.grapeRef.style.zIndex = 0;
          strawberryRef.value.strawberryRef.style.zIndex = 1;
          peachRef.value.peachRef.style.zIndex = 0;
          orangeRef.value.orangeRef.style.zIndex = 0;
          limeRef.value.limeRef.style.zIndex = 0;

          gsap.fromTo(
            strawberryRef.value.strawberryRef,
            {
              scale: 0.1,
            },
            {
              scale: 3,
              duration: 0.75,
            }
          );
        } else if (name === "Peach") {
          grapeRef.value.grapeRef.style.zIndex = 0;
          strawberryRef.value.strawberryRef.style.zIndex = 0;
          peachRef.value.peachRef.style.zIndex = 1;
          orangeRef.value.orangeRef.style.zIndex = 0;
          limeRef.value.limeRef.style.zIndex = 0;

          gsap.fromTo(
            peachRef.value.peachRef,
            {
              scale: 0.1,
            },
            {
              scale: 3,
              duration: 0.75,
            }
          );
        } else if (name === "Orange") {
          grapeRef.value.grapeRef.style.zIndex = 0;
          strawberryRef.value.strawberryRef.style.zIndex = 0;
          peachRef.value.peachRef.style.zIndex = 0;
          orangeRef.value.orangeRef.style.zIndex = 1;
          limeRef.value.limeRef.style.zIndex = 0;

          gsap.fromTo(
            orangeRef.value.orangeRef,
            {
              scale: 0.1,
            },
            {
              scale: 3,
              duration: 0.75,
            }
          );
        } else if (name === "Lime") {
          grapeRef.value.grapeRef.style.zIndex = 0;
          strawberryRef.value.strawberryRef.style.zIndex = 0;
          peachRef.value.peachRef.style.zIndex = 0;
          orangeRef.value.orangeRef.style.zIndex = 0;
          limeRef.value.limeRef.style.zIndex = 1;

          gsap.fromTo(
            limeRef.value.limeRef,
            {
              scale: 0.1,
            },
            {
              scale: 3,
              duration: 0.75,
            }
          );
        }
      },
    });

    setTimeout(() => {
      preventClick.value = false;
    }, 800);
  }
};
</script>

<style lang="scss" scoped>
.switch_container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  .name {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    transform-origin: center center;
    color: white;
    font-size: 4em;
    font-weight: 600;
    z-index: 1;
    @media (max-width: 720px) {
      font-size: 2.5em;
    }
  }
  .fruit {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    transform-origin: center center;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  .switch_wrapper {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    display: flex;
    justify-content: space-between;
    gap: 20px;
    button {
      padding: 10px;
    }
  }
}
</style>
