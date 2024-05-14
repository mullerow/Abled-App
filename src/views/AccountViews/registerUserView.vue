<template>
  <img
    class="logo-img-register"
    src="/src/assets/images/final_logo_comprimized.png"
    alt="Logo der App"
  />
  <h1 class="heading-register">
    Willkommen <br />
    bei <br />
    Abled
  </h1>
  <InputField
    class="input-register"
    :value="username"
    @input="updateUsername($event.target.value)"
    @blur="checkUsernameDuplicate"
    placeholder="Benutzername eingeben"
    label
  >
    ></InputField
  >
  <InputField
    class="input-register"
    :value="email"
    @input="updateEmail($event.target.value)"
    @change="checkEmailValidity"
    placeholder="E-Mail-Adresse eingeben"
  >
    ></InputField
  >
  <InputField
    class="input-register"
    :value="password"
    @input="updatePassword($event.target.value)"
    type="password"
    placeholder="Passwort eingeben"
  >
    ></InputField
  >
  <NavButton class="button-register" :Navigation="'Registrieren'" @click="registerUser"></NavButton>

  <div v-if="showPopup" class="popup-mail">
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
  components: {
    InputField,
    NavButton
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      userCounter: 3,
      showPopup: false,
      usernameExists: false,
      popupMessage: '',
      popupButtonLabel: 'OK'
    }
  },
  methods: {
    async getUserData() {
      try {
        await storeData.getUserDataFromAPI()
        console.log(
          'Benutzerdaten erfolgreich vom Server abgerufen:',
          storeData.temporaryData.currentUserData
        )
      } catch (error) {
        console.error('Fehler beim Abrufen der Benutzerdaten:', error)
      }
    },
    updateUsername(value) {
      this.username = value
    },
    updateEmail(value) {
      this.email = value
    },
    updatePassword(value) {
      this.password = value
      const passwordValidation = this.validatePassword(value)
      if (!passwordValidation.valid) {
        this.showPopupWithMessage(passwordValidation.message)
      }
    },
    validateEmail(email) {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      return regex.test(email)
    },
    showPopupWithMessage(message) {
      this.popupMessage = message
      this.showPopup = true
    },

    checkInputValidity() {
      if (!this.validateEmail(this.email)) {
        this.showPopupWithMessage('Ungültige E-Mail-Adresse.')
        return false
      }

      if (!this.username.trim()) {
        this.showPopupWithMessage('Benutzername darf nicht leer sein.')
        return false
      }
    },
    showUsernameTakenPopup() {
      this.showPopup = true
      this.popupMessage = 'Der Benutzername ist bereits vergeben.'
    },

    showEmailInvalidPopup() {
      this.popupMessage =
        'Ungültige E-Mail-Adresse. Bitte geben Sie eine gültige E-Mail-Adresse ein.'
      this.showPopup = true
      this.popupButtonLabel = 'OK'
    },

    checkUsernameDuplicate() {
      const store = storeData() // Rufe das Store-Objekt auf
      store
        .getUserDataFromAPI() // Rufe die Methode vom Store-Objekt auf
        .then(() => {
          const userData = store.temporaryData.currentUserData // Erhalte die Benutzerdaten
          const usernameExists = userData.some((user) => user.username === this.username) // Prüfe auf vorhandenen Benutzernamen

          this.usernameExists = usernameExists

          if (this.usernameExists) {
            this.showUsernameTakenPopup()
          }
        })
        .catch((error) => {
          console.error('Fehler beim Überprüfen des Benutzernamens:', error)
        })
    },
    registerUser() {
      if (!this.username.trim() || !this.email.trim() || !this.password.trim()) {
        console.error('Bitte füllen Sie alle Felder aus.')
        return
      }
      if (!this.validateEmail(this.email)) {
        this.showPopup = true
        return
      }
      this.checkUsernameDuplicate()

      //const userID = this.generateUserID()
      const userData = {
        //id: userID,
        username: this.username,
        email: this.email,
        password: this.password
      }

      localStorage.setItem('userData', JSON.stringify(userData))

      this.goToPrio()
    },
    validatePassword(password) {
      if (password.length < 8) {
        return {
          valid: false,
          message: 'Das Passwort muss mindestens 8 Zeichen lang sein.'
        }
      }

      const specialCharacters = /[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]+/
      if (!specialCharacters.test(password)) {
        return {
          valid: false,
          message: 'Das Passwort muss mindestens ein Sonderzeichen enthalten.'
        }
      }

      const numbers = /\d/
      if (!numbers.test(password)) {
        return {
          valid: false,
          message: 'Das Passwort muss mindestens eine Zahl enthalten.'
        }
      }

      const uppercaseLetters = /[A-Z]/
      if (!uppercaseLetters.test(password)) {
        return {
          valid: false,
          message: 'Das Passwort muss mindestens einen Großbuchstaben enthalten.'
        }
      }

      const lowercaseLetters = /[a-z]/
      if (!lowercaseLetters.test(password)) {
        return {
          valid: false,
          message: 'Das Passwort muss mindestens einen Kleinbuchstaben enthalten.'
        }
      }

      return {
        valid: true,
        message: 'Das Passwort ist gültig.'
      }
    },
    goToPrio() {
      this.$router.push({ name: 'prio' })
    },
    closePopup() {
      this.showPopup = false
    },
    checkEmailValidity() {
      if (!this.validateEmail(this.email)) {
        this.showEmailInvalidPopup()
        return
      }
    }
  }
}
</script>

<style>
.input-register {
  padding: 0.5rem;
  width: 90%;
  background-color: var(--white);
  border-radius: 0.5rem;
  margin: 2rem;
  color: var(--black);
  border: 1px solid var(--black);
  align-self: center;
  min-height: 3rem;
}

.logo-img-register {
  width: 50%;
  max-width: 300px;
  margin-top: 2rem;
  margin-right: 10px;
  border-radius: 40% 0px 0px 10px;
  align-self: flex-end;
}
.heading-register {
  align-self: flex-end;
  margin-top: 3rem;
  margin-right: 30px;
  text-align: right;
}
.button-register {
  align-self: center;
}

.popup-mail {
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

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
