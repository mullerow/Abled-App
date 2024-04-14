<script>
import { storeData } from '@/stores/store.js'

export default {
  data() {
    return {
      store: storeData(),
      testX: 52.48847,
      testY: 13.425161
    }
  }
}
</script>

<template>
  <h2>Startseite</h2>
  <ul>
    <li><RouterLink :to="{ name: 'newpoicategorie' }">Neuen Poi erstellten</RouterLink></li>
    <li>
      <RouterLink :to="{ name: 'favoritepoi' }">Deine Favoriten</RouterLink>
    </li>
    <li><RouterLink :to="{ name: 'account' }">Deinen Account</RouterLink></li>
    <li><RouterLink :to="{ name: 'searchpoi' }">Suche</RouterLink></li>
    <li><RouterLink :to="{ name: 'ownpoi' }">geteilte Orte</RouterLink></li>
  </ul>
  <h3>Berechnungsbeispiel Koordinaten Distanz</h3>
  <h4>Poi Koordinaten:</h4>
  <p>X-Koordinaten: {{ store.poiData[0].xCoordinates }}</p>
  <p>Y-Koordinaten: {{ store.poiData[0].yCoordinates }}</p>

  <h3>EIgenen Standort ermitteln</h3>
  <button @click="store.getOwnPosition">Eigener Standort</button>
  <p>X-Koordinaten: {{ store.ownXCoordinate }}</p>
  <p>Y-Koordinaten: {{ store.ownYCoordinate }}</p>

  <button @click="store.calcDistance(store.poiData[0], store.ownXCoordinate, store.ownYCoordinate)">
    Berechne Distanz
  </button>
  <h3>Differenzen der Koordinaten</h3>
  <p>Ergebnis X: {{ store.xCoordinateDifference }}</p>
  <p>Ergebnis Y: {{ store.yCoordinateDifference }}</p>
  <h3>Differenzen der Länegn in X und Y Richtung</h3>
  <p>Distanz X: {{ store.xlengthDifference }} Meter</p>
  <p>Distanz Y: {{ store.ylengthDifference }} Meter</p>
  <h2>
    Luftlinie zum Ziel:
    <span style="color: goldenrod">{{ store.straightLineToAim }}</span>
    Meter
  </h2>
  <button @click="store.getAddressbyCoordinates(store.ownXCoordinate, store.ownYCoordinate)">
    ermittle die Addresse
  </button>
  <h3>Addresse des Ziels:</h3>
  <p>Stadt: {{ store.city }}</p>
  <p>Stadteil: {{ store.district }}</p>
  <p>Straße: {{ store.street }}</p>
  <p>Postleitzahl: {{ store.zipCode }}</p>
  <p v-show="store.houseNumber">Hausnummer: {{ store.houseNumber }}</p>
  <p v-show="!store.houseNumber">Hausnummer: nicht vorhanden (Daten zu ungenau)</p>
  <!--
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
        <li>Favorit: {{ poi.isFavorite }}</li>
        <button @click="store.changeFavorite(poi)">Favorit hinzufügen</button>
      </ul>
    </li>
  </ul>
  -->
</template>
