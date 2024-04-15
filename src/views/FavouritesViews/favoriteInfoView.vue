<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
  </div>
  <RouterLink :to="{ name: 'home' }">Gehe zurück zur Startseite</RouterLink>
  <RouterLink :to="{ name: 'favoritepoi' }">Gehe eine Seite zurück</RouterLink>
  <h2>Info zum ausgewählten Favoriten</h2>
</template>

<script>
import HomeButton from '@/components/HomeButton.vue'
export default {
  components: {
    HomeButton
  }
}
</script>
