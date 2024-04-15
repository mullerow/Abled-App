<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
    <RouterLink :to="{ name: 'searchpoi' }"> <BackArrow /></RouterLink>
  </div>
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
import HomeButton from '@/components/HomeButton.vue'
import BackArrow from '@/components/BackArrow.vue'

export default {
  components: { CategorieButton, NavButton, HomeButton, BackArrow },

  methods: {
    saveButtonValue() {
      const buttonValue = document.getElementById('kategorie').textContent
      localStorage.setItem('buttonValue', buttonValue)
    }
  }
}
</script>
