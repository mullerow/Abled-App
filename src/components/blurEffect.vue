<template>
  <div class="blur-container"></div>
</template>

<style scoped>
.blur-container {
  width: 100vw;
  height: 100%;
  z-index: 100;
  background-color: transparent;
  backdrop-filter: blur(1.5px);
  position: fixed;
}
</style>
