<template>
  <RouterLink :to="{ name: 'home' }">Gehe zurück zur Startseite</RouterLink>
  <!--<RouterLink :to="{ name: 'searchresultmap' }"> zurück zur Karte</RouterLink>-->
  <RouterLink :to="{ name: 'searchresultlist' }"> zurück zur Liste</RouterLink>
  <br />
  <h2>Info</h2>

  <RouterLink :to="{ name: 'infopoicomment' }">Comments</RouterLink>
</template>

<script>
export default {}
</script>
