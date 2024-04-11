<template>
  <RouterLink :to="{ name: 'home' }">Gehe zurück zur Startseite</RouterLink>
  <!--Burger Menü hier einfügen und home löschen-->
  <h2>Karte mit Favoriten</h2>
  <!--Weiterleitung zu Info Fenster bei Click auf Icon auf der Map-->
  <RouterLink :to="{ name: 'favoritepoiinfo' }">Icon</RouterLink>
</template>

<script>
export default {}
</script>
