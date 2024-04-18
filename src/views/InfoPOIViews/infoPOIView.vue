<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
    <RouterLink :to="{ name: 'searchresultlist' }"> <BackArrow /></RouterLink>
  </div>

  <!--<RouterLink :to="{ name: 'searchresultmap' }"> zurück zur Karte</RouterLink>-->

  <br />
  <h2>Info</h2>

  <InfoField
    :Headline="poi.poiName"
    :xCoordinates="poi.xCoordinates"
    :yCoordinates="poi.yCoordinates"
    :openingTimes="poi.openingTimes"
    :street="poi.street"
    :number="poi.number"
    :zip="poi.zip"
    :city="poi.city"
    :detailCategories="poi.detailCategories"
    :id="poi.id"
  />
  <LöschenButton :Löschen="'Nicht nutzbar'" />
  <NavButton :Navigation="'In Maps öffnen'" />
  <RouterLink :to="{ name: 'infopoicomment' }">Comments</RouterLink>
</template>

<script>
import { storeData } from '@/stores/store.js'
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
