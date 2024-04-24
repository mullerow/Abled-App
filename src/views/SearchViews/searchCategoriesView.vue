<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'searchpoi' }"> <BackArrow /></RouterLink>
    <RouterLink :to="{ name: 'home' }"> <headerLogo /></RouterLink>
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
import headerLogo from '@/components/headerLogo.vue'
import BackArrow from '@/components/BackArrow.vue'
import HeadLine from '@/components/HeadLine.vue'
import { storeData } from '@/stores/store.js'

export default {
  components: { CategorieButton, NavButton, headerLogo, BackArrow, HeadLine },
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


<style scoped>
.header-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: transparent;
}
</style>
