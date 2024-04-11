<template>
  <div class="info">
    <div class="container">
      <h2>Kategorie</h2>
      <img src="@/assets/icons/star.png" class="star" />
    </div>
    <h3>Koordinaten</h3>
    <p>34,342424 , 34,5335253 (lat. Ing)</p>
    <h3>Adresse</h3>
    <p>Lange Straße 29, 18055 Rostock</p>
    <h3>Öffnungszeiten</h3>
    <p>Mo - Sa 09:30 - 20:00</p>
    <h3>Wickelplatz</h3>
    <h3>Barrierefrei</h3>
  </div>
</template>

<style scoped>
.info {
  padding: 1rem;
  background-color: var(--white);
  color: var(--black);
  border-radius: 1rem;
  width: 70%;
  margin-top: 1rem;
  display: grid;
  margin: 2rem;
}

.container {
  display: flex;
  justify-content: space-between;
}

.star {
  object-fit: contain;
  width: 8%;
  margin: 1rem;
}
</style>
