<template>
  <RouterLink :to="{ name: 'home' }">Gehe zurück zur Startseite</RouterLink>
  <RouterLink :to="{ name: 'register' }"> Register</RouterLink>
  <h2>Verwalte deine Account-Daten</h2>
  <InputField label="Username" v-model="userData.userName" placeholder="username"></InputField>
  <InputField label="Email" v-model="userData.eMailAddress" placeholder="email"></InputField>
  <InputField label="password" v-model="userData.passWord" placeholder="passwort"></InputField>
  <InputField
    label="Mobility Assistance"
    v-model="userData.mobilityAssistance"
    placeholder="mobility assistance"
  ></InputField>
  <InputField
    label="Mobility Assistance Width"
    v-model="userData.mobilityAssistanceWidth"
    placeholder="mobilityAssistance width"
  ></InputField>
  <NavButton @click="editUserData"></NavButton>
</template>

<script>
//import { storeData } from '@/stores/store.js'

import InputField from '@/components/InputField.vue'
import NavButton from '@/components/NavButton.vue'

export default {
  components: { InputField, NavButton },
  data() {
    return {
      userData: {
        userName: '',
        eMailAddress: '',
        passWord: '',
        mobilityAssistance: '',
        mobilityAssistanceWidth: ''
      }
    }
    //methods: {
    //editUserData() {
  }
}
</script>
