<template>
  <button id="NavButton">{{ Navigation }}</button>
</template>

<script>
export default {
  props: ['Navigation']
}
</script>

<style scoped>
#NavButton {
  padding: 1rem;
  background-color: var(--black);
  color: var(--white);
  border-radius: 1rem;
  margin: 2rem;
}
</style>
