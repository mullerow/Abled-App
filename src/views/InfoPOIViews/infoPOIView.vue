<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
    <RouterLink :to="{ name: 'searchresultlist' }"> <BackArrow /></RouterLink>
  </div>
  <!-- 
  <RouterLink :to="{ name: 'searchresultmap' }"><EarthMap /></RouterLink> -->

  <br />
  <h2>Info</h2>

  <p v-if="this.store.temporaryData.currentPois[0]" class="info">
    <b>PoiId:</b>
    {{
      store.temporaryData.currentPois[0].poiName
        ? store.temporaryData.currentPois[0].poiName
        : 'User konnte nicht geladen werden'
    }}
    <br />
    <b>Coordinates:</b>
    {{
      store.temporaryData.currentPois[0].xCoordinates
        ? store.temporaryData.currentPois[0].xCoordinates
        : 'User konnte nicht geladen werden'
    }}

    {{
      store.temporaryData.currentPois[0].yCoordinates
        ? store.temporaryData.currentPois[0].yCoordinates
        : 'User konnte nicht geladen werden'
    }}
    <b>openingimes:</b>
    {{
      store.temporaryData.currentPois[0].openingTimes
        ? store.temporaryData.currentPois[0].openingTimes
        : 'User konnte nicht geladen werden'
    }}
    <br />
    <b>Address:</b>
    {{
      store.temporaryData.currentPois[0].currentSearchDistance
        ? store.temporaryData.currentPois[0].currentSearchDistance
        : 'User konnte nicht geladen werden'
    }}
    <br />
    <b>Categories:</b>
    {{
      store.temporaryData.currentPois[0].detailCategories
        ? store.temporaryData.currentPois[0].detailCategories
        : 'User konnte nicht geladen werden'
    }}
  </p>

  <LöschenButton :Löschen="'Nicht nutzbar'" @click="deletePoi" />
  <NavButton :Navigation="'In Maps öffnen'" />
  <RouterLink :to="{ name: 'infopoicomment' }">Comments</RouterLink>
</template>

<script>
import { storeData } from '@/stores/store.js'
import HomeButton from '@/components/HomeButton.vue'
import BackArrow from '@/components/BackArrow.vue'
import NavButton from '@/components/NavButton.vue'
import LöschenButton from '@/components/LöschenButton.vue'

export default {
  components: {
    HomeButton,
    BackArrow,

    NavButton,
    LöschenButton
  },
  data() {
    return {
      id: this.$route.params.id,
      store: storeData()
    }
  },
  methods: {
    deletePoi() {
      this.store.deletePoi(this.id)
    }
  },
  computed: {
    poi() {
      return this.store.poiData.find((el) => el.id == this.id)
    }
  },
  mounted() {
    console.log(this.poi)
    this.store.getPoiDataFromAPI()
  }
}
</script>

<style scoped>
.info {
  padding: 1rem;
  background-color: var(--white);
  color: var(--black);
  border-radius: 1rem;
  width: 75%;
  margin-top: 0;
  display: grid;
}
b {
  font-size: 20px;
  padding: 0.9rem;
  padding-left: 0;
}
</style>
