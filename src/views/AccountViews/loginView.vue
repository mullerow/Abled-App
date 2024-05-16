<template>
  <h1 class="heading-login">Willkommen zurück</h1>
  <InputField class="input-login" :value="username" placeholder="Benutzername eingeben" label>
    ></InputField
  >

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
      store: storeData()
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
