<template>
  <input type="text" name="input" class="input" :value="value" />
</template>

<script>
export default {
  props: {
    value: String
  }
}
</script>

<style>
.input {
  padding: 0.5rem;
  width: 80%;
  background-color: var(--white);
  border-radius: 0.5rem;
  margin: 2rem;
  color: black;
  border: 1px solid var(--black);
}
</style>
