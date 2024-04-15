<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
  </div>
  <RouterLink :to="{ name: 'home' }">Gehe zurück zur Startseite</RouterLink>
  <h2>Erstelle einen neuen Point of Interrest (POI) hier!</h2>
  <HeadLine />
  <CategorieButton
    v-for="categorie of store.localData.categories"
    :key="categorie.id"
    :Kategorie="categorie.categoryName"
    @click="saveButtonValue(categorie)"
    :id="categorie.id"
  />
  <NavButton Navigation="Weiter" @click="navigateToLastLink" />
  <RouterLink ref="lastLink" :to="{ name: 'newpoioptionalcategorie' }"></RouterLink>
</template>

<script setup>
import { storeData } from '@/stores/store.js'

const store = storeData()
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
