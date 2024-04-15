<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
    <RouterLink :to="{ name: 'infopoi' }"> <BackArrow /></RouterLink>
  </div>
  <RouterLink :to="{ name: 'home' }">Gehe zurück zur Startseite</RouterLink>
  <RouterLink :to="{ name: 'infopoi' }"> zurück zur Info</RouterLink>
  <h2>Comments</h2>
</template>

<script>
import HomeButton from '@/components/HomeButton.vue'
import BackArrow from '@/components/BackArrow.vue'
export default {
  components: {
    HomeButton,
    BackArrow
  }
}
</script>
