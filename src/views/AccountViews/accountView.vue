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
  <LöschenButton :Löschen="'Account-Löschen'" @click="deleteUserData"></LöschenButton>
  <NavButton :Navigation="'Speichern'" @click="saveUserData"></NavButton>
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
      }
    }
  },
  created() {
    const id = '101'
    this.loadUserDataFromStoreAndSaveToLocal(id)
  },
  //Watcher
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
      //lädt User in local Storage
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
      console.log('Update Local Storage ausgeführt.')
      localStorage.setItem('userData', JSON.stringify(this.userData))
    }

    //saveUserData(id) {},
    //deleteUserData(id) {}
  }
}
</script>
