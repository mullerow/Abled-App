<template>
  <div class="imgcover">
    <img
      src="../assets/images/final logo with background small (2).jpeg"
      alt="Logo: Abled App"
      id="landing-page-logo"
    />
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
.imgcover {
  text-align: center;
}
h3 {
  color: var(--white);
  font-size: large;
  text-align: center;
  font-size: 22px;
  margin-bottom: 13px;
}
#landing-page-logo {
  border-radius: 70% 0px 0px 0px;
}
</style>
