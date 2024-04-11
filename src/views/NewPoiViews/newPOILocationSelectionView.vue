<template>
  <RouterLink :to="{ name: 'home' }">Gehe zurück zur Startseite</RouterLink>
  <RouterLink :to="{ name: 'newpoioptionalcategorie' }">Zurück</RouterLink>
  <h2>Location Selection</h2>

  <RouterLink :to="{ name: 'newpoiaddressinput' }">Weiter</RouterLink>
</template>

<script>
export default {}
</script>
