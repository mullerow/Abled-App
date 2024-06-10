<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'ownpoimap' }"><EarthMap /></RouterLink>
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
  </div>

  <h2>Hier findest du alle deine favorisierten Orte</h2>

  <div
    class="favorite-poi-container"
    v-for="favoritePoi of this.store.temporaryData.DataFromCurrentUser.favoritePoisOfUser"
    :key="favoritePoi"
  >
    <button class="favorite-poi-button">{{ favoritePoi }}</button>
  </div>

  <RouterLink :to="{ name: 'favoritepoiinfo' }">Weiter</RouterLink>
</template>

<script>
import HomeButton from '@/components/HomeButton.vue'
import EarthMap from '@/components/EarthMap.vue'
import { storeData } from '@/stores/store.js'

export default {
  components: {
    HomeButton,
    EarthMap
  },
  data() {
    return {
      store: storeData()
    }
  },
  created() {
    this.store.getUserDataFromAPI().then(() => {
      this.store.getDataFromCurrentUser()
      console.log(
        'this.store.temporaryData.currentUserData',
        this.store.temporaryData.currentUserData
      )
    })
  }
}
</script>
<style scoped>
.favorite-poi-container {
  margin-left: auto;
  margin-right: auto;
}
.favorite-poi-button {
  width: 200px;
  height: 50px;
  margin-bottom: 10px;
}
</style>
