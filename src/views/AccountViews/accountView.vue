<template>

  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
  </div>

  <RouterLink :to="{ name: 'register' }"> Register</RouterLink>
  

  <h2>Verwalte deine Account-Daten</h2>
</template>

<script>
import HomeButton from '@/components/HomeButton.vue'

export default {
  components: {
    HomeButton
  }
}
</script>
