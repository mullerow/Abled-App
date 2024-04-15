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
</template>

<script>
import HomeButton from '@/components/HomeButton.vue'
import EarthMap from '@/components/EarthMap.vue'
import BackArrow from '@/components/BackArrow.vue'
export default {
  components: {
    HomeButton,
    EarthMap,
    BackArrow
  }
}
</script>
