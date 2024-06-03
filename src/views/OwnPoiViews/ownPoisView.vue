<template>
  <BackgroundGradient />
  <div class="header-buttons">
    <RouterLink :to="{ name: 'ownpoimap' }"><EarthMap /></RouterLink>
    <RouterLink :to="{ name: 'home' }"> <headerLogo /></RouterLink>
  </div>

  <!--hier ggf
  <RouterLink :to="{ name: 'ownpoimap' }">ICON Erde</RouterLink> -->
  <div class="container">
    <HeadLine :Headline="'Deine erstellten Orte'" />
    <router-link
      v-for="element of this.store.temporaryData.ownPoisList"
      :key="element.id"
      :to="'/ownpoi/' + element.id"
      ><CategorieButton :Kategorie="element.poiName"
    /></router-link>
  </div>
</template>

<script>
import { storeData } from '@/stores/store.js'
import headerLogo from '@/components/headerLogo.vue'
import EarthMap from '@/components/EarthMap.vue'
import CategorieButton from '@/components/CategorieButton.vue'
import HeadLine from '@/components/HeadLine.vue'
import BackgroundGradient from '@/components/BackgroundGradient.vue'

export default {
  components: { headerLogo, EarthMap, CategorieButton, HeadLine, BackgroundGradient },
  data() {
    return {
      store: storeData(),
      currentUser: JSON.parse(localStorage.getItem('currentUserID'))
    }
  },
  methods: {
    getcreatedBy() {
      this.store.temporaryData.ownPoisList = this.store.temporaryData.currentPois.filter(
        (poi) => poi.createdBy === this.currentUser
      )
    }
  },
  mounted() {
    this.getcreatedBy()
  }
}
</script>

<style scoped>
.header-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: transparent;
}
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.categorie-button {
  width: 14.5rem;
}
</style>
