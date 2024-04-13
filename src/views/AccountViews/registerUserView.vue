<template>
  <h1>Willkomen bei xyz</h1>
  <InputField
    label="Benutzername"
    v-model="username"
    placeholder="Benutzername eingeben"
  ></InputField>
  <InputField
    label="Mailadresse"
    v-model="email"
    placeholder="E-Mail-Adresse eingeben"
  ></InputField>
  <InputField
    label="Passwort"
    v-model="password"
    type="password"
    placeholder="Passwort eingeben"
  ></InputField>
  <NavButton @click="registerUser"></NavButton>
  <!--<RouterLink :to="{ name: 'home' }">register</RouterLink>-->
</template>

<script>
import InputField from '@/components/InputField.vue'

import NavButton from '@/components/NavButton.vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    InputField,
    NavButton
  },
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    registerUser() {
      //PINIA Anbindung erstellen

      const router = useRouter()
      router.push({ name: 'register' })
    }
  }
}
</script>
