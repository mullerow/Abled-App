<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
    <RouterLink :to="{ name: 'newpoicategorie' }"> <BackArrow /></RouterLink>
  </div>
  <RouterLink :to="{ name: 'home' }">Gehe zurück zur Startseite</RouterLink>
  <RouterLink :to="{ name: 'newpoicategorie' }">Zurück</RouterLink>
  <h2>Zusatzkategorien New POI</h2>
  <HeadLine />
  <CategorieButton id="kategorie" @click="saveButtonValue" />
  <NavButton />
  <RouterLink :to="{ name: 'newpoilocationselection' }">Weiter</RouterLink>
</template>

<script>
import HomeButton from '@/components/HomeButton.vue'
import BackArrow from '@/components/BackArrow.vue'
import HeadLine from '@/components/HeadLine.vue'
import CategorieButton from '@/components/CategorieButton.vue'
import NavButton from '@/components/NavButton.vue'

export default {
  components: { HeadLine, CategorieButton, NavButton, HomeButton, BackArrow },

  methods: {
    saveButtonValue() {
      const buttonValue = document.getElementById('kategorie').textContent
      localStorage.setItem('buttonValue', buttonValue)
    }
  }
}
</script>
