<template>
  <RouterLink :to="{ name: 'home' }">Gehe zurück zur Startseite</RouterLink>
  <RouterLink :to="{ name: 'newpoicategorie' }">Zurück</RouterLink>
  <h2>Zusatzkategorien New POI</h2>

  <RouterLink :to="{ name: 'newpoilocationselection' }">Weiter</RouterLink>
</template>

<script>
export default {}
</script>
