<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
  </div>

  <div class="container">
    <HeadLine :Headline="'Kategorien'" />
    <CategorieButton
      v-for="categorie in filteredCategories"
      :key="categorie.id"
      :Kategorie="categorie.categoryName"
      @click="saveButtonValue(categorie)"
      :id="categorie.id"
      class="Kategorien"
    />
    <NavButton Navigation="Weiter" @click="navigateToLastLink" />
    <RouterLink ref="lastLink" :to="{ name: 'newpoioptionalcategorie' }"></RouterLink>
  </div>
</template>

<script setup>
import { storeData } from '@/stores/store.js'

const store = storeData()
const filteredCategories = store.localData.categories.filter(
  (categorie) => categorie.categoryName !== 'Alle'
)
</script>

<script>
import HeadLine from '@/components/HeadLine.vue'
import CategorieButton from '@/components/CategorieButton.vue'
import NavButton from '@/components/NavButton.vue'
import HomeButton from '@/components/HomeButton.vue'

export default {
  components: { HeadLine, CategorieButton, NavButton, HomeButton },

  methods: {
    saveButtonValue(categorie) {
      const buttonValue = document.getElementById(categorie.id).textContent
      localStorage.setItem('buttonValue', buttonValue)
    },
    navigateToLastLink() {
      this.$refs.lastLink.$el.click()
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
