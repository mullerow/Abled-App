<template>
  <BackgroundGradient />
  <div class="header-buttons header-buttons-account">
    <RouterLink :to="{ name: 'home' }"> <headerLogo /></RouterLink>
  </div>

  <HeadLine class="headline-account" :Headline="'Verwalte deinen Account'" />
  <div class="form-group">
    <label class="label-username label-account" for="username">Benutzername</label>
    <input
      class="input-account"
      type="text"
      id="username"
      v-model="updatedUserData.username"
      :placeholder="updatedUserData.username ? updatedUserData.username : 'username'"
      :disabled="!editMode"
    />
  </div>

  <div class="form-group">
    <label class="label-account" for="email">E-mail</label>
    <input
      class="input-account"
      type="email"
      id="email"
      v-model="updatedUserData.email"
      :placeholder="updatedUserData.email ? updatedUserData.email : 'Email'"
      :class="{ 'invalid-email': !emailValid }"
    />
  </div>

  <div class="form-group">
    <label class="label-account" for="password">Passwort</label>
    <input
      class="input-account"
      type="password"
      id="password"
      v-model="updatedUserData.password"
      @focus="showPasswordConditions = true"
      @input="updatePasswordConditions"
      @blur="closePasswordConditions"
      :placeholder="updatedUserData.password ? updatedUserData.password : 'Passwort'"
    />
  </div>

  <div v-show="showPasswordConditions" class="password-conditions form-group">
    <ul class="password-conditions-list">
      <li v-for="condition in passwordConditions" :key="condition.condition">
        <span
          :class="{
            condition: condition.fulfilled,
            'condition-unfulfilled': !condition.fulfilled
          }"
          >{{ condition.condition }}</span
        >: <span v-if="condition.fulfilled">&#10004;</span
        ><span v-if="!condition.fulfilled" class="cross">&#10006;</span>
      </li>
    </ul>
  </div>

  <div class="form-group">
    <label class="label-account" for="mobilityAssistance">Mobilitätshilfe</label>
    <input
      class="input-account"
      type="text"
      id="mobilityAssistance"
      v-model="updatedUserData.mobilityAssistance"
      :placeholder="
        updatedUserData.mobilityAssistance
          ? updatedUserData.mobilityAssistance
          : 'mobility assistance'
      "
    />
  </div>

  <div class="form-group">
    <label class="label-account" for="mobilityAssistanceWidth"
      >Mobilitätshilfe Breite (in cm)</label
    >
    <input
      class="input-account"
      type="text"
      id="mobilityAssistanceWidth"
      v-model="updatedUserData.mobilityAssistanceWidth"
      :placeholder="
        updatedUserData.mobilityAssistanceWidth
          ? updatedUserData.mobilityAssistanceWidth
          : 'mobilityAssistance width'
      "
    />
  </div>

  <NavButton
    class="button-account"
    :Navigation="'Speichern'"
    @click="validateAndSaveUserData"
  ></NavButton>

  <LöschenButton
    class="button-account"
    :Löschen="'Account-Löschen'"
    @click="confirmDelete"
  ></LöschenButton>
  <NavButton class="button-account" :Navigation="'Logout'" @click="logout"></NavButton>

  <div v-if="showConfirmation" class="confirmation-popup">
    <div class="confirmation-message">
      <p>Sind Sie sicher, dass Sie den Account dauerhaft löschen möchten?</p>
      <div class="confirmation-buttons">
        <button class="button-confirmation button-delete" @click="deleteUser">Ja</button>
        <button class="button-confirmation button-cancel" @click="cancelDelete">Nein</button>
      </div>
    </div>
  </div>

  <div v-if="showEmailErrorPopup" class="email-popup">
    <p>Ungültige E-Mail-Adresse. Bitte geben Sie eine gültige E-Mail-Adresse ein.</p>
    <button class="button-confirmation popup-mail-button" @click="closeEmailErrorPopup">OK</button>
  </div>
</template>

<script>
import { storeData } from '@/stores/store.js'
import HeadLine from '@/components/HeadLine.vue'
import NavButton from '@/components/NavButton.vue'
import headerLogo from '@/components/headerLogo.vue'
import LöschenButton from '@/components/LöschenButton.vue'
import BackgroundGradient from '@/components/BackgroundGradient.vue'

export default {
  components: { NavButton, headerLogo, LöschenButton, HeadLine, BackgroundGradient },
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
      showConfirmation: false,
      emailValid: true,
      showEmailErrorPopup: false,
      showPasswordConditions: false,
      passwordConditions: [
        { condition: 'Mindestens 8 Zeichen lang', fulfilled: false },
        { condition: 'Mindestens ein Sonderzeichen', fulfilled: false },
        { condition: 'Mindestens eine Zahl', fulfilled: false },
        { condition: 'Mindestens ein Großbuchstabe', fulfilled: false },
        { condition: 'Mindestens ein Kleinbuchstabe', fulfilled: false }
      ]
    }
  },

  created() {
    this.fetchAndFilterUserData()
  },

  watch: {
    updatedUserData: {
      deep: true,
      handler(newValue) {
        this.updateUserDataInLocalStorage(newValue)
      }
    }
  },

  methods: {
    async fetchAndFilterUserData() {
      try {
        await this.store.getUserDataFromAPI()
        const currentUser = this.store.temporaryData.currentUserData.find((user) => {
          return user.id === this.currentUserID
        })

        if (!currentUser) {
          console.error('Benutzer nicht gefunden.')
          return
        }

        this.updatedUserData = {
          id: currentUser.id,
          username: currentUser.username || '',
          email: currentUser.email || '',
          password: currentUser.password || '',
          mobilityAssistance: currentUser.mobilityAssistance || '',
          mobilityAssistanceWidth: parseInt(currentUser.mobilityAssistanceWidth) || 0
        }
      } catch (error) {
        console.error('Fehler beim Abrufen und Filtern der Benutzerdaten:', error)
      }
    },

    isValidEmail(email) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      return emailRegex.test(email)
    },
    validateAndTrimEmail() {
      const email = this.updatedUserData.email.trim()
      if (!this.isValidEmail(email)) {
        this.showEmailErrorPopup = true
        this.emailValid = false
        return
      }
      this.emailValid = true
      this.userData.eMailAddress = email
    },

    closeEmailErrorPopup() {
      this.showEmailErrorPopup = false
    },
    trimOtherFields() {
      this.updatedUserData.password = this.updatedUserData.password.trim()
      this.updatedUserData.mobilityAssistance = this.updatedUserData.mobilityAssistance.trim()
    },
    updateUserDataInLocalStorage(userData) {
      try {
        localStorage.setItem('updatedUserData', JSON.stringify(userData))
      } catch (error) {
        console.error('Fehler beim Aktualisieren der Benutzerdaten im lokalen Speicher:', error)
      }
    },

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
    },

    confirmDelete() {
      this.showConfirmation = true
    },
    async deleteUser() {
      const userId = localStorage.getItem('currentUserID').replace(/"/g, '')

      try {
        await this.store.deleteUserfromAPI(userId)
        localStorage.removeItem('updatedUserData')
        localStorage.removeItem('currentUserID')
        this.$router.push({ name: 'register' })
      } catch (error) {
        console.error('Fehler beim Löschen des Benutzers:', error)
      }
      this.showConfirmation = false
    },
    cancelDelete() {
      this.showConfirmation = false
    },
    logout() {
      try {
        localStorage.removeItem('updatedUserData')
        localStorage.removeItem('currentUserID')
        this.$router.push({ name: 'login' })
      } catch (error) {
        console.error('Fehler beim Ausloggen:', error)
      }
    },
    updatePasswordConditions() {
      const password = this.updatedUserData.password
      this.passwordConditions[0].fulfilled = password.length >= 8
      this.passwordConditions[1].fulfilled = /[!@#$%^&*(),.?":{}|<>]/.test(password)
      this.passwordConditions[2].fulfilled = /\d/.test(password)
      this.passwordConditions[3].fulfilled = /[A-Z]/.test(password)
      this.passwordConditions[4].fulfilled = /[a-z]/.test(password)
    },
    closePasswordConditions() {
      this.showPasswordConditions = false
    }
  }
}
</script>

<style>
.header-buttons-account {
  align-self: center;
}
.confirmation-popup {
  display: flex;
  justify-content: center;
  position: fixed;
  width: 90%;
  max-width: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--white);
  padding: 20px;
  border: 4px solid var(--black);
  border-radius: 0.25rem;
  z-index: 9999;
  align-items: center;
}
.confirmation-message {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.confirmation-buttons {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.button-delete {
  background-color: var(--red);
  color: var(--white);
  width: 1rem;
}
.button-cancel {
  color: var(--black);
  background: var(--white);
}

.button-confirmation {
  border: 0.1rem solid var(--black);
  border-radius: 0.25rem;
  padding: 0.5rem;
  align-self: center;
  margin: 0 10px;
  width: 3rem;
}
.button-confirmation:hover {
  transform: scale(1.1);
}

.form-group {
  display: flex;

  flex-direction: column;
  width: 90%;
  align-self: center;
}

input,
label {
  display: block;
}

.label-username,
.label-account {
  margin-top: 2rem;
}

.input-account {
  padding: 0.5rem;
  width: 100%;
  background-color: var(--white);
  border-radius: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: var(--black);
  border: 1px solid var(--black);
  min-height: 3rem;
}
.input.invalid-email {
  border-color: var(--black);
}
.button-account,
.headline-account {
  align-self: center;
}

.email-popup {
  color: var(--red);
  display: flex;
  flex-direction: column;
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

.header-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: transparent;
}
</style>
