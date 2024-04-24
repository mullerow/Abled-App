<template>
  <header>
    <!-- <headerLogo> </headerLogo> -->
    <div class="header-buttons">
      <RouterLink :to="{ name: 'home' }"> <BackArrow /></RouterLink>
      <RouterLink :to="{ name: 'home' }"> <headerLogo /></RouterLink>
    </div>
  </header>
  <HeadLine Headline="Wo möchtest du suchen?" class="headline"></HeadLine>
  <h3>SUCHRADIUS</h3>
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
  <NavButton Navigation="Bestimme meinen Standort" @click="store.getOwnPosition"></NavButton>
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

  <RouterLink :to="{ name: 'searchcategorie' }"
    ><NavButton Navigation="Weiter">Weiter</NavButton>
  </RouterLink>
</template>

<script>
import { storeData } from '@/stores/store.js'
// import HomeButton from '@/components/HomeButton.vue'
import headerLogo from '@/components/headerLogo.vue'
import BackArrow from '@/components/BackArrow.vue'
import NavButton from '@/components/NavButton.vue'
import HeadLine from '@/components/HeadLine.vue'

export default {
  components: {
    // HomeButton,
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
</style>
