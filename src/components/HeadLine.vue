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
  padding: 1rem;
  border-radius: 1rem;
  color: var(--black);
  background-color: var(--red);
  width: 100%;
  text-align: center;
  align-self: center;
  margin-top: 0px;
  max-height: 79px;
  font-size: 1.5rem;
}
</style>
