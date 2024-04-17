<template>
  <div class="info">
    <div class="container">
      <h2>{{ Headline }}</h2>
      <img src="@/assets/icons/star.png" class="star" />
    </div>
    <h3>Koordinaten</h3>
    <p>{{ xCoordinates }} , {{ yCoordinates }} (lat. Ing)</p>
    <h3>Adresse</h3>
    <p>{{ street }} {{ number }}, {{ zip }} {{ city }}</p>
    <h3>Öffnungszeiten</h3>
    <p>{{ openingTimes }}</p>
    <h3>{{ detailCategories }}</h3>
  </div>
</template>

<script>
export default {
  props: [
    'xCoordinates',
    'yCoordinates',
    'detailCategories',
    'Headline',
    'street',
    'number',
    'zip',
    'city',
    'openingTimes'
  ]
}
</script>

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
