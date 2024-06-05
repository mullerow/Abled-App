<template>
  <BackgroundGradient />
  <div class="header-buttons">
    <RouterLink :to="{ name: 'searchcategorie' }" @click="this.store.resetDetailcategory()">
      <BackArrow
    /></RouterLink>
    <RouterLink :to="{ name: 'home' }"> <headerLogo /></RouterLink>
  </div>

  <HeadLine :Headline="'Zusatz'" class="header-text" />
  <div v-for="categorie in store.localData.categories" :key="categorie.id" class="container">
    <div
      v-if="buttonValue.trim().toLowerCase() === categorie.categoryName.trim().toLowerCase()"
      class="optional-categories-buttons"
    >
      <CategorieButton
        v-for="detailCategorie in categorie.detailCategorys"
        :key="detailCategorie"
        :Kategorie="detailCategorie"
        @click="saveClick(detailCategorie)"
        :id="detailCategorie"
        :class="{ pressed: isPressed[detailCategorie] }"
      />
    </div>
  </div>
  <RouterLink :to="{ name: 'searchresultlist' }" class="router-link" id="navButton">
    <NavButton Navigation="Weiter"
  /></RouterLink>
</template>

<script>
import BackArrow from '@/components/BackArrow.vue'
import HeadLine from '@/components/HeadLine.vue'
import CategorieButton from '@/components/CategorieButton.vue'
import NavButton from '@/components/NavButton.vue'
import { storeData } from '@/stores/store.js'
import headerLogo from '@/components/headerLogo.vue'
import BackgroundGradient from '@/components/BackgroundGradient.vue'
export default {
  components: {
    BackArrow,
    HeadLine,
    CategorieButton,
    NavButton,
    headerLogo,
    BackgroundGradient
  },

  data() {
    return {
      buttonValue: '',
      store: storeData(),
      isPressed: {}
    }
  },

  methods: {
    saveClick(detailCategorie) {
      if (
        this.store.temporaryData.choosenDetailCategories.some((category) => {
          return category === detailCategorie
        })
      ) {
        let indexDeleteCategory = this.store.temporaryData.choosenDetailCategories.findIndex(
          (element) => {
            return element === detailCategorie
          }
        )
        this.store.temporaryData.choosenDetailCategories.splice(indexDeleteCategory, 1)
        this.isPressed[detailCategorie] = !this.isPressed[detailCategorie]
      }
      // abfrage ob detailcategorien sich gegenseitig ausschließen
      else if (
        // Abfrage Rampen detailcategorien
        detailCategorie === 'flach' &&
        this.store.temporaryData.choosenDetailCategories.find((element) => {
          return element === 'mäßig Steil' || element === 'steil'
        })
      ) {
        return
      } else if (
        detailCategorie === 'mäßig Steil' &&
        this.store.temporaryData.choosenDetailCategories.find((element) => {
          return element === 'flach' || element === 'steil'
        })
      ) {
        return
      } else if (
        detailCategorie === 'steil' &&
        this.store.temporaryData.choosenDetailCategories.find((element) => {
          return element === 'flach' || element === 'mäßig Steil'
        })
      ) {
        return
      }
      // Abfrage Fahrstuhl detailcategorien
      else if (
        detailCategorie === 'klein' &&
        this.store.temporaryData.choosenDetailCategories.find((element) => {
          return element === 'mittel' || element === 'groß'
        })
      ) {
        return
      } else if (
        detailCategorie === 'mittel' &&
        this.store.temporaryData.choosenDetailCategories.find((element) => {
          return element === 'klein' || element === 'groß'
        })
      ) {
        return
      } else if (
        detailCategorie === 'groß' &&
        this.store.temporaryData.choosenDetailCategories.find((element) => {
          return element === 'klein' || element === 'mittel'
        })
      ) {
        return
      } else {
        this.store.temporaryData.choosenDetailCategories.push(detailCategorie)
        this.isPressed[detailCategorie] = !this.isPressed[detailCategorie]
      }
    }
  },

  created() {
    this.buttonValue = localStorage.getItem('buttonValue')
    this.store.temporaryData.choosenDetailCategories = []
    if (this.store.temporaryData.choosenCategory === ' Alle') {
      this.$nextTick(() => {
        // Wartet noch bis der DOM vollständig erstellt ist, damit navButton auch gefunden werden kann
        const button = document.getElementById('navButton')
        if (button) {
          button.click()
        }
      })
    }
  }
}
</script>

<style scoped>
.header-buttons {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: transparent;
}
.pressed {
  color: var(--white);
  background-color: var(--black);
}
.header-text {
  width: 100%;
}
.optional-categories-buttons {
  align-self: center;
}

.container {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.router-link {
  align-self: center;
}
</style>
