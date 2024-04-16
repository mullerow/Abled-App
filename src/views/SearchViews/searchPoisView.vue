<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
  </div>

  <h2>Suche einen POI Start</h2>

  <input
    type="range"
    min="50"
    max="3000"
    step="50"
    value="500"
    name="rangeInput"
    id="idRangeInput"
  />
  <label for="rangeInput">Reichweite {{ store.temporaryData.searchDistance }} m</label>
  <button @click="store.getOwnPosition">Eigener Standort</button>
  <br />
  <button
    @click="
      store.calcDistance(
        store.poiData[0].xCoordinates,
        store.poiData[0].yCoordinates,
        store.ownXCoordinate,
        store.ownYCoordinate
      )
    "
  >
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
