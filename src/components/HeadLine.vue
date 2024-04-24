<template>
  <h1 class="Headline">{{ Headline }}</h1>
</template>

<script>
export default {
  props: ['Headline']
}
</script>

<style scoped>
.Headline {
  padding: 1rem 2rem 1rem 2rem;
  border-radius: 1rem;
  color: var(--red);
  background-color: #3d405b;
  width: 100%;
  text-align: center;
  align-self: center;
}
</style>
