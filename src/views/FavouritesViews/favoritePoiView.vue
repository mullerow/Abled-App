<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'ownpoimap' }"><EarthMap /></RouterLink>
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
  </div>
  <RouterLink :to="{ name: 'home' }">Gehe zurück zur Startseite</RouterLink>
  <!--<RouterLink :to="{ name: 'favoritemap' }">ICON Karte</RouterLink>-->
  <h2>Hier findest du alle deine favorisierten Orte</h2>

  <RouterLink :to="{ name: 'favoritepoiinfo' }">Weiter</RouterLink>
</template>

<script>
import HomeButton from '@/components/HomeButton.vue'
import EarthMap from '@/components/EarthMap.vue'
export default {
  components: {
    HomeButton,
    EarthMap
  }
}
</script>
