<template>
  <RouterLink :to="{ name: 'home' }">Gehe zurück zur Startseite</RouterLink>
  <RouterLink :to="{ name: 'searchpoi' }">Gehe eine Seite zurück</RouterLink>
  <h2>Search Kategorien</h2>
  <RouterLink :to="{ name: 'searchoptionalcategorie' }"> Weiter</RouterLink>
</template>

<script>
export default {}
</script>
