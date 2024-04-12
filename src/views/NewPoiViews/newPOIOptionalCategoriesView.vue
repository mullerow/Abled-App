<template>
  <RouterLink :to="{ name: 'home' }">Gehe zurück zur Startseite</RouterLink>
  <RouterLink :to="{ name: 'newpoicategorie' }">Zurück</RouterLink>
  <h2>Zusatzkategorien New POI</h2>
  <HeadLine />
  <CategorieButton id="kategorie" @click="saveButtonValue" />
  <NavButton />
  <RouterLink :to="{ name: 'newpoilocationselection' }">Weiter</RouterLink>
</template>

<script>
import HeadLine from '@/components/HeadLine.vue'
import CategorieButton from '@/components/CategorieButton.vue'
import NavButton from '@/components/NavButton.vue'

export default {
  components: { HeadLine, CategorieButton, NavButton },

  methods: {
    saveButtonValue() {
      const buttonValue = document.getElementById('kategorie').textContent
      localStorage.setItem('buttonValue', buttonValue)
    }
  }
}
</script>
