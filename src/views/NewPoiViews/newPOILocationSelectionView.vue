<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'newpoioptionalcategorie' }"> <BackArrow /></RouterLink>
    <RouterLink :to="{ name: 'home' }"> <headerLogo /></RouterLink>
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
import headerLogo from '@/components/headerLogo.vue'
import BackArrow from '@/components/BackArrow.vue'
import CategorieButton from '@/components/CategorieButton.vue'
import { storeData } from '@/stores/store.js'
import NavButton from '@/components/NavButton.vue'
import HeadLine from '@/components/HeadLine.vue'

export default {
  components: {
    headerLogo,
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
</style>
