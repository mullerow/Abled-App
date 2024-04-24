<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
    <RouterLink :to="{ name: 'searchpoi' }"> <BackArrow /></RouterLink>
  </div>

  <HeadLine :Headline="'Kategorien'" />
  <CategorieButton
    class="category-button"
    v-for="categorie of store.localData.categories"
    :key="categorie.id"
    :Kategorie="categorie.categoryName"
    @click="saveButtonValue(categorie)"
    :id="categorie.id"
  />

  <RouterLink :to="{ name: 'searchoptionalcategorie' }">
    <NavButton Navigation="Weiter"
  /></RouterLink>
</template>
<script>
import CategorieButton from '@/components/CategorieButton.vue'
import NavButton from '@/components/NavButton.vue'
import HomeButton from '@/components/HomeButton.vue'
import BackArrow from '@/components/BackArrow.vue'
import HeadLine from '@/components/HeadLine.vue'
import { storeData } from '@/stores/store.js'

export default {
  components: { CategorieButton, NavButton, HomeButton, BackArrow, HeadLine },
  data() {
    return {
      store: storeData()
    }
  },

  methods: {
    saveButtonValue(categorie) {
      const buttonValue = document.getElementById(categorie.id).textContent
      this.store.temporaryData.choosenCategory = buttonValue
      localStorage.setItem('buttonValue', buttonValue)
    }
  }
}
</script>

<style>
.category-button {
  margin: 0 auto 0 auto;
}
</style>
