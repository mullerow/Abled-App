<template>
  <RouterLink :to="{ name: 'home' }">Gehe zurück zur Startseite</RouterLink>
  <RouterLink :to="{ name: 'newpoicategorie' }">Zurück</RouterLink>
  <h2>Zusatzkategorien New POI</h2>
  <HeadLine />
  <div v-for="categorie in store.localData.categories" :key="categorie.id">
    <div v-if="buttonValue === 'Rampe'">
      <CategorieButton
        v-for="detailCategorie in categorie.detailCategorys"
        :key="detailCategorie"
        :Kategorie="detailCategorie"
        @click="saveButtonValue(categorie)"
        :id="detailCategorie"
      />
    </div>
  </div>
  <NavButton Navigation="Weiter" @click="navigateToLastLink" />
  <RouterLink ref="lastLink" :to="{ name: 'newpoilocationselection' }"></RouterLink>
</template>

<script setup>
import { storeData } from '@/stores/store.js'

const store = storeData()
</script>

<script>
import HeadLine from '@/components/HeadLine.vue'
import CategorieButton from '@/components/CategorieButton.vue'
import NavButton from '@/components/NavButton.vue'

export default {
  components: { HeadLine, CategorieButton, NavButton },

  methods: {
    saveButtonValue(categorie) {
      const OptionalCategories = []
      const detailCategory = document.getElementById(categorie.id).textContent
      OptionalCategories.push(detailCategory)
      localStorage.setItem('OptionalCategories', OptionalCategories)
    },
    navigateToLastLink() {
      this.$refs.lastLink.$el.click()
    }
  },
  computed: {
    buttonValue() {
      return localStorage.getItem('buttonValue')
    }
  }
}
</script>
