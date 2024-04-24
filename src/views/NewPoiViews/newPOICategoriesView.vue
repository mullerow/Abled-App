<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
  </div>

  <div class="container">
    <HeadLine :Headline="'Wähle eine Kategorie'" />
    <CategorieButton
      v-for="categorie in filteredCategories"
      :key="categorie.id"
      :Kategorie="categorie.categoryName"
      @click="saveButtonValue(categorie)"
      :id="categorie.id"
      :class="{ pressed: isPressed === categorie.id }"
    />
    <NavButton Navigation="Weiter" @click="navigateToLastLink" />
    <RouterLink ref="lastLink" :to="{ name: 'newpoioptionalcategorie' }"></RouterLink>
  </div>
</template>

<script>
import HeadLine from '@/components/HeadLine.vue'
import CategorieButton from '@/components/CategorieButton.vue'
import NavButton from '@/components/NavButton.vue'
import HomeButton from '@/components/HomeButton.vue'
import { storeData } from '@/stores/store.js'

export default {
  data() {
    return {
      store: storeData(),
      isPressed: null
    }
  },

  components: { HeadLine, CategorieButton, NavButton, HomeButton },

  computed: {
    filteredCategories() {
      return this.store.localData.categories.filter(
        (categorie) => categorie.categoryName !== 'Alle'
      )
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
      localStorage.setItem('buttonValue', buttonValue)
    },
    navigateToLastLink() {
      this.$refs.lastLink.$el.click()
      localStorage.removeItem('OptionalCategories')
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
.pressed {
  color: var(--white);
  background-color: var(--black);
}
</style>
