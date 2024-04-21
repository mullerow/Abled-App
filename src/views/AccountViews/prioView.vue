<template>
  <h1>Wähle deine Mobilitätshilfe</h1>
  <PriorityButton
    v-for="mobilityAssistanceClass in store.localData.mobilityAssistanceClasses"
    :key="mobilityAssistanceClass"
    :priority="mobilityAssistanceClass"
    @click="selectMobilityAssistance(mobilityAssistanceClass)"
  />
  <label class="label" for="mobilityAssistanceWidth">Mobilitätshilfe Breite</label>
  <input
    class="input"
    type="number"
    id="mobilityAssistanceWidth"
    v-model="mobilityAssistanceWidth"
    :placeholder="'Breite in cm'"
  />
  <NavButton Navigation="Weiter" @click="saveDataAndOpenPopup" />

  <div v-if="showPopup" class="popup">
    <div class="popup-content">
      <p>Dein Account wird angelegt.</p>
      <button @click="addUserAndNavigate">OK</button>
      <RouterLink :to="{ name: 'home' }"></RouterLink>
    </div>
  </div>
</template>

<script>
import { storeData } from '@/stores/store.js'
import PriorityButton from '@/components/PriorityButton.vue'
import NavButton from '@/components/NavButton.vue'

export default {
  components: { PriorityButton, NavButton },
  data() {
    return {
      store: storeData(),
      selectedMobilityAssistance: '',
      mobilityAssistanceWidth: '',
      showPopup: false,
      addingUser: false,
      loading: false
    }
  },

  methods: {
    selectMobilityAssistance(mobilityAssistanceClass) {
      this.selectedMobilityAssistance = mobilityAssistanceClass
    },
    saveDataAndOpenPopup() {
      this.saveDataToLocalStorage()
      this.loadUserDataToTemporaryData()
      this.showPopup = true
    },
    saveDataToLocalStorage() {
      const localUserData = JSON.parse(localStorage.getItem('userData')) || {}

      localUserData.mobilityAssistance = this.selectedMobilityAssistance
      localUserData.mobilityAssistanceWidth = this.mobilityAssistanceWidth

      localStorage.setItem('userData', JSON.stringify(localUserData))
    },
    loadUserDataToTemporaryData() {
      try {
        // Schritt 1: Benutzerdaten aus dem lokalen Speicher laden
        const localUserData = JSON.parse(localStorage.getItem('userData')) || {}

        // Schritt 2: Benutzerdaten in temporäre Daten im Store setzen
        this.store.temporaryData.newUserData = {
          id: '',
          username: localUserData.username || '',
          email: localUserData.email || '',
          mobilityAssistance: localUserData.mobilityAssistance || '',
          mobilityAssistanceWidth: localUserData.mobilityAssistanceWidth || '',
          password: localUserData.password || ''
        }

        console.log(
          'Benutzerdaten erfolgreich in temporäre Daten geladen:',
          this.store.temporaryData.newUserData
        )
      } catch (error) {
        console.error('Fehler beim Laden der Benutzerdaten in temporäre Daten:', error)
      }
    },

    async addUserAndNavigate() {
      try {
        // Schritt 1: Benutzerdaten aus dem lokalen Speicher laden
        const localUserData = JSON.parse(localStorage.getItem('userData')) || {}

        // Schritt 2: Benutzerdaten in temporäre Daten im Store setzen
        this.store.temporaryData.newUserData = localUserData

        // Schritt 3: Benutzer an die API senden und auf Antwort warten
        await this.store.addNewUserToAPI()

        // Schritt 4: Benutzerdaten von der API abrufen
        //const data =
        await this.store.getUserDataFromAPI()

        console.log('Daten von der API erhalten:', this.store.temporaryData.currentUser)

        //speichern von der API im lokalen Speicher
        //this.store.temporaryData.currentUser
        //console.log('Aktuelle Benutzerdaten:', currentUser)
        localStorage.setItem(
          'currentUserID',
          JSON.stringify(
            this.store.temporaryData.currentUser[this.store.temporaryData.currentUser.length - 1].id
          )
        )

        // Schritt 5: Weiterleitung zur Landing Page
        this.$router.push({ name: 'home' })
      } catch (error) {
        console.error('Fehler beim Hinzufügen des Benutzers:', error)
      }
    }
  }
}
</script>

<style>
.input {
  padding: 0.5rem;
  width: 80%;
  background-color: var(--white);
  border-radius: 0.5rem;
  margin: 1rem;
  color: darkgray;
}
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--black);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: var(--white);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px var(--black);
}
</style>
