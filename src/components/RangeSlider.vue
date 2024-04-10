<template>
  <div class="umkreis">
    <h3>Umkreis</h3>
    <div class="container">
      <p>0 m</p>
      <input type="range" class="RangeSlider" min="0" max="5000" />
      <p>5000 m</p>
    </div>
  </div>
</template>

<style scoped>
.umkreis {
  padding: 1rem;
  background-color: var(--white);
  color: var(--black);
  border-radius: 1rem;
  width: 70%;
  display: grid;
  place-items: center;
  margin: 2rem;
}

.RangeSlider {
  margin-left: 2rem;
  margin-right: 2rem;
}

.container {
  display: flex;
}
</style>
