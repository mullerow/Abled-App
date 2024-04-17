<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'ownpoimap' }"><EarthMap /></RouterLink>
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
  </div>

  <!--hier ggf
  <RouterLink :to="{ name: 'ownpoimap' }">ICON Erde</RouterLink> -->
  <h2>Hier findest du alle Orte die du erstellt hast</h2>
  <router-link v-for="element of store.poiData" :key="element.id" :to="'/ownpoi/' + element.id"
    ><CategorieButton :Kategorie="element.poiName"
  /></router-link>
</template>

<script setup>
import { storeData } from '@/stores/store.js'

const store = storeData()
</script>

<script>
import HomeButton from '@/components/HomeButton.vue'
import EarthMap from '@/components/EarthMap.vue'
import CategorieButton from '@/components/CategorieButton.vue'
export default {
  components: { HomeButton, EarthMap, CategorieButton }
}
</script>
