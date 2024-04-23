<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
    <RouterLink :to="{ name: 'searchresultlist' }"> <BackArrow /></RouterLink>
  </div>
  <!-- 
  <RouterLink :to="{ name: 'searchresultmap' }"><EarthMap /></RouterLink> -->

  <br />
  <h2>Informationen zum Ort</h2>

  <section v-if="findChoosenPoi">
    <p class="info">
      <b>Name des Pois:</b>
      {{ findChoosenPoi.poiName ? findChoosenPoi.poiName : 'Poi konnte nicht geladen werden' }}
    </p>
    <div class="info">
      <b> Details:</b>
      <p
        v-for="detailcategorie of findChoosenPoi.detailCategories"
        :key="'detail-' + findChoosenPoi.id + '-' + detailcategorie"
      >
        ✅ {{ detailcategorie }}
      </p>
    </div>
    <p class="info">
      <b>Vorhandene Mindestbreite:</b>
      {{ findChoosenPoi.minWidth ? findChoosenPoi.minWidth : 'Poi konnte nicht geladen werden' }}
    </p>
    <p class="info">
      <b>Entfernung zu deinem Standort:</b>
      {{
        findChoosenPoi.currentSearchDistance
          ? findChoosenPoi.currentSearchDistance
          : 'Poi konnte nicht geladen werden'
      }}
      meter
    </p>
  </section>
  <p>
    <LöschenButton :Löschen="'Nicht nutzbar'" @click="deletePoi" />
    <NavButton :Navigation="'In Maps öffnen'" />
    <RouterLink :to="{ name: 'infopoicomment' }">Comments</RouterLink>
  </p>
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
      this.store.deletePoifromAPI(this.id)
      this.$router.push({ name: 'home' })
    }
  },
  computed: {
    findChoosenPoi() {
      return this.store.temporaryData.currentPois.find((el) => el.id == this.id)
    }
  },
  mounted() {
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
