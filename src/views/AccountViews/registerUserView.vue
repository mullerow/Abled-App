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
      <p>Ungültige E-Mail-Adresse.</p>
      <button @click="closePopup">OK</button>
    </div>
  </div>
</template>

<script>
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
      showPopup: false
    }
  },
  methods: {
    updateUsername(value) {
      this.username = value
    },
    updateEmail(value) {
      this.email = value
    },
    updatePassword(value) {
      this.password = value
    },
    validateEmail(email) {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      return regex.test(email)
    },
    /*generateUserID() {
      this.userCounter++
      return 100 + this.userCounter
    },*/

    registerUser() {
      if (!this.username.trim() || !this.email.trim() || !this.password.trim()) {
        console.error('Bitte füllen Sie alle Felder aus.')
        return
      }
      if (!this.validateEmail(this.email)) {
        this.showPopup = true
        return
      }

      //const userID = this.generateUserID()
      const userData = {
        //id: userID,
        username: this.username,
        email: this.email,
        password: this.password
      }

      localStorage.setItem('userData', JSON.stringify(userData))
      //localStorage.setItem('userId', userID)
      this.goToPrio()
    },
    goToPrio() {
      this.$router.push({ name: 'prio' })
    },
    closePopup() {
      this.showPopup = false
    },
    checkEmailValidity() {
      if (!this.validateEmail(this.email)) {
        this.showPopup = true
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
