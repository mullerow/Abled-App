<template>
  <BackgroundGradient />
  <div class="header-buttons">
    <RouterLink :to="{ name: 'newpoicategorie' }"> <BackArrow /></RouterLink>
    <RouterLink :to="{ name: 'home' }"> <headerLogo /></RouterLink>
  </div>
  <HeadLine :Headline="'Wähle Zusatzkategorien'" class="headline-text" />
  <div class="container">
    <div class="container" v-for="categorie in store.localData.categories" :key="categorie.id">
      <div
        class="container"
        v-if="buttonValue.trim().toLowerCase() === categorie.categoryName.trim().toLowerCase()"
      >
        <CategorieButton
          v-for="detailCategorie in categorie.detailCategorys"
          :key="detailCategorie"
          :Kategorie="detailCategorie"
          @click="saveButtonValue(detailCategorie)"
          :id="detailCategorie"
          :class="{ pressed: isPressed[detailCategorie] }"
        />
      </div>
    </div>
    <RouterLink ref="lastLink" :to="{ name: 'newpoilocationselection' }"
      ><NavButton Navigation="Weiter"
    /></RouterLink>
  </div>
</template>

<script>
import headerLogo from '@/components/headerLogo.vue'
import BackArrow from '@/components/BackArrow.vue'
import HeadLine from '@/components/HeadLine.vue'
import CategorieButton from '@/components/CategorieButton.vue'
import NavButton from '@/components/NavButton.vue'
import BackgroundGradient from '@/components/BackgroundGradient.vue'
import { storeData } from '@/stores/store.js'

export default {
  components: { HeadLine, CategorieButton, NavButton, headerLogo, BackArrow, BackgroundGradient },

  data() {
    return {
      buttonValue: '',
      store: storeData(),
      isPressed: {}
    }
  },
  created() {
    this.buttonValue = localStorage.getItem('buttonValue')
    console.log(this.buttonValue)
  },

  methods: {
    saveButtonValue(detailCategorie) {
      this.isPressed[detailCategorie] = !this.isPressed[detailCategorie]

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

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
}
.pressed {
  color: var(--white);
  background-color: var(--black);
}

.header-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: transparent;
}
.categorie-button {
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}
.headline-text {
  width: 100%;
}
</style>
