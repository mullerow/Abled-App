<template>
  <h1>Wähle deine Mobilitätshilfe</h1>
  <PriorityButton
    v-for="mobilityAssistanceClass in store.localData.mobilityAssistanceClasses"
    :key="mobilityAssistanceClass"
    :priority="mobilityAssistanceClass"
    @click="selectMobilityAssistance(mobilityAssistanceClass)"
  />
  <label class="label" for="mobilityAssistanceWidth">Mobilitätshilfe Breite</label>
  <input
    class="input"
    type="number"
    id="mobilityAssistanceWidth"
    v-model="mobilityAssistanceWidth"
    :placeholder="'Breite in cm'"
  />

  <RouterLink :to="{ name: 'home' }"
    ><NavButton Navigation="Weiter" @click="saveDataAndNavigate"
  /></RouterLink>
</template>

<script setup>
import { storeData } from '@/stores/store.js'
</script>

<script>
import PriorityButton from '@/components/PriorityButton.vue'
import NavButton from '@/components/NavButton.vue'

export default {
  components: { PriorityButton, NavButton },
  data() {
    return {
      store: storeData(),
      selectedMobilityAssistance: '',
      mobilityAssistanceWidth: ''
    }
  },

  methods: {
    selectMobilityAssistance(mobilityAssistanceClass) {
      this.selectedMobilityAssistance = mobilityAssistanceClass
    },
    saveDataAndNavigate() {
      const localUserData = JSON.parse(localStorage.getItem('userData')) || {}

      localUserData.mobilityAssistance = this.selectedMobilityAssistance
      localUserData.mobilityAssistanceWidth = this.mobilityAssistanceWidth

      localStorage.setItem('userData', JSON.stringify(localUserData))

      this.store.userData = localUserData

      this.$router.push({ name: 'home' })
    }
  }
}
</script>
<style>
.input {
  padding: 0.5rem;
  width: 80%;
  background-color: var(--white);
  border-radius: 0.5rem;
  margin: 1rem;
  color: darkgray;
}
</style>
