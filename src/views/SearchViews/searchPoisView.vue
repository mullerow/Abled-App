<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
  </div>

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
