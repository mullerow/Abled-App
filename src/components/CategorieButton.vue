<template>
  <button class="categorie-button"><img src="" alt="" /> {{ Kategorie }}</button>
</template>

<script>
export default {
  props: ['Kategorie']
}
</script>

<style scoped>
.categorie-button {
  padding: 1rem;
  background-color: var(--white);
  color: var(--black);
  border-radius: 1rem;
  width: 70%;
  margin-top: 1rem;
  font-weight: bold;
}
</style>
