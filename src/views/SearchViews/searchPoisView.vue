<template>
  <RouterLink :to="{ name: 'home' }">Gehe zurück zur Startseite</RouterLink>
  <h2>Suche einen POI Start</h2>
  <RouterLink :to="{ name: 'searchcategorie' }"> Weiter</RouterLink>
  <br />
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

  <h3>Berechnungsbeispiel Koordinaten Distanz</h3>
  <h4>Poi Koordinaten:</h4>
  <p>X-Koordinaten: {{ store.poiData[0].xCoordinates }}</p>
  <p>Y-Koordinaten: {{ store.poiData[0].yCoordinates }}</p>

  <h3>Eigenen Standort ermitteln</h3>
  <button @click="store.getOwnPosition">Eigener Standort</button>
  <p>X-Koordinaten: {{ store.ownXCoordinate }}</p>
  <p>Y-Koordinaten: {{ store.ownYCoordinate }}</p>

  <button @click="store.calcDistance(store.poiData[0], store.ownXCoordinate, store.ownYCoordinate)">
    Berechne Distanz
  </button>
  <h3>Differenzen der Koordinaten</h3>
  <p>Ergebnis X: {{ store.xCoordinateDifference }}</p>
  <p>Ergebnis Y: {{ store.yCoordinateDifference }}</p>
  <h3>Differenzen der Längen in X und Y Richtung</h3>
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
  <p v-show="!store.houseNumber">Hausnummer: nicht vorhanden (Daten nicht genau zuweisbar)</p>
</template>

<script>
import { storeData } from '@/stores/store.js'

export default {
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
