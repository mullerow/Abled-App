<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
    <RouterLink :to="{ name: 'newpoiaddressinput' }"> <BackArrow /></RouterLink>
  </div>

  <h2>Optionale Infos</h2>
  <InputField value="Gib Öffnungszeiten ein" id="openingTimesInput" />
  <InputField value="Gib eine Zugangsbreite ein" id="minWidthInput" />
  <InputField value="Füge einen Kommentar hinzu" id="comment" />
  <LöschenButton Löschen="Nicht nutzbar" />
  <categorie-button Kategorie="Abbrechen" />
  <NavButton Navigation="Erstellen" @click="saveNewPoi()" />
</template>

<script>
import HomeButton from '@/components/HomeButton.vue'
import BackArrow from '@/components/BackArrow.vue'
import NavButton from '@/components/NavButton.vue'
import CategorieButton from '@/components/CategorieButton.vue'
import InputField from '@/components/InputField.vue'
import LöschenButton from '@/components/LöschenButton.vue'
import { storeData } from '@/stores/store.js'

export default {
  components: {
    HomeButton,
    BackArrow,
    NavButton,
    CategorieButton,
    InputField,
    LöschenButton
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
      let XKoordinate = localStorage.getItem('x-Koordinate')
      let YKoordinate = localStorage.getItem('y-Koordinate')
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
