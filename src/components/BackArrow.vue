<template>
  <button><img src="@/assets/icons/Arrow48.svg" alt="go back" class="rotate-right" /></button>
</template>

<style scoped>
button {
  background-color: transparent;
  border: 2px solid transparent;
  border-radius: 10px;
  background-color: var(--red);
}

button:hover {
  cursor: pointer;
  background-color: var(--white);
  box-shadow: 0px 0px 15px white;
}

img {
  height: auto;
  background-color: transparent;
}

.rotate-right {
  transform: rotate(-90deg);
}
</style>
