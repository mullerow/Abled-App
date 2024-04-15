<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'ownpoimap' }"><EarthMap /></RouterLink>
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
  </div>

  <!--hier ggf
  <RouterLink :to="{ name: 'ownpoimap' }">ICON Erde</RouterLink> -->
  <h2>Hier findest du alle Orte die du erstellt hast</h2>

  <RouterLink :to="{ name: 'ownpoiinfo' }">Bearbeiten</RouterLink>
</template>

<script>
import HomeButton from '@/components/HomeButton.vue'
import EarthMap from '@/components/EarthMap.vue'
export default {
  components: { HomeButton, EarthMap }
}
</script>
