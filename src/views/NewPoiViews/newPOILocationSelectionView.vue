<template>
  <RouterLink :to="{ name: 'home' }">Gehe zurück zur Startseite</RouterLink>
  <RouterLink :to="{ name: 'newpoioptionalcategorie' }">Zurück</RouterLink>
  <h2>Wo befindet sich der Ort?</h2>
  <categorie-button :Kategorie="'Mein Standort'" />
  <categorie-button :Kategorie="'Adresse eingeben'" @click="navigateToAdress" />

  <RouterLink ref="adress" :to="{ name: 'newpoiaddressinput' }"></RouterLink>
</template>

<script>
import CategorieButton from '@/components/CategorieButton.vue'
export default {
  components: { CategorieButton },

  methods: {
    navigateToAdress() {
      this.$refs.adress.$el.click()
    }
  }
}
</script>
