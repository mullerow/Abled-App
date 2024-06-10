<template>
  <BackgroundGradient />
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <BackArrow /></RouterLink>
    <RouterLink :to="{ name: 'home' }"> <headerLogo /></RouterLink>
    <RouterLink :to="{ name: '' }"><EarthMap /></RouterLink>
  </div>
  <HeadLine
    Headline="Hier findest du alle deine favorisierten Orte"
    class="headline-text"
  ></HeadLine>

  <div
    class="favorite-poi-container"
    v-for="favoritePoi of this.store.temporaryData.dataFromFavoritePois"
    :key="favoritePoi"
  >
    <button class="favorite-poi-button">
      {{ favoritePoi.poiName }}
      <img
        class="categorie-icon"
        :src="this.store.getIconOfCategory(favoritePoi)"
        alt="Kategorie Icon"
      />
    </button>
  </div>
</template>

<script>
import EarthMap from '@/components/EarthMap.vue'
import BackArrow from '@/components/BackArrow.vue'
import headerLogo from '@/components/headerLogo.vue'
import { storeData } from '@/stores/store.js'
import BackgroundGradient from '@/components/BackgroundGradient.vue'
import HeadLine from '@/components/HeadLine.vue'

export default {
  components: {
    BackArrow,
    headerLogo,
    EarthMap,
    BackgroundGradient,
    HeadLine
  },
  data() {
    return {
      store: storeData()
    }
  },
  async created() {
    await this.store.getPoiDataFromAPI()
    await this.store.getUserDataFromAPI()
    this.store.getDataFromCurrentUser()
    console.log(
      'this.store.temporaryData.currentUserData',
      this.store.temporaryData.currentUserData
    )

    this.store.getDataFromFavoritePois()
  }
}
</script>
<style scoped>
.favorite-poi-container {
  margin-left: auto;
  margin-right: auto;
  position: relative;
}
.favorite-poi-button {
  width: 200px;
  height: 50px;
  margin-bottom: 10px;
}
.categorie-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  border-radius: 5px;
}
</style>
