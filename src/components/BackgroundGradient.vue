<template>
  <div class="background-gradient"></div>
</template>

<script>
export default {
  name: 'BackgroundGradient'
}
</script>

<style scoped>
.background-gradient {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 250px;
  background-image: linear-gradient(
      180deg,
      transparent 180.5px,
      var(--red) 182px,
      var(--white) 187px,
      transparent 188.25px
    ),
    linear-gradient(
      180deg,
      transparent 189.5px,
      var(--red) 192px,
      var(--red) 198.25px,
      transparent 200.75px
    ),
    linear-gradient(
      180deg,
      transparent 202px,
      var(--white) 203.25px,
      var(--red) 208.25px,
      transparent 209.5px
    ),
    linear-gradient(180deg, var(--black) 215.75px, var(--black) 256.5px, transparent 257px);
  border-radius: 20px 20px 0 0;
}
</style>
