<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
    <RouterLink :to="{ name: 'searchresultlist' }"> <BackArrow /></RouterLink>
  </div>

  <!--<RouterLink :to="{ name: 'searchresultmap' }"> zurück zur Karte</RouterLink>-->

  <br />
  <h2>Info</h2>

  <RouterLink :to="{ name: 'infopoicomment' }">Comments</RouterLink>
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
