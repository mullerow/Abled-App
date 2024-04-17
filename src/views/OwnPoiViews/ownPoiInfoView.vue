<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
  </div>

  <!--hier ggf
    <RouterLink :to="{ name: 'ownpoimap' }">ICON Erde</RouterLink> -->
  <RouterLink :to="{ name: 'ownpoi' }">Zurück</RouterLink>
  <h2>Own Poi Info</h2>

  <InfoField :xCoordinates="store.poiData.xCoordinates" />
  <LöschenButton :Löschen="'Löschen'" />
  <NavButton :Navigation="'Bearbeiten'" />
  <!-- Button bearbeiten hinzufügen, der in Bearbeitung führt gleich wie New POI?-->
</template>

<script>
import HomeButton from '@/components/HomeButton.vue'
import InfoField from '@/components/InfoField.vue'
import NavButton from '@/components/NavButton.vue'
import LöschenButton from '@/components/LöschenButton.vue'
export default {
  components: {
    HomeButton,
    InfoField,
    NavButton,
    LöschenButton
  }
}
</script>
