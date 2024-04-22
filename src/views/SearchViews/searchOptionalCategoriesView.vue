<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
    <RouterLink :to="{ name: 'searchcategorie' }"> <BackArrow /></RouterLink>
  </div>

  <HeadLine :Headline="'Zusatz'" />
  <div v-for="categorie in store.localData.categories" :key="categorie.id">
    <div
      v-if="searchCategorie.trim().toLowerCase() === categorie.categoryName.trim().toLowerCase()"
    >
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
      searchCategorie: '',
      store: storeData()
    }
  },
  created() {
    this.searchCategorie = localStorage.getItem('searchCategorie')
    console.log(this.searchCategorie)
  },

  methods: {
    saveButtonValue(detailCategorie) {
      let OptionalCategories = localStorage.getItem('searchOptionalCategories')
      OptionalCategories = OptionalCategories ? JSON.parse(OptionalCategories) : []
      const index = OptionalCategories.indexOf(detailCategorie)
      if (index !== -1) {
        OptionalCategories.splice(index, 1)
      } else {
        OptionalCategories.push(detailCategorie)
      }
      localStorage.setItem('searchOptionalCategories', JSON.stringify(OptionalCategories))
    }
  }
}
</script>
