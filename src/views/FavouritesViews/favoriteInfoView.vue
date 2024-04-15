<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
    <RouterLink :to="{ name: 'favoritepoi' }"> <BackArrow /></RouterLink>
  </div>

  <h2>Info zum ausgewählten Favoriten</h2>
</template>

<script>
import BackArrow from '@/components/BackArrow.vue'
import HomeButton from '@/components/HomeButton.vue'
export default {
  components: {
    HomeButton,
    BackArrow
  }
}
</script>
