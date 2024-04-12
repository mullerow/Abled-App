<template>
  <RouterLink :to="{ name: 'home' }">Gehe zurück zur Startseite</RouterLink>
  <h2>Erstelle einen neuen Point of Interrest (POI) hier!</h2>
  <HeadLine />
  <CategorieButton id="kategorie" @click="saveButtonValue" />
  <NavButton />
  <RouterLink :to="{ name: 'newpoioptionalcategorie' }">Weiter</RouterLink>
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
