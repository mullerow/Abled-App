<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }">Gehe zurück zur Startseite</RouterLink>
    <RouterLink :to="{ name: 'searchresultlist' }">Gehe eine Seite zurück</RouterLink>
  </div>
  <h2>Ergebnismap</h2>
</template>

<script>
export default {}
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
