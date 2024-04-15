<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
    <RouterLink :to="{ name: 'searchresultlist' }"> <BackArrow /></RouterLink>
  </div>
  <RouterLink :to="{ name: 'home' }">Gehe zurück zur Startseite</RouterLink>
  <!--<RouterLink :to="{ name: 'searchresultmap' }"> zurück zur Karte</RouterLink>-->
  <RouterLink :to="{ name: 'searchresultlist' }"> zurück zur Liste</RouterLink>
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
