<template>
  <header>
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
    <headerLogo> </headerLogo>
    <div class="header-buttons"></div>
    <RouterLink :to="{ name: 'home' }" class="back-arrow"> <BackArrow /></RouterLink>
  </header>

  <h4>In welchem Umkreis möchtest du suchen?</h4>

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
  <button @click="store.getOwnPosition">Bestimme meinen Standort</button>
  <br />
  <h3>Sie befinden sich hier:</h3>
  <p><b>Stadt:</b> {{ store.temporaryData.city }}</p>
  <p><b>Stadteil:</b> {{ store.temporaryData.district }}</p>
  <p><b>Straße:</b> {{ store.temporaryData.street }}</p>
  <p><b>Postleitzahl:</b> {{ store.temporaryData.zipCode }}</p>
  <p v-show="store.temporaryData.houseNumber">
    <b>Hausnummer:</b> {{ store.temporaryData.houseNumber }}
  </p>
  <p v-show="!store.temporaryData.houseNumber">
    <b>Hausnummer:</b> nicht vorhanden (Daten nicht genau zuweisbar)
  </p>

  <RouterLink class="router-link-next" :to="{ name: 'searchcategorie' }"> Weiter</RouterLink>
  <br />
</template>

<script>
import { storeData } from '@/stores/store.js'
import HomeButton from '@/components/HomeButton.vue'
import headerLogo from '@/components/headerLogo.vue'
import BackArrow from '@/components/BackArrow.vue'

export default {
  components: {
    HomeButton,
    headerLogo,
    BackArrow
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

.router-link-next {
  color: aliceblue;
  font-size: 20px;
  border: 2px solid aliceblue;
  border-radius: 5px;
  padding: 5px;
}
header {
  display: flex;
  justify-content: space-between;
}
.header-buttons {
  margin-left: 50px;
}
</style>
