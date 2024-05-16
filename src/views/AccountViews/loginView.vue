<template>
  <h1>Willkommen zurück</h1>
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
    :value="password"
    @input="updatePassword($event.target.value)"
    @focus="showPasswordConditions = true"
    type="password"
    placeholder="Passwort eingeben"
  >
    ></InputField
  >
  <NavButton></NavButton>
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
  }
}
</script>

<style></style>
