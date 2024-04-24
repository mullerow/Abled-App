<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'newpoiaddressinput' }"> <BackArrow /></RouterLink>
    <RouterLink :to="{ name: 'home' }"> <headerLogo /></RouterLink>
  </div>

  <div class="container">
    <HeadLine :Headline="'Trage weitere Informationen ein'" />

    <InputField
      class="input-newpoi"
      placeholder="Gib Öffnungszeiten ein"
      value=""
      id="openingTimesInput"
    />

    <InputField
      class="input-newpoi"
      placeholder="Gib eine Zugangsbreite ein"
      value=""
      id="minWidthInput"
    />

    <InputField
      class="input-newpoi"
      placeholder="Füge einen Kommentar hinzu"
      value=""
      id="comment"
    />
    <LöschenButton Löschen="Nicht nutzbar" />
    <RouterLink :to="{ name: 'home' }"> <NavButton Navigation="Abbrechen" /></RouterLink>
    <RouterLink :to="{ name: 'home' }">
      <NavButton Navigation="Erstellen" @click="saveNewPoi()"
    /></RouterLink>
  </div>
</template>

<script>
import headerLogo from '@/components/headerLogo.vue'
import BackArrow from '@/components/BackArrow.vue'
import NavButton from '@/components/NavButton.vue'
import InputField from '@/components/InputField.vue'
import LöschenButton from '@/components/LöschenButton.vue'
import { storeData } from '@/stores/store.js'
import HeadLine from '@/components/HeadLine.vue'

export default {
  components: {
    headerLogo,
    BackArrow,
    NavButton,
    InputField,
    LöschenButton,
    HeadLine
  },

  data() {
    return {
      store: storeData()
    }
  },

  methods: {
    saveNewPoi() {
      let category = localStorage.getItem('buttonValue')
      let newdetailCategories = JSON.parse(localStorage.getItem('OptionalCategories'))
      let openingTimes = document.getElementById('openingTimesInput').value
      let minWidth = document.getElementById('minWidthInput').value
      let comment = document.getElementById('comment').value
      let creationDate = new Date()
      let XKoordinate = Number(localStorage.getItem('x-Koordinate'))
      let YKoordinate = Number(localStorage.getItem('y-Koordinate'))
      let userID = JSON.parse(localStorage.getItem('currentUserID'))
      let street = this.store.temporaryData.street
      let number = this.store.temporaryData.houseNumber
      let zip = this.store.temporaryData.zipCode
      let city = this.store.temporaryData.city

      this.store.temporaryData.newPoiData = {
        poiName: category,
        detailCategories: newdetailCategories,
        xCoordinates: XKoordinate,
        yCoordinates: YKoordinate,
        status: true,
        minWidth: minWidth,
        openingTimes: openingTimes,
        prioWidth: minWidth,
        creationDate: creationDate,
        createdBy: userID,

        currentSearchDistance: 0,
        comment: comment,
        street: street,
        number: number,
        zip: zip,
        city: city
      }
      this.store.addNewPoiToAPI()
      localStorage.removeItem('buttonValue')
      localStorage.removeItem('OptionalCategories')
      localStorage.removeItem('x-Koordinate')
      localStorage.removeItem('y-Koordinate')
    }
  }
}
</script>

<style scoped>
.header-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: transparent;
}
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.input-newpoi {
  color: black;
}
</style>
