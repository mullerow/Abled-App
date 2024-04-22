<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
  </div>

  <!--hier ggf
    <RouterLink :to="{ name: 'ownpoimap' }">ICON Erde</RouterLink> -->
  <RouterLink :to="{ name: 'ownpoi' }">Zurück</RouterLink>
  <h2>Own Poi Info</h2>

  <div v-if="!editing">
    <div class="info">
      <h2>{{ poi.poiName }}</h2>
      <h3>Koordinaten</h3>
      <p>{{ poi.xCoordinates }}, {{ poi.yCoordinates }}</p>
      <h3>Adresse</h3>
      <p>{{ poi.street }} {{ poi.number }}, {{ poi.zip }} {{ poi.city }}</p>
      <h3>Öffnungszeiten</h3>
      <p>{{ poi.openingTimes }}</p>
      <div v-if="poi.detailCategories.length > 0">
        <p>Optional Categories:</p>
        <ul>
          <li v-for="category in poi.detailCategories" :key="category">{{ category }}</li>
        </ul>
      </div>
    </div>
    <LöschenButton :Löschen="'Löschen'" />
    <NavButton :Navigation="'Bearbeiten'" @click="toggleEditing" />
  </div>

  <div v-else>
    <div class="input-field">
      <HeadLine :Headline="'Adresse'" />
      <InputField ref="addressInput" type="text" id="address" v-model="editedPoi.address" />
    </div>
    <div class="input-field">
      <HeadLine :Headline="'Öffnungszeiten'" />
      <InputField
        ref="openingTimesInput"
        type="text"
        id="openingTimes"
        v-model="editedPoi.openingTimes"
      />
    </div>
    <HeadLine :Headline="'Zusatz'" />
    <div v-for="categorie in store.localData.categories" :key="categorie.id">
      <div v-if="poi.poiName.trim().toLowerCase() === categorie.categoryName.trim().toLowerCase()">
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
import HomeButton from '@/components/HomeButton.vue'
import NavButton from '@/components/NavButton.vue'
import LöschenButton from '@/components/LöschenButton.vue'
import InputField from '@/components/InputField.vue'
import CategorieButton from '@/components/CategorieButton.vue'
import HeadLine from '@/components/HeadLine.vue'

export default {
  components: {
    HomeButton,
    NavButton,
    LöschenButton,
    InputField,
    CategorieButton,
    HeadLine
  },
  data() {
    return {
      id: this.$route.params.id,
      store: storeData(),
      editing: false,
      editedPoi: {
        address: '',
        openingTimes: '',
        detailCategories: []
      }
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

      this.editedPoi = {
        address: this.$refs.addressInput.value,
        openingTimes: this.$refs.openingTimesInput.value,
        detailCategories: this.poi.detailCategories
      }
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
      // Save optional categories from local storage
      const selectedCategories = JSON.parse(localStorage.getItem('OptionalCategories'))
      this.editedPoi.detailCategories = selectedCategories ? selectedCategories : []

      console.log(this.editedPoi)
      // Save the editedPoi object to local storage
      localStorage.setItem('editedPoi', JSON.stringify(this.editedPoi))

      // Reset editing state
      this.editing = false
    }
  }
}
</script>

<style>
.info {
  padding: 1rem;
  background-color: var(--white);
  color: var(--black);
  border-radius: 1rem;
  width: 70%;
  margin-top: 1rem;
  display: grid;
  margin: 2rem;
}
</style>
