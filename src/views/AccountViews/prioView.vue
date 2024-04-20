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
      <RouterLink :to="{ name: 'home' }"
        ><button @click="addUserAndNavigate">OK</button></RouterLink
      >
    </div>
  </div>
</template>

<script setup>
import { storeData } from '@/stores/store.js'
</script>

<script>
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
      this.showPopup = true
    },
    saveDataToLocalStorage() {
      const localUserData = JSON.parse(localStorage.getItem('userData')) || {}

      localUserData.mobilityAssistance = this.selectedMobilityAssistance
      localUserData.mobilityAssistanceWidth = this.mobilityAssistanceWidth

      localStorage.setItem('userData', JSON.stringify(localUserData))
    }
  },
  async addUserAndNavigate() {
    //Schritt 1 user daten laden
    this.loadUserDataFromLocalStorage()

    //erfolgreich?. dann
    if (!this.addingUser) {
      this.addingUser = true
      try {
        const localUserData = JSON.parse(localStorage.getItem('userData')) || {}

        // Schritt 2 User an API
        const response = await this.store.addNewUserToAPI(localUserData)
        console.log('API-Antwort:', response)

        // Schritt 3 User von API mit neuer ID
        const userDataFromAPI = await this.store.getUserDataFromAPI()

        if (response && response.id && userDataFromAPI) {
          // Schritt4  ID und User in local Storage
          this.saveUserIdToLocalStorage(response.id)
          localStorage.setItem('userData', JSON.stringify(userDataFromAPI))

          // Schritt 5 zur Landing Page
          this.$router.push({ name: 'home' })
        } else {
          console.error('Fehler: Ungültige API-Antwort')
        }
      } catch (error) {
        console.error('Fehler beim Hinzufügen des Benutzers:', error)
      } finally {
        //ladezustand ENDE
        this.addingUser = false
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
