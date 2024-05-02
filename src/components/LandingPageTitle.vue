<template>
  <div class="imgcover">
    <img src="../assets/images/ABledApp-Logo-reduced.png" alt="Logo: Abled App" />
    <h3>Willkommen {{ username }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    username: String
  }
}
</script>

<style scoped>
img {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 4rem;
}
h3 {
  color: var(--white);
  font-size: large;
  text-align: center;
  font-size: 22px;
  margin-top: 50px;
}
</style>
