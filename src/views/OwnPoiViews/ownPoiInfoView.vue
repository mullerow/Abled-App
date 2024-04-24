<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'ownpoi' }"><BackArrow /></RouterLink>
    <RouterLink :to="{ name: 'home' }"> <headerLogo /></RouterLink>
  </div>

  <!--hier ggf
    <RouterLink :to="{ name: 'ownpoimap' }">ICON Erde</RouterLink> -->

  <HeadLine class="headline-ownpoiinfo" :Headline="'Informationen zum Poi'" />
  <div class="container" v-if="!editing">
    <div class="info-ownpoi">
      <h2 class="categorie-heading-ownpoiinfo">{{ poi.poiName }}</h2>
      <h3>Adresse</h3>
      <p>{{ poi.street }} {{ poi.number }}, {{ poi.zip }} {{ poi.city }}</p>
      <h3>Öffnungszeiten</h3>
      <p>{{ poi.openingTimes }}</p>
      <div v-if="poi.detailCategories.length > 0">
        <h3>Optional Categories</h3>
        <ul>
          <li v-for="category in poi.detailCategories" :key="category">{{ category }}</li>
        </ul>
      </div>
    </div>
    <RouterLink :to="{ name: 'home' }">
      <LöschenButton :Löschen="'Löschen'" @click="deletePoi"
    /></RouterLink>
    <NavButton :Navigation="'Bearbeiten'" @click="toggleEditing" />
  </div>

  <div class="container" v-else>
    <div class="input-field">
      <InputField placeholder="Adresse" ref="addressInput" type="text" id="address" />
    </div>
    <div class="input-field">
      <InputField placeholder="Öffnungszeiten" type="text" id="openingTimes" />
    </div>
    <h2>Zusatzkategorien auswählen</h2>
    <div v-for="categorie in store.localData.categories" :key="categorie.id">
      <div
        class="zusatz"
        v-if="poi.poiName.trim().toLowerCase() === categorie.categoryName.trim().toLowerCase()"
      >
        <CategorieButton
          v-for="detailCategorie in categorie.detailCategorys"
          :key="detailCategorie"
          :Kategorie="detailCategorie"
          @click="saveButtonValue(detailCategorie)"
          :id="detailCategorie"
        />
      </div>
    </div>
    <LöschenButton @click="saveChanges" :Löschen="'Speichern'" />
    <NavButton @click="cancelEditing" :Navigation="'Abbrechen'" />
  </div>
</template>

<script>
import { storeData } from '@/stores/store.js'
import headerLogo from '@/components/headerLogo.vue'
import NavButton from '@/components/NavButton.vue'
import LöschenButton from '@/components/LöschenButton.vue'
import InputField from '@/components/InputField.vue'
import CategorieButton from '@/components/CategorieButton.vue'
import HeadLine from '@/components/HeadLine.vue'
import BackArrow from '@/components/BackArrow.vue'

export default {
  components: {
    headerLogo,
    NavButton,
    LöschenButton,
    InputField,
    CategorieButton,
    HeadLine,
    BackArrow
  },
  data() {
    return {
      id: this.$route.params.id,
      store: storeData(),
      editing: false
    }
  },
  computed: {
    poi() {
      // Extrahiere die ID aus der URL
      const idFromUrl = this.$route.params.id

      // Suche den Poi in der Store-Datenstruktur basierend auf der extrahierten ID
      return this.store.temporaryData.ownPoisList.find((poi) => poi.id === idFromUrl) || {}
    }
  },
  methods: {
    toggleEditing() {
      this.editing = true

      localStorage.removeItem('ChangeOptionalCategories')
    },

    cancelEditing() {
      this.editing = false
    },

    saveButtonValue(detailCategorie) {
      let OptionalCategories = localStorage.getItem('ChangeOptionalCategories')
      OptionalCategories = OptionalCategories ? JSON.parse(OptionalCategories) : []
      const index = OptionalCategories.indexOf(detailCategorie)
      if (index !== -1) {
        OptionalCategories.splice(index, 1)
      } else {
        OptionalCategories.push(detailCategorie)
      }
      localStorage.setItem('ChangeOptionalCategories', JSON.stringify(OptionalCategories))
    },

    saveChanges() {
      // Speichere die Werte als Variablen
      const editedAddress = document.getElementById('address').value
      const editedOpeningTimes = document.getElementById('openingTimes').value
      const selectedCategories = JSON.parse(localStorage.getItem('ChangeOptionalCategories'))
      const PoiId = this.$route.params.id

      //console.log(this.poi.poiName)
      // Aktualisiere den Poi im Store
      this.store.temporaryData.changedPoiData = {
        ...this.store.temporaryData.changedPoiData,
        address: editedAddress,
        openingTimes: editedOpeningTimes,
        detailCategories: selectedCategories || [],
        poiName: this.poi.poiName,
        createdBy: JSON.parse(localStorage.getItem('currentUserID')),
        xCoordinates: this.poi.xCoordinates,
        yCoordinates: this.poi.yCoordinates,
        prioWidth: this.poi.priowidth,
        creationDate: this.poi.creationDate,
        comment: this.poi.comment,
        status: this.poi.status
      }
      // Aktualisiere den Poi in der API
      this.store.updatePoiAtAPI(PoiId)

      // Setze den Editing-Status zurück
      this.editing = false
    },

    deletePoi() {
      const PoiId = this.$route.params.id
      this.store.deletePoifromAPI(PoiId)
    }
  }
}
</script>

<style scoped>
.info {
  padding: 1rem;
  background-color: var(--white);
  color: var(--black);
  border-radius: 1rem;
  margin-top: 1rem;
  display: grid;
  margin: 1rem;
  align-items: center;
}

.container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.container {
  display: flex;
}

.input-field {
  width: 100%;
}
.zusatz {
  display: flex;
  flex-direction: column;
}

.categorie-button {
  width: 14.5rem;
}
.header-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: transparent;
}
.headline-ownpoiinfo {
  align-self: center;
}
.info-ownpoi {
  padding-left: 0.5rem;
  padding-top: 0.5rem;
  background-color: var(--white);
  color: var(--black);
  border-radius: 1rem;
  width: 95%;
  margin-top: 2rem;
  margin-bottom: 1rem;
  align-self: center;
}
.categorie-heading-ownpoiinfo {
  color: var(--red);
}
</style>
