<template>
  <button class="backarrow">
    <img src="@/assets/icons/Arrow48.svg" alt="go back" class="rotate-right" />
  </button>
</template>

<style scoped>
.backarrow {
  background-color: transparent;
  border: 2px solid transparent;
  border-radius: 10px;
  margin-top: 0px;
}

.backarrow:hover {
  cursor: pointer;
  background: var(--white);
  box-shadow: 0px 0px 15px var(--white);
}

img {
  height: auto;
  background-color: transparent;
}

.rotate-right {
  transform: rotate(-90deg);
}
</style>
