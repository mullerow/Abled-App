<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
    <RouterLink :to="{ name: 'newpoioptionalcategorie' }"> <BackArrow /></RouterLink>
  </div>

  <div class="container">
    <HeadLine :Headline="'Wo befindet sich der Ort?'" />
    <categorie-button :Kategorie="'Mein Standort'" @click="store.getOwnPosition" />
    <p>
      <b>Dein Standort:</b> {{ store.temporaryData.city }}, {{ store.temporaryData.street }},
      {{ store.temporaryData.houseNumber }}
    </p>
    <RouterLink :to="{ name: 'newpoiinfoinput' }"
      ><NavButton Navigation="Weiter mit meinem Standort"
    /></RouterLink>
    <categorie-button :Kategorie="'Adresse eingeben'" @click="navigateToAdress" />

    <RouterLink ref="adress" :to="{ name: 'newpoiaddressinput' }"></RouterLink>
  </div>
</template>

<script>
import HomeButton from '@/components/HomeButton.vue'
import BackArrow from '@/components/BackArrow.vue'
import CategorieButton from '@/components/CategorieButton.vue'
import { storeData } from '@/stores/store.js'
import NavButton from '@/components/NavButton.vue'
import HeadLine from '@/components/HeadLine.vue'

export default {
  components: {
    HomeButton,
    BackArrow,
    CategorieButton,
    NavButton,
    HeadLine
  },
  data() {
    return {
      store: storeData()
    }
  },
  methods: {
    navigateToAdress() {
      this.$refs.adress.$el.click()
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
