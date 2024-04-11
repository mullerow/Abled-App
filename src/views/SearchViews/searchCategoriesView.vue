<template>
  <RouterLink :to="{ name: 'home' }">Gehe zurück zur Startseite</RouterLink>
  <RouterLink :to="{ name: 'searchpoi' }">Gehe eine Seite zurück</RouterLink>
  <h2>Search Kategorien</h2>
  <CategorieButton id="kategorie" @click="saveButtonValue" />
  <NavButton />
  <RouterLink :to="{ name: 'searchoptionalcategorie' }"> Weiter</RouterLink>
</template>

<script>
import CategorieButton from '@/components/CategorieButton.vue'
import NavButton from '@/components/NavButton.vue'

export default {
  components: { CategorieButton, NavButton },

  methods: {
    saveButtonValue() {
      const buttonValue = document.getElementById('kategorie').textContent
      localStorage.setItem('buttonValue', buttonValue)
    }
  }
}
</script>
