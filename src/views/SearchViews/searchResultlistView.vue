<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'searchoptionalcategorie' }"> <BackArrow /></RouterLink>
    <RouterLink :to="{ name: 'home' }"> <headerLogo /></RouterLink>
    <RouterLink :to="{ name: 'ownpoimap' }"><EarthMap /></RouterLink>
  </div>

  <!--Routerlink Map:  <RouterLink :to="{ name: 'searchresultmap' }">ICON Erde</RouterLink>
 -->
  <h2>Ergebnisliste</h2>
  <div class="list-container">
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
  </div>
</template>

<script>
import { storeData } from '@/stores/store.js'
import EarthMap from '@/components/EarthMap.vue'
import BackArrow from '@/components/BackArrow.vue'
import headerLogo from '@/components/headerLogo.vue'
export default {
  components: {
    headerLogo,
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
  }
}
</script>

<style scoped>
.searchlist-button {
  width: 330px;
  background-color: var(--white);
  color: var(--red);
  margin-bottom: 10px;
  border-radius: 16px;
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
  margin-right: 5px;
  font-size: 14px;
}
.header-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: transparent;
}
</style>
