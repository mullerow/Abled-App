<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
    <RouterLink :to="{ name: 'ownpoimap' }"><EarthMap /></RouterLink>
    <RouterLink :to="{ name: 'searchoptionalcategorie' }"> <BackArrow /></RouterLink>
  </div>

  <!--Routerlink Map:  <RouterLink :to="{ name: 'searchresultmap' }">ICON Erde</RouterLink>
 -->
  <h2>Ergebnisliste</h2>

  <router-link v-for="element of store.poiData" :key="element.id" :to="'/infopoi/' + element.id"
    ><CategorieButton :Kategorie="element.poiName" v-if="store.renderFilteredPois()"
  /></router-link>
</template>

<script>
import { storeData } from '@/stores/store.js'
import HomeButton from '@/components/HomeButton.vue'
import EarthMap from '@/components/EarthMap.vue'
import BackArrow from '@/components/BackArrow.vue'
import CategorieButton from '@/components/CategorieButton.vue'

export default {
  components: {
    HomeButton,
    EarthMap,
    BackArrow,
    CategorieButton
  },
  data() {
    return {
      store: storeData()
    }
  },
  created() {
    this.store.checkForFilterOptions() // renderFilteredPois
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
