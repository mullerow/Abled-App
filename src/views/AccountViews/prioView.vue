<template>
  <h1>Wähle deine Mobilitätshilfe</h1>
  <PriorityButton
    v-for="mobilityAssistanceClass in store.localData.mobilityAssistanceClasses"
    :key="mobilityAssistanceClass"
    :priority="mobilityAssistanceClass"
    @click="saveButtonValue(mobilityAssistanceClass)"
  />
  <InputField></InputField>

  <RouterLink :to="{ name: 'home' }"><NavButton Navigation="Weiter" /></RouterLink>
</template>

<script setup>
import { storeData } from '@/stores/store.js'

const store = storeData()
</script>

<script>
import PriorityButton from '@/components/PriorityButton.vue'
import NavButton from '@/components/NavButton.vue'
import InputField from '@/components/InputField.vue'

export default {
  components: { PriorityButton, NavButton, InputField }
}
</script>
