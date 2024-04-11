<template>
  <RouterLink :to="{ name: 'home' }">Gehe zurück zur Startseite</RouterLink>
  <!--Burgermenu einfügen und home löschen-->
  <h2>Map Own POIs</h2>
  <RouterLink :to="{ name: 'ownpoiinfo' }"></RouterLink>
</template>

<script>
export default {}
</script>
