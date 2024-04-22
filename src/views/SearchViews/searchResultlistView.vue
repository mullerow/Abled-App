<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
    <RouterLink :to="{ name: 'ownpoimap' }"><EarthMap /></RouterLink>
    <RouterLink :to="{ name: 'searchoptionalcategorie' }"> <BackArrow /></RouterLink>
  </div>

  <!--Routerlink Map:  <RouterLink :to="{ name: 'searchresultmap' }">ICON Erde</RouterLink>
 -->
  <h2>Ergebnisliste</h2>
  <router-link
    v-for="poi of store.temporaryData.currentPois"
    :key="poi.id"
    :to="'/infopoi/' + poi.id"
  >
    <button class="searchlist-button" v-if="store.renderFilteredPois(poi)">
      <div class="searchlist-poiname">{{ poi.poiName }}</div>
      <div
        class="searchlist-detailcategories"
        v-for="detailcategorie of poi.detailCategories"
        :key="'detail-' + poi.id + '-' + detailcategorie"
      >
        ✅ {{ detailcategorie }}
      </div>
      <div class="searchlist-distance">
        Entfernung: <b>{{ poi.currentSearchDistance }}</b> Meter
      </div>
    </button>
  </router-link>
</template>

<script>
import { storeData } from '@/stores/store.js'
import HomeButton from '@/components/HomeButton.vue'
import EarthMap from '@/components/EarthMap.vue'
import BackArrow from '@/components/BackArrow.vue'
export default {
  components: {
    HomeButton,
    EarthMap,
    BackArrow
  },
  data() {
    return {
      store: storeData()
    }
  },
  created() {
    this.store.checkForFilterOptions()
  },
  methods: {
    goToChoosenPoiDetails(poi) {
      this.$router.push({ name: 'infopoi', params: { id: poi.id } }) // Erstellt erst den Routerlink wenn auch die gesuchte Id vorhanden ist
    }
  }
}
</script>

<style scoped>
.searchlist-button {
  width: 330px;
  background-color: var(--white);
  color: var(--red);
  margin-bottom: 10px;
}
.searchlist-button:hover {
  background-color: rgb(252, 220, 180);
}
b {
  color: var(--black);
}

.searchlist-poiname {
  font-size: 20px;
  font-weight: bold;
}
.searchlist-detailcategories {
  text-align: start;
  font-size: 14px;
}
.searchlist-distance {
  text-align: end;
}
</style>
