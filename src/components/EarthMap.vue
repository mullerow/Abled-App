<template>
  <button class="earthbutton"><img src="@/assets/icons/Earthmap48.svg" alt="go to map" /></button>
</template>

<style scoped>
.earthbutton {
  background-color: transparent;
  border: none;
  border-radius: 50%;
  padding: 10px;
}

.earthbutton:hover {
  cursor: pointer;
  background-color: var(--white);
  box-shadow: 0px 0px 45px white;
}

img {
  height: auto;
  background-color: transparent;
}
</style>
