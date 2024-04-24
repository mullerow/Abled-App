<template>
  <button class="löschen-button"><img src="" alt="" /> {{ Löschen }}</button>
</template>

<script>
export default {
  props: ['Löschen']
}
</script>

<style scoped>
.löschen-button {
  padding: 1rem;
  background-color: var(--white);
  color: var(--red);
  border-radius: 1rem;
  width: 14.5rem;
  margin-top: 1rem;
  font-weight: bold;
  margin: 1rem;
  border: 1px solid var(--black);
}
</style>
