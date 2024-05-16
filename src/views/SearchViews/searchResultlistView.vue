<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'searchoptionalcategorie' }"> <BackArrow /></RouterLink>
    <RouterLink :to="{ name: 'home' }"> <headerLogo /></RouterLink>
    <RouterLink :to="{ name: 'searchresultmap' }"><EarthMap /></RouterLink>
  </div>

  <HeadLine Headline="Ergebnisliste" class="headline-text"></HeadLine>
  <div class="search-list-container" v-for="poi of store.temporaryData.currentPois" :key="poi.id">
    <button class="searchlist-button" v-if="store.renderFilteredPois(poi)">
      <router-link :to="'/infopoi/' + poi.id">
        <div class="searchlist-poiname">{{ poi.poiName }}</div>
        <img class="categorie-icon" src="@/assets/icons/Pencil.svg" alt="Kategorie Icon" />
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
      </router-link>
    </button>
  </div>
</template>

<script>
import { storeData } from '@/stores/store.js'
import EarthMap from '@/components/EarthMap.vue'
import BackArrow from '@/components/BackArrow.vue'
import headerLogo from '@/components/headerLogo.vue'
import HeadLine from '@/components/HeadLine.vue'

export default {
  components: {
    headerLogo,
    EarthMap,
    BackArrow,
    HeadLine
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
  width: 100%;
  background-color: var(--white);
  color: var(--red);
  margin-bottom: 10px;
  border-radius: 16px;
  border: 1px solid var(--black);
  align-self: center;
  justify-content: space-around;
}
.searchlist-button:hover {
  background-color: rgb(252, 220, 180);
  cursor: pointer;
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
  width: 70%;
}
.searchlist-distance {
  text-align: end;
  margin-right: 5px;
  font-size: 14px;
}
.header-buttons {
  justify-content: space-between;
  padding: 10px 20px;
  background-color: transparent;
}
.headline-text {
  width: 100%;
}
.search-list-container {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
.categorie-icon {
  float: right;
  margin-right: 20px;
  width: 30px;
}

@media screen and (min-width: 600px) {
  .searchlist-button {
    width: 70%;
  }
}
@media screen and (min-width: 768px) {
  .searchlist-button {
    width: 50%;
  }
}
</style>
