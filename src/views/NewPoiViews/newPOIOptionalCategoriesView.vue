<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
    <RouterLink :to="{ name: 'newpoicategorie' }"> <BackArrow /></RouterLink>
  </div>

  <h2>Zusatzkategorien New POI</h2>
  <HeadLine />
  <div v-for="categorie in store.localData.categories" :key="categorie.id">
    <div v-if="buttonValue.trim().toLowerCase() === categorie.categoryName.trim().toLowerCase()">
      <CategorieButton
        v-for="detailCategorie in categorie.detailCategorys"
        :key="detailCategorie"
        :Kategorie="detailCategorie"
        @click="saveButtonValue(detailCategorie)"
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
import HomeButton from '@/components/HomeButton.vue'
import BackArrow from '@/components/BackArrow.vue'
import HeadLine from '@/components/HeadLine.vue'
import CategorieButton from '@/components/CategorieButton.vue'
import NavButton from '@/components/NavButton.vue'

export default {
  components: { HeadLine, CategorieButton, NavButton, HomeButton, BackArrow },

  data() {
    return {
      buttonValue: ''
    }
  },
  created() {
    this.buttonValue = localStorage.getItem('buttonValue')
    console.log(this.buttonValue)
  },

  methods: {
    saveButtonValue(detailCategorie) {
      let OptionalCategories = localStorage.getItem('OptionalCategories')
      OptionalCategories = OptionalCategories ? JSON.parse(OptionalCategories) : []
      const index = OptionalCategories.indexOf(detailCategorie)
      if (index !== -1) {
        OptionalCategories.splice(index, 1)
      } else {
        OptionalCategories.push(detailCategorie)
      }
      localStorage.setItem('OptionalCategories', JSON.stringify(OptionalCategories))
    },

    navigateToLastLink() {
      this.$refs.lastLink.$el.click()
    }
  }
}
</script>
