<template>
  <h1 class="heading-login">Willkommen zurück</h1>
  <InputField
    class="input-login"
    :value="username"
    @input="onUsernameInput"
    placeholder="Benutzername eingeben"
    label
  ></InputField>

  <InputField class="input-login" :value="password" type="password" placeholder="Passwort eingeben">
    ></InputField
  >
  <NavButton class="button-login" :Navigation="'Login'"></NavButton>
</template>

<script>
import { storeData } from '@/stores/store.js'

import InputField from '@/components/InputField.vue'

import NavButton from '@/components/NavButton.vue'

export default {
  components: { InputField, NavButton },

  data() {
    return {
      store: storeData(),
      username: '',
      password: '',
      timeoutId: null
    }
  },

  created() {
    this.fetchUserDataFromAPI()
  },
  methods: {
    async fetchUserDataFromAPI() {
      try {
        await this.store.getUserDataFromAPI()
        const userData = this.store.temporaryData.currentUserData
        console.log('Benutzerdaten von der API:', userData)
      } catch (error) {
        console.error('Fehler beim Abrufen der Benutzerdaten:', error)
      }
    },
    async onUsernameInput(event) {
      this.username = event.target.value
      if (this.timeoutId !== null) {
        clearTimeout(this.timeoutId)
      }

      this.timeoutId = setTimeout(() => {
        this.checkUsername()
      }, 5000)
    },

    async checkUsername() {
      console.log(this.username)
      if (!this.username || this.username.trim() === '') {
        console.log('Ungültiger Benutzername')
        return
      }

      try {
        await this.fetchUserDataFromAPI()

        const userData = this.store.temporaryData.currentUserData

        const userExists = userData.some((user) => user.username === this.username)
        console.log(typeof this.username)
        if (userExists) {
          console.log('Benutzer vorhanden')
        } else {
          console.log('Benutzer nicht gefunden')
        }
      } catch (error) {
        console.error('Fehler beim Abrufen der Benutzerdaten:', error)
      }
    }
  }
}
</script>

<style>
.heading-login {
  align-self: flex-end;
  margin-top: 3rem;
  margin-right: 30px;
  text-align: right;
}
.input-login {
  background-color: var(--white);
  padding: 0.5rem;
  width: 90%;
  border-radius: 0.5rem;
  margin: 2rem;
  color: var(--black);
  border: 1px solid var(--black);
  align-self: center;
  min-height: 3rem;
}

.button-login {
  align-self: center;
}
</style>
