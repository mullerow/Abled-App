<template>
  <div class="background-prio"></div>
  <div class="header-buttons header-buttons-prio"></div>
  <HeadLine class="headline-account" :Headline="'Wähle deine Mobilitätshilfe'" />

  <PriorityButton
    v-for="mobilityAssistanceClass in store.localData.mobilityAssistanceClasses"
    :key="mobilityAssistanceClass"
    :priority="mobilityAssistanceClass"
    :selected="selectedMobilityAssistance === mobilityAssistanceClass"
    @click="selectMobilityAssistance(mobilityAssistanceClass)"
  />
  <label class="label-prio" for="mobilityAssistanceWidth">Mobilitätshilfe Breite</label>
  <input
    class="input-prio"
    type="number"
    id="mobilityAssistanceWidth"
    v-model="mobilityAssistanceWidth"
    :placeholder="'Breite in cm'"
  />

  <NavButton class="button-prio" Navigation="Weiter" @click="saveDataAndOpenPopup" />

  <div v-if="showPopup" class="popup">
    <div class="popup-content">
      <p>Dein Account wird angelegt.</p>
      <button class="prio-popup-button" @click="addUserAndNavigate">OK</button>
      <RouterLink :to="{ name: 'home' }"></RouterLink>
    </div>
  </div>
</template>

<script>
import { storeData } from '@/stores/store.js'
import HeadLine from '@/components/HeadLine.vue'
import PriorityButton from '@/components/PriorityButton.vue'
import NavButton from '@/components/NavButton.vue'

export default {
  components: { PriorityButton, NavButton, HeadLine },
  data() {
    return {
      store: storeData(),
      selectedMobilityAssistance: '',
      mobilityAssistanceWidth: '',
      showPopup: false,
      addingUser: false,
      loading: false
    }
  },

  methods: {
    selectMobilityAssistance(mobilityAssistanceClass) {
      this.selectedMobilityAssistance = mobilityAssistanceClass
    },
    saveDataAndOpenPopup() {
      this.saveDataToLocalStorage()
      this.loadUserDataToTemporaryData()
      this.showPopup = true
    },
    saveDataToLocalStorage() {
      const localUserData = JSON.parse(localStorage.getItem('userData')) || {}

      localUserData.mobilityAssistance = this.selectedMobilityAssistance
      localUserData.mobilityAssistanceWidth = this.mobilityAssistanceWidth

      localStorage.setItem('userData', JSON.stringify(localUserData))
    },
    loadUserDataToTemporaryData() {
      const localUserData = JSON.parse(localStorage.getItem('userData')) || {}
      if (localUserData) {
        this.store.temporaryData.newUserData = {
          id: '',
          username: localUserData.username || '',
          email: localUserData.email || '',
          mobilityAssistance: localUserData.mobilityAssistance || '',
          mobilityAssistanceWidth: localUserData.mobilityAssistanceWidth || '',
          password: localUserData.password || ''
        }
      }

      console.log(
        'Benutzerdaten erfolgreich in temporäre Daten geladen:',
        this.store.temporaryData.newUserData
      )
    },

    async addUserAndNavigate() {
      try {
        const localUserData = JSON.parse(localStorage.getItem('userData')) || {}

        this.store.temporaryData.newUserData = localUserData
        await this.store.addNewUserToAPI()
        await this.store.getUserDataFromAPI()

        console.log('Daten von der API erhalten:', this.store.temporaryData.currentUserData)

        localStorage.setItem(
          'currentUserID',
          JSON.stringify(
            this.store.temporaryData.currentUserData[
              this.store.temporaryData.currentUserData.length - 1
            ].id
          )
        )
        this.store.temporaryData.currentUserId =
          this.store.temporaryData.currentUserData[
            this.store.temporaryData.currentUserData.length - 1
          ].id
        this.$router.push({ name: 'home' })
      } catch (error) {
        console.error('Fehler beim Hinzufügen des Benutzers:', error)
      }
    }
  }
}
</script>

<style>
.header-buttons-prio {
  height: 1rem;
}
.background-prio {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  background-image: linear-gradient(
      180deg,
      transparent 57px,
      var(--red) 58.9px,
      var(--white) 63.4px,
      transparent 65px
    ),
    linear-gradient(180deg, transparent 66px, var(--red) 67px, var(--red) 73.8px, transparent 74px),
    linear-gradient(
      180deg,
      transparent 75px,
      var(--white) 76.9px,
      var(--red) 81.4px,
      transparent 83px
    ),
    linear-gradient(180deg, var(--black) 84.4px, var(--black) 119.76px, transparent 120px);
  border-radius: 20px 20px 0 0;
}

.input-prio {
  align-self: center;
  padding: 0.5rem;
  width: 14.5rem;
  background-color: var(--white);
  border-radius: 0.5rem;
  margin: 1rem 1rem 2rem 1rem;
  color: var(--black);
  border: 1px solid var(--black);
  min-height: 3rem;
}
.label-prio {
  margin-left: 2rem;
  margin-top: 1.5rem;
}
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--black);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: var(--white);
  padding: 20px;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
}
.prio-popup-button {
  color: var(--white);
  background-color: var(--black);
  border: 0.1rem solid var(--black);
  border-radius: 0.25rem;
  padding: 0.5rem;
  align-self: center;
  margin: 0 10px;
  width: 3rem;
}
.prio-popup-button:hover {
  transform: scale(1.1);
}
.button-prio {
  align-self: center;
}
</style>
