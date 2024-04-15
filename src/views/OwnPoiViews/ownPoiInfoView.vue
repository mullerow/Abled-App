<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
  </div>
  <RouterLink :to="{ name: 'home' }">Gehe zurück zur Startseite</RouterLink>
  <!--hier ggf
    <RouterLink :to="{ name: 'ownpoimap' }">ICON Erde</RouterLink> -->
  <RouterLink :to="{ name: 'ownpoi' }">Zurück</RouterLink>
  <h2>Own Poi Info</h2>
  <!-- Button bearbeiten hinzufügen, der in Bearbeitung führt gleich wie New POI?-->
</template>

<script>
import HomeButton from '@/components/HomeButton.vue'
export default {
  components: {
    HomeButton
  }
}
</script>
