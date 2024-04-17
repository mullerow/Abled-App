<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
    <RouterLink :to="{ name: 'searchresultlist' }"> <BackArrow /></RouterLink>
  </div>

  <!--<RouterLink :to="{ name: 'searchresultmap' }"> zurück zur Karte</RouterLink>-->

  <br />
  <h2>Info</h2>
  <InfoField
    v-for="(poidatas, index) of limitedPoiData"
    :key="index"
    :xCoordinates="poidatas.xCoordinates"
    :yCoordinates="poidatas.yCoordinates"
    :detailCategories="poidatas.detailCategories"
    :id="poidatas.id"
  />
  <LöschenButton :Löschen="'Nicht nutzbar'" />
  <NavButton :Navigation="'In Maps öffnen'" />
  <RouterLink :to="{ name: 'infopoicomment' }">Comments</RouterLink>
</template>

<script setup>
import { storeData } from '@/stores/store.js'

const store = storeData()
const limit = 1

const limitedPoiData = store.poiData.slice(0, limit)
</script>

<script>
import HomeButton from '@/components/HomeButton.vue'
import BackArrow from '@/components/BackArrow.vue'
import InfoField from '@/components/InfoField.vue'
import NavButton from '@/components/NavButton.vue'
import LöschenButton from '@/components/LöschenButton.vue'

export default {
  components: {
    HomeButton,
    BackArrow,
    InfoField,
    NavButton,
    LöschenButton
  }
}
</script>
