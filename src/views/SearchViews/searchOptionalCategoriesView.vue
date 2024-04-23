<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
    <RouterLink :to="{ name: 'searchcategorie' }" @click="this.store.resetDetailcategory()">
      <BackArrow
    /></RouterLink>
  </div>

  <HeadLine :Headline="'Zusatz'" />
  <div v-for="categorie in store.localData.categories" :key="categorie.id">
    <div v-if="buttonValue.trim().toLowerCase() === categorie.categoryName.trim().toLowerCase()">
      <CategorieButton
        v-for="detailCategorie in categorie.detailCategorys"
        :key="detailCategorie"
        :Kategorie="detailCategorie"
        @click="this.store.temporaryData.choosenDetailCategories.push(detailCategorie)"
        :id="detailCategorie"
      />
    </div>
  </div>
  <RouterLink :to="{ name: 'searchresultlist' }"> <NavButton Navigation="Weiter" /></RouterLink>
</template>

<script>
import HomeButton from '@/components/HomeButton.vue'
import BackArrow from '@/components/BackArrow.vue'
import HeadLine from '@/components/HeadLine.vue'
import CategorieButton from '@/components/CategorieButton.vue'
import NavButton from '@/components/NavButton.vue'
import { storeData } from '@/stores/store.js'

export default {
  components: {
    HomeButton,
    BackArrow,
    HeadLine,
    CategorieButton,
    NavButton
  },

  data() {
    return {
      buttonValue: '',
      store: storeData()
    }
  },
  created() {
    this.buttonValue = localStorage.getItem('buttonValue')
  }
}
</script>
