<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
  </div>

  <RouterLink :to="{ name: 'register' }"> Register</RouterLink>

  <h2>Verwalte deine Account-Daten</h2>
  <label for="username">Bentuzername</label>
  <input
    class="input"
    type="text"
    id="username"
    v-model="updatedUserData.username"
    :placeholder="updatedUserData.username ? updatedUserData.username : 'username'"
    :disabled="!editMode"
  />

  <label for="email">E-mail</label>
  <input
    class="input"
    type="email"
    id="email"
    v-model="updatedUserData.email"
    :placeholder="updatedUserData.email ? updatedUserData.email : 'Email'"
  />

  <label for="password">Passwort</label>
  <input
    class="input"
    type="password"
    id="password"
    v-model="updatedUserData.password"
    :placeholder="updatedUserData.password ? updatedUserData.password : 'Passwort'"
  />
  <input
    class="input"
    type="text"
    id="mobilityAssistance"
    v-model="updatedUserData.mobilityAssistance"
    :placeholder="
      updatedUserData.mobilityAssistance
        ? updatedUserData.mobilityAssistance
        : 'mobility assistance'
    "
  />
  <label for="mobilityAssistanceWidth">Mobilitätshilfe Breite (in cm)</label>
  <input
    class="input"
    type="text"
    id="mobilityAssistanceWidth"
    v-model="updatedUserData.mobilityAssistanceWidth"
    :placeholder="
      updatedUserData.mobilityAssistanceWidth
        ? updatedUserData.mobilityAssistanceWidth
        : 'mobilityAssistance width'
    "
  />
  <LöschenButton :Löschen="'Account-Löschen'" @click="confirmDelete"></LöschenButton>
  <NavButton :Navigation="'Speichern'" @click="validateAndSaveUserData"></NavButton>

  <div v-if="showConfirmation" class="confirmation-popup">
    <div class="confirmation-message">
      <p>Sind Sie sicher, dass Sie den Account dauerhaft löschen möchten?</p>
      <button @click="deleteUser">Ja</button>
      <button @click="cancelDelete">Nein</button>
    </div>
  </div>
</template>

<script>
import { storeData } from '@/stores/store.js'

import NavButton from '@/components/NavButton.vue'
import HomeButton from '@/components/HomeButton.vue'
import LöschenButton from '@/components/LöschenButton.vue'

export default {
  components: { NavButton, HomeButton, LöschenButton },
  data() {
    return {
      store: storeData(),
      updatedUserData: JSON.parse(localStorage.getItem('updatedUserData')) || {
        username: '',
        email: '',
        password: '',
        mobilityAssistance: '',
        mobilityAssistanceWidth: parseInt('')
      },
      userData: {
        id: '',
        userName: '',
        eMailAddress: '',
        passWord: '',
        mobilityAssistance: '',
        mobilityAssistanceWidth: ''
      },
      currentUserID: localStorage.getItem('currentUserID').replace(/"/g, ''),
      showConfirmation: false
    }
  },

  created() {
    this.fetchAndFilterUserData()
  },

  watch: {
    updatedUserData: {
      deep: true,
      handler(newValue) {
        //console.log('New value for updatedUserData:', newValue)
        this.updateUserDataInLocalStorage(newValue)
      }
    }
  },

  methods: {
    //Schritt 1 holen der Userdaten von der API durch die hinterlegte ID im local Storage
    async fetchAndFilterUserData() {
      try {
        await this.store.getUserDataFromAPI()
        const currentUser = this.store.temporaryData.currentUserData.find((user) => {
          //console.log('User ID (API/Store.js):', user.id)
          //console.log('Current UserID (localStorage):', this.currentUserID)
          return user.id === this.currentUserID
        })
        //console.log('ausgabe der currentUserData', this.store.temporaryData.currentUserData)

        if (!currentUser) {
          console.error('Benutzer nicht gefunden.')
          return
        }

        this.userData = {
          id: currentUser.id,
          username: currentUser.username || '',
          email: currentUser.email || '',
          password: currentUser.password || '',
          mobilityAssistance: currentUser.mobilityAssistance || '',
          mobilityAssistanceWidth: parseInt(currentUser.mobilityAssistanceWidth) || 0
        }
        //console.log('Filtered User Data:', this.userData)
        //this.updateUserData()
      } catch (error) {
        console.error('Fehler beim Abrufen und Filtern der Benutzerdaten:', error)
      }
    },
    /*updateUserData() {
      try {
        localStorage.setItem('updatedUserData', JSON.stringify(this.userData))
        console.log('Benutzerdaten erfolgreich aktualisiert und im lokalen Speicher gespeichert.')
      } catch (error) {
        console.error('Fehler beim Aktualisieren und Speichern der Benutzerdaten:', error)
      }
    },*/
    //Validierungs Logik
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },
    validateAndTrimEmail() {
      const email = this.updatedUserData.email.trim()
      if (!this.isValidEmail(email)) {
        throw new Error('Ungültige E-Mail-Adresse')
      }
      this.userData.eMailAddress = email
    },
    trimOtherFields() {
      this.updatedUserData.password = this.updatedUserData.password.trim()
      this.updatedUserData.mobilityAssistance = this.updatedUserData.mobilityAssistance.trim()
      this.updatedUserData.mobilityAssistanceWidth =
        this.updatedUserData.mobilityAssistanceWidth.trim()
    },
    //Schritt 2: Update der Daten im Local Storage
    updateUserDataInLocalStorage(userData) {
      try {
        localStorage.setItem('updatedUserData', JSON.stringify(userData))
        console.log('Benutzerdaten erfolgreich im lokalen Speicher aktualisiert:', userData)
        //Aufruf temporäre Daten speichern
        //this.saveUserDataToTemporaryData()
      } catch (error) {
        console.error('Fehler beim Aktualisieren der Benutzerdaten im lokalen Speicher:', error)
      }
    },

    //Schritt 3: Daten an
    async saveUserDataAndSendToServer() {
      try {
        const updatedUserData = JSON.parse(localStorage.getItem('updatedUserData'))
        if (!updatedUserData) {
          console.error('Keine aktualisierten Benutzerdaten im lokalen Speicher gefunden.')
          return
        }
        this.store.temporaryData.changedUserData = {
          id: updatedUserData.id,
          username: updatedUserData.username || '',
          email: updatedUserData.email || '',
          mobilityAssistance: updatedUserData.mobilityAssistance || '',
          mobilityAssistanceWidth: parseInt(updatedUserData.mobilityAssistanceWidth) || 0,
          password: updatedUserData.password || ''
        }
        console.log(
          'Aktualisierte Benutzerdaten erfolgreich im temporären Speicher gespeichert:',
          this.store.temporaryData.changedUserData
        )
        await this.store.updateUserAtAPI(this.store.temporaryData.changedUserData.id)
      } catch (error) {
        console.error(
          'Fehler beim Speichern der aktualisierten Benutzerdaten im temporären Speicher:',
          error
        )
      }
    },

    validateAndSaveUserData() {
      try {
        //Validierungen werden aufgerufen
        this.validateAndTrimEmail(this.updatedUserData)
        this.trimOtherFields(this.updatedUserData)
        const updatedUserData = JSON.parse(localStorage.getItem('updatedUserData'))

        if (!updatedUserData) {
          console.error('Keine aktualisierten Benutzerdaten im lokalen Speicher gefunden.')
          return
        }

        this.saveUserDataAndSendToServer(updatedUserData)
      } catch (error) {
        console.error('Fehler beim Speichern der Benutzerdaten:', error)
      }
      console.log('temporäre Daten:', this.store.temporaryData.changedUserData)
    },

    confirmDelete() {
      this.showConfirmation = true
    },
    deleteUser() {
      const userId = this.userData.id
      try {
        const userIndex = this.store.userData.findIndex((user) => user.id === userId)
        if (userIndex !== -1) {
          this.store.userData.splice(userIndex, 1)

          const isUserDeleted = this.store.userData.findIndex((user) => user.id === userId) === -1
          if (isUserDeleted) {
            console.log('Benutzer erfolgreich gelöscht.')
          } else {
            console.error('Fehler: Benutzer wurde nicht gelöscht.')
          }
        } else {
          console.error('Benutzer nicht gefunden.')
        }
      } catch (error) {
        console.error('Fehler beim Löschen des Benutzers:', error)
      }

      this.showConfirmation = false
    }
  }
}
</script>

<style>
.confirmation-popup {
  position: fixed;
  width: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--white);
  padding: 20px;
  border: 4px solid var(--black);
  z-index: 9999;
}
.input {
  padding: 0.5rem;
  width: 80%;
  background-color: var(--white);
  border-radius: 0.5rem;
  margin: 2rem;
  color: darkgray;
}
</style>
