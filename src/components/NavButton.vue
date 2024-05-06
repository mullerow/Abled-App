<template>
  <button class="nav-button">{{ Navigation }}</button>
</template>

<script>
export default {
  props: ['Navigation']
}
</script>

<style scoped>
.nav-button {
  padding: 1rem;
  background-color: var(--black);
  color: var(--white);
  border-radius: 1rem;
  margin: 1rem;
  border: 1px solid var(--white);
  width: 250px;
}

.nav-button:hover {
  background-image: linear-gradient(
    90deg,
    var(--white) 0%,
    var(--black) 15%,
    var(--black) 85%,
    var(--white) 100%
  );
}
</style>
