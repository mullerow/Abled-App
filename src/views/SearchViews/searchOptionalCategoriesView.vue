<template>
  <RouterLink :to="{ name: 'home' }">Gehe zurück zur Startseite</RouterLink>
  <RouterLink :to="{ name: 'searchcategorie' }">Gehe eine Seite zurück</RouterLink>
  <h2>Zusatz Kategorien</h2>
  <RouterLink :to="{ name: 'searchresultlist' }"> Weiter</RouterLink>
</template>

<script>
export default {}
</script>
