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
