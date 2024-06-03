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
  height: 200px;
  background-image: linear-gradient(
      180deg,
      transparent 138.8px,
      /* 69.4% von 200px */ var(--red) 140px,
      /* 70% von 200px */ var(--white) 144px,
      /* 72% von 200px */ transparent 145px /* 72.5% von 200px */
    ),
    linear-gradient(
      180deg,
      transparent 146px,
      /* 73% von 200px */ var(--red) 148px,
      /* 74% von 200px */ var(--red) 153px,
      /* 76.5% von 200px */ transparent 155px /* 77.5% von 200px */
    ),
    linear-gradient(
      180deg,
      transparent 156px,
      /* 78% von 200px */ var(--white) 157px,
      /* 78.5% von 200px */ var(--red) 161px,
      /* 80.5% von 200px */ transparent 162px /* 81% von 200px */
    ),
    linear-gradient(
      180deg,
      var(--black) 167px,
      /* 83.5% von 200px */ var(--black) 199.6px,
      /* 99.8% von 200px */ transparent 200px /* 100% von 200px */
    );
  border-radius: 20px 20px 0 0;
  border-radius: 20px 20px 0 0;
}
</style>
