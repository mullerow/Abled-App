<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'newpoilocationselection' }"> <BackArrow /></RouterLink>
    <RouterLink :to="{ name: 'home' }"> <headerLogo /></RouterLink>
  </div>

  <h2>New Poi Address Input</h2>
  <RouterLink :to="{ name: 'newpoiinfoinput' }">Weiter</RouterLink>
</template>

<script>
import headerLogo from '@/components/headerLogo.vue'
import BackArrow from '@/components/BackArrow.vue'
export default {
  components: {
    headerLogo,
    BackArrow
  }
}
</script>

<style scoped>
.header-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: transparent;
}
</style>
