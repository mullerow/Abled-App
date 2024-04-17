<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
  </div>

  <!--hier ggf
    <RouterLink :to="{ name: 'ownpoimap' }">ICON Erde</RouterLink> -->
  <RouterLink :to="{ name: 'ownpoi' }">Zurück</RouterLink>
  <h2>Own Poi Info</h2>

  <InfoField
    :Headline="poi.poiName"
    :xCoordinates="poi.xCoordinates"
    :yCoordinates="poi.yCoordinates"
    :openingTimes="poi.openingTimes"
    :detailCategories="poi.detailCategories"
    :id="poi.id"
  />
  <LöschenButton :Löschen="'Löschen'" />
  <NavButton :Navigation="'Bearbeiten'" />
  <!-- Button bearbeiten hinzufügen, der in Bearbeitung führt gleich wie New POI?-->
</template>

<script>
import { storeData } from '@/stores/store.js'
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
  },
  data() {
    return {
      id: this.$route.params.id,
      store: storeData()
    }
  },
  computed: {
    poi() {
      return this.store.poiData.find((el) => el.id == this.id)
    }
  },
  mounted() {
    console.log(this.poi)
  }
}
</script>
