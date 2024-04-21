<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
    <RouterLink :to="{ name: 'ownpoimap' }"><EarthMap /></RouterLink>
    <RouterLink :to="{ name: 'searchoptionalcategorie' }"> <BackArrow /></RouterLink>
  </div>

  <!--Routerlink Map:  <RouterLink :to="{ name: 'searchresultmap' }">ICON Erde</RouterLink>
 -->
  <h2>Ergebnisliste</h2>

  <!-- <RouterLink :to="{ name: 'infopoi' }"></RouterLink> -->
  <ul>
    <RouterLink :to="{ name: 'infopoi', params: { id: 'cc46b9ca-e4a7-42f4-802e-83f185e8f4ae' } }"
      >Weiter
      <li v-for="poi in store.poiData" :key="poi.id">
        <button
          class="searchlist-button"
          v-if="store.renderFilteredPois(poi)"
          @click="saveChoosenPoi(poi)"
        >
          <!--checkForFilterOptions -->
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
      </li></RouterLink
    >
  </ul>
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
    this.store.checkForFilterOptions() // renderFilteredPois
  },
  methods: {
    saveChoosenPoi(poi) {
      this.store.temporaryData.choosenPoi = poi.id
    }
  }
}
</script>

<style scoped>
li > .searchlist-button {
  width: 330px;
  background-color: var(--white);
  color: var(--red);
}
.searchlist-button:hover {
  background-color: rgb(252, 220, 180);
}
li {
  list-style-type: none;
}
ul {
  padding-left: 0;
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
