<template>
  <h1>Willkomen bei xyz</h1>
  <InputField
    :value="username"
    @input="updateUsername($event.target.value)"
    placeholder="Benutzername eingeben"
    label
  >
    ></InputField
  >
  <InputField
    :value="email"
    @input="updateEmail($event.target.value)"
    placeholder="E-Mail-Adresse eingeben"
  >
    ></InputField
  >
  <InputField
    :value="password"
    @input="updatePassword($event.target.value)"
    type="password"
    placeholder="Passwort eingeben"
  >
    ></InputField
  >
  <NavButton :Navigation="'Registrieren'" @click="registerUser"></NavButton>
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
      userCounter: 3
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
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
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
        alert('Ungültige E-Mail-Adresse.')
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
    }
  }
}
</script>
