<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
  </div>

  <RouterLink :to="{ name: 'register' }"> Register</RouterLink>

  <h2>Verwalte deine Account-Daten</h2>
  <label for="username">Username</label>
  <input
    class="input"
    type="text"
    id="username"
    v-model="userData.userName"
    :placeholder="userData.userName ? userData.userName : 'username'"
    :disabled="!editMode"
  />

  <label for="email">Email</label>
  <input
    class="input"
    type="email"
    id="email"
    v-model="userData.eMailAddress"
    :placeholder="userData.eMailAddress ? userData.eMailAddress : 'Email'"
  />
  <label for="password">Password</label>
  <input
    class="input"
    type="password"
    id="password"
    v-model="userData.passWord"
    :placeholder="userData.passWord ? userData.passWord : 'Passwort'"
  />
  <label for="mobilityAssistance">Mobility Assistance</label>
  <input
    class="input"
    type="text"
    id="mobilityAssistance"
    v-model="userData.mobilityAssistance"
    :placeholder="userData.mobilityAssistance ? userData.mobilityAssistance : 'mobility assistance'"
  />
  <label for="mobilityAssistanceWidth">Mobility Assistance Width</label>
  <input
    class="input"
    type="text"
    id="mobilityAssistanceWidth"
    v-model="userData.mobilityAssistanceWidth"
    :placeholder="
      userData.mobilityAssistanceWidth
        ? userData.mobilityAssistanceWidth
        : 'mobilityAssistance width'
    "
  />
  <LöschenButton :Löschen="'Account-Löschen'" @click="confirmDelete"></LöschenButton>
  <NavButton :Navigation="'Speichern'" @click="saveUserData"></NavButton>

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
      updatedUserData: {
        userName: '',
        eMailAddress: '',
        passWord: '',
        mobilityAssistance: '',
        mobilityAssistanceWidth: ''
      },
      userData: {
        eMailAddress: '',
        passWord: '',
        mobilityAssistance: '',
        mobilityAssistanceWidth: ''
      },
      showConfirmation: false
    }
  },

  created() {
    const id = '102'
    this.loadUserDataFromStoreAndSaveToLocal(id)
  },
  watch: {
    userData: {
      deep: true,
      handler(newValue) {
        console.log('Watcher getriggert.')
        console.log('New value for userData:', newValue)
        this.updateLocalStorage()
      }
    }
  },

  methods: {
    loadUserDataFromStoreAndSaveToLocal(id) {
      try {
        const user = this.store.userData.find((user) => user.id === parseInt(id))

        if (!user) {
          console.error(`Benutzer mit der ID ${id} wurde nicht gefunden.`)
          return
        }
        this.userData = user

        localStorage.setItem('userData', JSON.stringify(user))

        console.log(
          `Benutzerdaten des Benutzers mit der ID ${id} wurden erfolgreich in den localStorage hochgeladen.`
        )
      } catch (error) {
        console.error('Fehler beim Laden der Benutzerdaten aus dem Store:', error)
      }
    },
    updateLocalStorage() {
      localStorage.setItem('userData', JSON.stringify(this.userData))
    },

    saveUserDataToStore(userData) {
      try {
        const store = storeData()
        const userIndex = store.userData.findIndex((user) => user.id === userData.id)
        if (userIndex === -1) {
          console.error(`Benutzer mit der ID ${userData.id} wurde nicht gefunden.`)
          return
        }

        store.userData[userIndex] = { ...store.userData[userIndex], ...userData }
      } catch (error) {
        console.error('Fehler beim Aktualisieren der Benutzerdaten im Store:', error)
      }
    },
    saveUserData() {
      try {
        const storedUserData = JSON.parse(localStorage.getItem('userData'))

        if (!storedUserData) {
          console.error('Keine Benutzerdaten im lokalen Speicher gefunden.')
          return
        }

        this.saveUserDataToStore(storedUserData)
      } catch (error) {
        console.error('Fehler beim Speichern der Benutzerdaten:', error)
      }
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
label {
  display: none;
}
</style>
