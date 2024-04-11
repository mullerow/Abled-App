<template>
  <RouterLink :to="{ name: 'home' }">Gehe zurück zur Startseite</RouterLink>
  <RouterLink :to="{ name: 'searchoptionalcategorie' }">Gehe eine Seite zurück</RouterLink>
  <!--Routerlink Map:  <RouterLink :to="{ name: 'searchresultmap' }">ICON Erde</RouterLink>
 -->
  <h2>Ergebnisliste</h2>

  <RouterLink :to="{ name: 'infopoi' }"> Weiter</RouterLink>
</template>

<script>
export default {}
</script>
