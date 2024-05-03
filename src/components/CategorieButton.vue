<template>
  <button class="categorie-button"><img src="" alt="" /> {{ Kategorie }}</button>
</template>

<script>
export default {
  props: ['Kategorie']
}
</script>

<style>
.categorie-button {
  padding: 1rem;
  background-color: var(--white);
  color: var(--black);
  border-radius: 1rem;
  width: 70%;
  margin-top: 1rem;
  font-weight: bold;
  margin: 1rem;
  border: 2px solid var(--black);
}
.categorie-button:hover {
  background-image: linear-gradient(
    90deg,
    var(--white) 0%,
    var(--black) 15%,
    var(--black) 85%,
    var(--white) 100%
  );
  color: var(--white);
  border: 2px solid var(--white);
  border-radius: 1rem;
}
</style>
