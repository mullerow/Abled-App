<template>
  <header>
    <!-- <headerLogo> </headerLogo> -->
    <div class="header-buttons">
      <RouterLink :to="{ name: 'home' }"> <BackArrow /></RouterLink>
      <RouterLink :to="{ name: 'home' }"> <headerLogo /></RouterLink>
    </div>
  </header>
  <HeadLine Headline="Wo möchtest du suchen?" class="headline"></HeadLine>
  <h3 class="search-radius-input-header">SUCHRADIUS</h3>
  <input
    type="range"
    min="50"
    max="3000"
    step="50"
    value="500"
    name="rangeInput"
    id="idRangeInput"
  />
  <label for="rangeInput" class="search-radius-label"
    >Reichweite {{ store.temporaryData.searchDistance }} m</label
  >
  <NavButton
    Navigation="Bestimme meinen Standort"
    @click="store.getOwnPosition"
    class="router-link"
  ></NavButton>
  <br />
  <div class="location-info-container">
    <h3 class="current-location-info">Sie befinden sich hier:</h3>
    <p class="current-location-info"><b>Stadt:</b> {{ store.temporaryData.city }}</p>
    <p class="current-location-info"><b>Stadteil:</b> {{ store.temporaryData.district }}</p>
    <p class="current-location-info"><b>Straße:</b> {{ store.temporaryData.street }}</p>
    <p class="current-location-info"><b>Postleitzahl:</b> {{ store.temporaryData.zipCode }}</p>
    <p v-show="store.temporaryData.houseNumber" class="current-location-info">
      <b>Hausnummer:</b> {{ store.temporaryData.houseNumber }}
    </p>
    <p v-show="!store.temporaryData.houseNumber" class="current-location-info">
      <b>Hausnummer:</b> nicht vorhanden (Daten nicht genau zuweisbar)
    </p>
  </div>

  <RouterLink :to="{ name: 'searchcategorie' }" class="router-link"
    ><NavButton Navigation="Weiter">Weiter</NavButton>
  </RouterLink>
</template>

<script>
import { storeData } from '@/stores/store.js'
import headerLogo from '@/components/headerLogo.vue'
import BackArrow from '@/components/BackArrow.vue'
import NavButton from '@/components/NavButton.vue'
import HeadLine from '@/components/HeadLine.vue'

export default {
  components: {
    headerLogo,
    BackArrow,
    NavButton,
    HeadLine
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

.header-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: transparent;
}

.headline {
  width: 100%;
}
.router-link {
  align-self: center;
}
#idRangeInput {
  width: 40%;
  margin-left: 30%;
}
.search-radius-label {
  margin-left: 30%;
}
.search-radius-input-header {
  margin-left: 30%;
}
.current-location-info {
  margin-left: 15px;
}
.location-info-container {
  margin-left: auto;
  margin-right: auto;
  background-color: var(--white);
  color: var(--black);
  border-radius: 16px;
}
</style>
