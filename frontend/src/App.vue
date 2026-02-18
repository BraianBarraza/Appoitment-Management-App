<script setup>
import {RouterView} from 'vue-router'
import {ref} from "vue";

const spotlightX = ref(0)
const spotlightY = ref(0)
const spotlightVisible = ref(false)

function onMouseMove(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  spotlightX.value = e.clientX - rect.left
  spotlightY.value = e.clientY - rect.top
  spotlightVisible.value = true
}

function onMouseLeave() {
  spotlightVisible.value = false
}
</script>

<template>
  <div class="md:flex h-screen">
    <div class="h-64 md:h-auto bg-cover bg-center md:w-1/3 bg-app">
    </div>
    <div
      class="content-area md:w-2/3 px-10 py-5 min-h-full overflow-y-scroll relative"
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave"
    >
      <div
        class="spotlight"
        :class="{ 'spotlight-visible': spotlightVisible }"
        :style="{
          left: spotlightX + 'px',
          top: spotlightY + 'px',
        }"
      />
      <RouterView/>
    </div>
  </div>
</template>

<style scoped>
.content-area {
  overflow-x: hidden;
}

.spotlight {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(59, 130, 246, 0.12) 0%,
    rgba(59, 130, 246, 0.05) 35%,
    transparent 70%
  );
  transform: translate(-50%, -50%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 0;
}

.spotlight-visible {
  opacity: 1;
}
</style>
