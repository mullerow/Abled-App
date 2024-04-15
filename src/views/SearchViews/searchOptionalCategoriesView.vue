<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
  </div>
  <RouterLink :to="{ name: 'home' }">Gehe zurück zur Startseite</RouterLink>
  <RouterLink :to="{ name: 'searchcategorie' }">Gehe eine Seite zurück</RouterLink>
  <h2>Zusatz Kategorien</h2>
  <RouterLink :to="{ name: 'searchresultlist' }"> Weiter</RouterLink>
</template>

<script>
import HomeButton from '@/components/HomeButton.vue'
export default {
  components: {
    HomeButton
  }
}
</script>
