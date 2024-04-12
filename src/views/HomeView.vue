<script>
import { storeData } from '@/stores/store.js'

export default {
  data() {
    return { store: storeData() }
  }
}
</script>

<template>
  <h2>Startseite</h2>
  <ul>
    <li><RouterLink :to="{ name: 'newpoicategorie' }">Erstelle einen neuen Poi</RouterLink></li>
    <li>
      <RouterLink :to="{ name: 'favoritepoi' }">Hier findest du deine Favoriten</RouterLink>
    </li>
    <li><RouterLink :to="{ name: 'account' }">Alles rund um deinen Account</RouterLink></li>
    <li><RouterLink :to="{ name: 'searchpoi' }">Finde deinen Weg!</RouterLink></li>
    <li><RouterLink :to="{ name: 'ownpoi' }">geteilte Orte</RouterLink></li>
  </ul>
  <h3>Liste aller User aus der Pinia Datenbank</h3>
  <ul v-for="user of store.userData" :key="user.id">
    <li>
      <b style="font-size: 16px">{{ user.id }}</b>
      <ul>
        <li>Kategorie: {{ user.userName }}</li>
        <li>E-Mail Adresse: {{ user.eMailAddress }}</li>
      </ul>
    </li>
  </ul>

  <h3>Liste aller POIs aus der Pinia Datenbank</h3>
  <ul v-for="poi of store.poiData" :key="poi.id">
    <li>
      <b style="font-size: 16px">{{ poi.id }}</b>
      <ul>
        <li>Kategorie: {{ poi.category }}</li>
        <li>X-Koordinate: {{ poi.xCoordinates }}</li>
        <li>Y-Koordinate: {{ poi.yCoordinates }}</li>
        <li>Mindestbreite: {{ poi.minWidth }} Zentimeter</li>
        <li>Favorit: {{ poi.isFavorite }}</li>
        <li>Details: {{ poi.detailCategories }}</li>
        <button @click="store.changeFavorite(poi)">Favorit hinzufügen</button>
      </ul>
    </li>
  </ul>
</template>
