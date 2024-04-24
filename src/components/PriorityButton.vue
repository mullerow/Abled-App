<template>
  <button class="priority-button"><img src="" alt="" /> {{ priority }}</button>
</template>

<script>
export default {
  props: ['priority']
}
</script>

<style scoped>
.priority-button {
  padding: 1rem;
  background-color: var(--white);
  color: var(--black);
  border-radius: 1rem;
  width: 14.5rem;
  display: grid;
  margin-top: 1rem;
  font-weight: bold;
  margin: 1rem;
  border: 1px solid var(--black);
  align-self: center;
}
</style>
