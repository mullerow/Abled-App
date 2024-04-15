<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
    <RouterLink :to="{ name: 'newpoioptionalcategorie' }"> <BackArrow /></RouterLink>
  </div>

  <h2>Location Selection</h2>

  <RouterLink :to="{ name: 'newpoiaddressinput' }">Weiter</RouterLink>
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
