<template>
  <div class="imgcover">
    <h3>Welcome {{ username }}</h3>
    <img src="../assets/images/Werbebild_ABLED_APP.png" alt="" />
    <h1 class="animated-text"><b>ABLED</b> APP</h1>
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
  position: relative;
  width: fit-content;
}
img {
  width: 100%;
  border: 2px solid var(--white);
  border-radius: 2rem;
  display: flex;
  justify-content: center;
}
h1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 10rem;
  /* margin-top: 62px; */
  text-align: center;
  font-family: monospace;
}
h3 {
  color: var(--white);
  font-family: monospace;
  font-size: large;
  text-align: center;
}
.animated-text {
  font-size: 2rem;
  font-style: italic;
  color: var(--white);
  margin-top: 3.5rem;

  /* animation: growAndShrink 50s infinite alternate; */
  animation:
    growAndShrink 5s infinite,
    shine 3s infinite alternate;
  transform: rotate(-40deg);
}

@keyframes growAndShrink {
  5% {
    transform: scale(1);
  }
  20% {
    transform: scale(1.2);
  }
  /* 20% {
    transform: scale(1);
  } */
}
@keyframes shine {
  /* 0% {
    text-shadow: none;
  } */
  50% {
    text-shadow: 0 0 10px var(--white);
  }
  /* 100% {
    text-shadow: none;
  } */
}
</style>
