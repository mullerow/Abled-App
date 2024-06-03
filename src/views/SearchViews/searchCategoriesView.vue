<template>
  <BackgroundGradient />
  <div class="header-buttons">
    <RouterLink :to="{ name: 'searchpoi' }"> <BackArrow /></RouterLink>
    <RouterLink :to="{ name: 'home' }"> <headerLogo /></RouterLink>
  </div>

  <HeadLine class="headline-searchcategorie" :Headline="'Kategorien'" />
  <CategorieButton
    class="category-button button-search-categorie"
    v-for="categorie of store.localData.categories"
    :key="categorie.id"
    :Kategorie="categorie.categoryName"
    @click="saveButtonValue(categorie)"
    :id="categorie.id"
    :class="{ pressed: isPressed === categorie.id }"
  />

  <RouterLink class="button-search-nav" :to="{ name: 'searchoptionalcategorie' }">
    <NavButton Navigation="Weiter"
  /></RouterLink>
</template>
<script>
import CategorieButton from '@/components/CategorieButton.vue'
import NavButton from '@/components/NavButton.vue'
import headerLogo from '@/components/headerLogo.vue'
import BackArrow from '@/components/BackArrow.vue'
import HeadLine from '@/components/HeadLine.vue'
import BackgroundGradient from '@/components/BackgroundGradient.vue'
import { storeData } from '@/stores/store.js'

export default {
  components: { CategorieButton, NavButton, headerLogo, BackArrow, HeadLine, BackgroundGradient },
  data() {
    return {
      store: storeData(),
      isPressed: null
    }
  },
  created() {
    let currentUserID = localStorage.getItem('currentUserID').replace(/"/g, '')
    console.log('currentUserID', currentUserID)
    this.store.temporaryData.ownPoisList = this.store.temporaryData.currentPois.filter(
      (poi) => poi.createdBy === currentUserID
    )
    console.log(
      'this.store.temporaryData.ownPoisList.length',
      this.store.temporaryData.ownPoisList.length
    )
    if (this.store.temporaryData.ownPoisList.length < 6) {
      this.store.createDummyPois()
    }
  },

  methods: {
    saveButtonValue(categorie) {
      this.isPressed = categorie.id
      document.getElementById(categorie.id).classList.add('pressed')
      if (this.isPressed !== null) {
        document.getElementById(this.isPressed).classList.remove('pressed')
      }
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
.pressed {
  color: var(--white);
  background-color: var(--black);
}
.button-search-categorie {
  align-self: center;
}
.headline-searchcategorie {
  align-self: center;
}
.button-search-nav {
  align-self: center;
}
</style>
