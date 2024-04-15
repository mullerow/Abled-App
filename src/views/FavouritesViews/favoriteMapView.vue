<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
    <RouterLink :to="{ name: 'favoritepoi' }"> <BackArrow /></RouterLink>
  </div>

  <!--Burger Menü hier einfügen und home löschen-->
  <h2>Karte mit Favoriten</h2>
  <!--Weiterleitung zu Info Fenster bei Click auf Icon auf der Map-->
  <RouterLink :to="{ name: 'favoritepoiinfo' }">Icon</RouterLink>
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
