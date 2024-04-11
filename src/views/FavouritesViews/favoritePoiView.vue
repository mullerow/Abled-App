<template>
  <RouterLink :to="{ name: 'home' }">Gehe zurück zur Startseite</RouterLink>
  <!--<RouterLink :to="{ name: 'favoritemap' }">ICON Karte</RouterLink>-->
  <h2>Hier findest du alle deine favorisierten Orte</h2>

  <RouterLink :to="{ name: 'favoritepoiinfo' }">Weiter</RouterLink>
</template>

<script>
export default {}
</script>
