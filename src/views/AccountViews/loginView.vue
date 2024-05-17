<template>
  <h1 class="heading-login">Willkommen zurück</h1>
  <InputField
    class="input-login"
    :value="username"
    @input="onUsernameInput"
    placeholder="Benutzername eingeben"
    label
  ></InputField>

  <InputField
    class="input-login"
    :value="password"
    @input="onPasswordInput"
    type="password"
    placeholder="Passwort eingeben"
  >
    ></InputField
  >
  <NavButton
    :disabled="!isValidPassword"
    class="button-login"
    :Navigation="'Login'"
    @click="login"
  ></NavButton>

  <div v-if="showPopup" class="popup-login">
    <div class="popup-content">
      <p>{{ popupMessage }}</p>
      <button @click="closePopup">{{ popupButtonLabel }}</button>
    </div>
  </div>
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
      timeoutId: null,
      showPopup: false,
      popupMessage: '',
      popupButtonLabel: 'OK',
      isValidPassword: false
    }
  },

  methods: {
    async fetchUserDataFromAPI() {
      try {
        await this.store.getUserDataFromAPI()
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
      }, 4000)
    },
    async onPasswordInput(event) {
      this.password = event.target.value
      if (this.passwordTimeoutId !== null) {
        clearTimeout(this.passwordTimeoutId)
      }

      this.passwordTimeoutId = setTimeout(() => {
        this.checkPassword()
      }, 4000)
    },

    async checkUsername() {
      if (!this.username || this.username.trim() === '') {
        console.log('Ungültiger Benutzername')
        return
      }

      try {
        await this.fetchUserDataFromAPI()

        const userData = this.store.temporaryData.currentUserData

        const user = userData.find((user) => user.username === this.username)
        if (!user) {
          this.showPopup = true
          this.popupMessage = 'Benutzername existiert nicht'
          return
        }
        localStorage.setItem('currentUserID', user.id)
      } catch (error) {
        console.error('Fehler beim Abrufen der Benutzerdaten:', error)
      }
    },
    async checkPassword() {
      if (!this.password || this.password.trim() === '') {
        this.showPopup = true
        this.popupMessage = 'Falsches Passwort'
        return
      }

      try {
        await this.fetchUserDataFromAPI()
        const userData = this.store.temporaryData.currentUserData

        const user = userData.find((user) => user.username === this.username)
        if (user && user.password === this.password) {
          this.isValidPassword = true
        } else {
          this.showPopup = true
          this.popupMessage = 'Falsches Passwort'
        }
      } catch (error) {
        console.error('Fehler beim Überprüfen des Passworts:', error)
      }
    },

    async login() {
      const user = this.store.temporaryData.currentUserData.find(
        (user) => user.username === this.username
      )
      localStorage.setItem('currentUserID', JSON.stringify(user.id))
      this.$router.push({ name: 'home' })
    },
    closePopup() {
      this.showPopup = false
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

.popup-login {
  color: var(--red);
  position: fixed;
  width: 40%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--black);
  padding: 20px;
  border: 4px solid var(--black);
  border-radius: 1rem;
  z-index: 9999;
}

.popup-content {
  background-color: var(--white);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px var(--black);
}

.popup button {
  margin-top: 10px;
}
</style>
