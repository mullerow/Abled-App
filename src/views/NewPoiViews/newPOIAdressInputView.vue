<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
    <RouterLink :to="{ name: 'newpoilocationselection' }"> <BackArrow /></RouterLink>
  </div>

  <h2>New Poi Address Input</h2>
  <RouterLink :to="{ name: 'newpoiinfoinput' }">Weiter</RouterLink>
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
