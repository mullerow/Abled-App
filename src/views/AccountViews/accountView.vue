<template>
  <RouterLink :to="{ name: 'home' }">Gehe zurück zur Startseite</RouterLink>
  <RouterLink :to="{ name: 'register' }"> Register</RouterLink>
  <h2>Verwalte deine Account-Daten</h2>
  <InputField
    label="Username"
    v-model="store.userData[0].userName"
    :placeholder="store.userData[0].userName ? store.userData[0].userName : 'username'"
  ></InputField>
  <InputField
    label="Email"
    v-model="store.userData[0].eMailAddress"
    :placeholder="store.userData[0].eMailAddress ? store.userData[0].eMailAddress : 'Email'"
  ></InputField>
  <InputField
    label="password"
    v-model="store.userData[0].passWord"
    :placeholder="store.userData[0].passWord ? store.userData[0].passWord : 'Passwort'"
  ></InputField>
  <InputField
    label="Mobility Assistance"
    v-model="store.userData[0].mobilityAssistance"
    :placeholder="
      store.userData[0].mobilityAssistance
        ? store.userData[0].mobilityAssistance
        : 'mobility assistance'
    "
  ></InputField>
  <InputField
    label="Mobility Assistance Width"
    v-model="store.userData[0].mobilityAssistanceWidth"
    :placeholder="
      store.userData[0].mobilityAssistanceWidth
        ? store.userData[0].mobilityAssistanceWidth
        : 'mobilityAssistance width'
    "
  ></InputField>
  <NavButton :Navigation="'Speichern'" @click="saveUserData"></NavButton>
</template>

<script>
import { storeData } from '@/stores/store.js'

import InputField from '@/components/InputField.vue'
import NavButton from '@/components/NavButton.vue'

export default {
  components: { InputField, NavButton },
  data() {
    return {
      store: storeData()
    }
  },
  created() {
    const dummyUser = this.store.userData[0]
    console.log('userData:', dummyUser)
  }
}
</script>
