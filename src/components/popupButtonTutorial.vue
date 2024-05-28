<template>
  <button class="component-popup-button">{{ buttonLabel }}</button>
</template>

<script>
export default {
  props: ['buttonLabel']
}
</script>

<style scoped>
.component-popup-button {
  background-color: var(--white);
  color: var(--black);
  font-weight: bold;
  border: 2px solid var(--red);
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px 20px;
}

.component-popup-button:hover {
  background-color: var(--black);
  color: var(--white);
  cursor: pointer;
}
</style>
