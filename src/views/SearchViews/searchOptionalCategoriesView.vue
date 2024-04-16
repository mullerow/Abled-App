<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
    <RouterLink :to="{ name: 'searchcategorie' }"> <BackArrow /></RouterLink>
  </div>

  <HeadLine :Headline="'Zusatz'" />
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
  <RouterLink :to="{ name: 'searchresultlist' }"> <NavButton Navigation="Weiter" /></RouterLink>
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
  components: {
    HomeButton,
    BackArrow,
    HeadLine,
    CategorieButton,
    NavButton
  },

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
    }
  }
}
</script>
