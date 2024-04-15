<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
  </div>

  <h2>Suche einen POI Start</h2>

  <input
    type="range"
    min="50"
    max="5000"
    step="50"
    value="500"
    name="rangeInput"
    id="idRangeInput"
  />
  <label for="rangeInput">Reichweite {{ store.temporaryData.searchDistance }} m</label>
  <!--
  <h3>Berechnungsbeispiel Koordinaten Distanz</h3>
  <h4>Poi Koordinaten:</h4>
  <p>X-Koordinaten: {{ store.poiData[0].xCoordinates }}</p>
  <p>Y-Koordinaten: {{ store.poiData[0].yCoordinates }}</p>

  <h3>Eigenen Standort ermitteln</h3>
  <button @click="store.getOwnPosition">Eigener Standort</button>
  <p>X-Koordinaten: {{ store.ownXCoordinate }}</p>
  <p>Y-Koordinaten: {{ store.ownYCoordinate }}</p>

  
  <h3>Differenzen der Koordinaten</h3>
  <p>Ergebnis X: {{ store.xCoordinateDifference }}</p>
  <p>Ergebnis Y: {{ store.yCoordinateDifference }}</p>
  <h3>Differenzen der Längen in X und Y Richtung</h3>
  <p>Distanz X: {{ store.xlengthDifference }} Meter</p>
  <p>Distanz Y: {{ store.ylengthDifference }} Meter</p>
  
-->
  <button @click="store.getOwnPosition">Eigener Standort</button>
  <br />
  <button @click="store.calcDistance(store.poiData[0], store.ownXCoordinate, store.ownYCoordinate)">
    Berechne Distanz
  </button>
  <h3>Ermittelter Standort:</h3>
  <p><b>Stadt:</b> {{ store.city }}</p>
  <p><b>Stadteil:</b> {{ store.district }}</p>
  <p><b>Straße:</b> {{ store.street }}</p>
  <p><b>Postleitzahl:</b> {{ store.zipCode }}</p>
  <p v-show="store.houseNumber"><b>Hausnummer:</b> {{ store.houseNumber }}</p>
  <p v-show="!store.houseNumber">
    <b>Hausnummer:</b> nicht vorhanden (Daten nicht genau zuweisbar)
  </p>
  <h2>
    Luftlinie zum Ziel:
    <span style="color: goldenrod">{{ store.straightLineToAim }}</span>
    Meter
  </h2>

  <RouterLink :to="{ name: 'searchcategorie' }"> Weiter</RouterLink>
  <br />
</template>

<script>
import { storeData } from '@/stores/store.js'
import HomeButton from '@/components/HomeButton.vue'

export default {
  components: {
    HomeButton
  },
  data() {
    return {
      store: storeData()
    }
  },
  mounted() {
    const rangeinputField = document.querySelector('#idRangeInput')
    rangeinputField.addEventListener('input', this.saveInputValue)
  },
  methods: {
    saveInputValue(e) {
      this.store.temporaryData.searchDistance = e.target.value
    }
  }
}
</script>

<style scoped>
button {
  margin-top: 30px;
}
label {
  margin-left: 20px;
}
</style>
