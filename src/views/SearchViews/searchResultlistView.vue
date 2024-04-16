<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
    <RouterLink :to="{ name: 'ownpoimap' }"><EarthMap /></RouterLink>
    <RouterLink :to="{ name: 'searchoptionalcategorie' }"> <BackArrow /></RouterLink>
  </div>

  <!--Routerlink Map:  <RouterLink :to="{ name: 'searchresultmap' }">ICON Erde</RouterLink>
 -->
  <h2>Ergebnisliste</h2>

  <RouterLink :to="{ name: 'infopoi' }"> Weiter</RouterLink>
  <ul>
    <li v-for="poi in store.poiData" :key="poi.id">
      {{ poi.poiName }}
      <div
        v-for="detailcategorie of poi.detailCategories"
        :key="'detail-' + poi.id + '-' + detailcategorie"
      >
        {{ detailcategorie }}
      </div>
    </li>
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
  }
}
</script>
