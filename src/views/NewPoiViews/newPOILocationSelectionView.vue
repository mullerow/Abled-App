<template>

  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
    <RouterLink :to="{ name: 'newpoioptionalcategorie' }"> <BackArrow /></RouterLink>
  </div>

  <h2>Location Selection</h2>
  <h2>Wo befindet sich der Ort?</h2>
  <categorie-button :Kategorie="'Mein Standort'" />
  <categorie-button :Kategorie="'Adresse eingeben'" @click="navigateToAdress" />


  <RouterLink ref="adress" :to="{ name: 'newpoiaddressinput' }"></RouterLink>
</template>

<script>

import HomeButton from '@/components/HomeButton.vue'
import BackArrow from '@/components/BackArrow.vue'
import CategorieButton from '@/components/CategorieButton.vue'
export default {
  components: {
    HomeButton,
    BackArrow,
    CategorieButton 
},
  methods: {
    navigateToAdress() {
      this.$refs.adress.$el.click()
    }

  }
}
</script>
