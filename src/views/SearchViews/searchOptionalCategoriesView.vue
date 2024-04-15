<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
    <RouterLink :to="{ name: 'searchcategorie' }"> <BackArrow /></RouterLink>
  </div>

  <h2>Zusatz Kategorien</h2>
  <RouterLink :to="{ name: 'searchresultlist' }"> Weiter</RouterLink>
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
