<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'searchresultlist' }"> <BackArrow /></RouterLink>
    <RouterLink :to="{ name: 'home' }"> <headerLogo /></RouterLink>
  </div>
  <br />
  <div v-if="findChoosenPoi" class="info-infopoi">
    <img
      class="categorie-icon"
      :src="this.store.getIconOfCategory(findChoosenPoi)"
      alt="Kategorie Icon"
    />
    <favoriteStarSvg class="favorite-star-infopoi"></favoriteStarSvg>
    <h2>
      {{ findChoosenPoi.poiName ? findChoosenPoi.poiName : 'Poi konnte nicht geladen werden' }}
    </h2>

    <p>
      <b>Adresse:</b> <br />
      {{ findChoosenPoi.city }}, <br />
      {{ findChoosenPoi.street }}, {{ findChoosenPoi.number }} <br />{{ findChoosenPoi.zip }}
    </p>
    <div>
      <div
        class="detail-categorys"
        v-for="detailcategorie of findChoosenPoi.detailCategories"
        :key="'detail-' + findChoosenPoi.id + '-' + detailcategorie"
      >
        ✅ {{ detailcategorie }}
      </div>
    </div>

    <p>
      <b>passierbare Mindestbreite:</b>
      {{ findChoosenPoi.minWidth ? findChoosenPoi.minWidth : 'Poi konnte nicht geladen werden' }} cm
    </p>
    <p>
      <b>Entfernung Luftlinie:</b>
      {{
        this.store.calcDistance(
          findChoosenPoi.xCoordinates,
          findChoosenPoi.yCoordinates,
          this.store.temporaryData.ownXCoordinate,
          this.store.temporaryData.ownYCoordinate
        )
      }}
      Meter
    </p>
    <p>
      <b>Öffnungszeiten:</b>
      {{
        findChoosenPoi.openingTimes
          ? findChoosenPoi.openingTimes
          : 'Poi konnte nicht geladen werden'
      }}
    </p>
    <p>
      <b>Kommentar:</b>
      {{ findChoosenPoi.comment ? findChoosenPoi.comment : 'Poi konnte nicht geladen werden' }}
    </p>
    <p>
      <b>Derzeit nutzbar?</b>
      ✅
    </p>
  </div>
  <p class="ctn-btn">
    <LöschenButton class="button-infopoi" :Löschen="'Nicht nutzbar'" @click="removePoi" />
    <NavButton
      class="button-infopoi"
      :Navigation="'In Maps öffnen'"
      @click="
        store.openExternMapToNavigate(findChoosenPoi.xCoordinates, findChoosenPoi.yCoordinates)
      "
    />
  </p>
</template>

<script>
import { storeData } from '@/stores/store.js'
import BackArrow from '@/components/BackArrow.vue'
import NavButton from '@/components/NavButton.vue'
import LöschenButton from '@/components/LöschenButton.vue'
import headerLogo from '@/components/headerLogo.vue'
import favoriteStarSvg from '@/components/favoriteStar.vue'

export default {
  components: {
    headerLogo,
    BackArrow,
    NavButton,
    LöschenButton,
    favoriteStarSvg
  },
  data() {
    return {
      poiId: this.$route.params.id,
      store: storeData(),
      StatusfavoritePoi: false
    }
  },
  methods: {
    removePoi() {
      this.$router.push({ name: 'searchresultlist' })
    },
    async changeFavoriteStateOfPoi() {
      // frage ob der poi schon favorite ist zum zeitpunkt des klicks
      if (this.StatusfavoritePoi) {
        // Wenn ja, dann lösche den poi aus die API und dem local storeage
      }
      // wenn nicht, speichere den poi in der api und im localstorage
      else {
        // lade die Daten des Users in die temporären daten
        this.store.getDataFromCurrentUser()
        try {
          // lade die userdaten aus dem local storage
          const updatedUserData = JSON.parse(localStorage.getItem('userData'))
          if (!updatedUserData) {
            console.error('Keine aktualisierten Benutzerdaten im lokalen Speicher gefunden.')
            return
          }
          // speichere die daten aus dem localstorage in die temporären daten für das api update
          console.log(
            'this.store.temporaryData.DataFromCurrentUser',
            this.store.temporaryData.DataFromCurrentUser.id
          )
          this.store.temporaryData.changedUserData = {
            id: this.store.temporaryData.DataFromCurrentUser.id,
            username: updatedUserData.username,
            email: updatedUserData.email,
            mobilityAssistance: updatedUserData.mobilityAssistance,
            mobilityAssistanceWidth: parseInt(updatedUserData.mobilityAssistanceWidth),
            password: updatedUserData.password,
            favoritePoisOfUser: this.store.temporaryData.DataFromCurrentUser.favoritePoisOfUser
          }
          this.store.temporaryData.changedUserData.favoritePoisOfUser.push(this.findChoosenPoi.id)
          console.log(
            'this.store.temporaryData.changedUserData',
            this.store.temporaryData.changedUserData
          )
          localStorage.setItem('userData', JSON.stringify(this.store.temporaryData.changedUserData))
          await this.store.updateUserAtAPI(this.store.temporaryData.DataFromCurrentUser.id)
        } catch (error) {
          console.error(
            'Fehler beim Speichern der aktualisierten Benutzerdaten im temporären Speicher:',
            error
          )
        }
      }
    }
  },
  computed: {
    findChoosenPoi() {
      return this.store.temporaryData.currentPois.find((el) => el.id == this.poiId)
    }
  },
  mounted() {
    this.store.getPoiDataFromAPI()

    this.store.getUserDataFromAPI().then(() => {
      this.store.getDataFromCurrentUser()
    })
    if (this.store.temporaryData.DataFromCurrentUser.favoritePoisOfUser.includes(this.poiId)) {
      this.StatusfavoritePoi = true
    }
  }
}
</script>

<style scoped>
.info {
  padding-left: 0.5rem;
  background-color: var(--white);
  color: var(--black);
  border-radius: 1rem;
  width: 75%;
  margin-top: 0;
  margin-bottom: 0px;
  margin-left: 5px;

  display: grid;
  font-size: 16px;
}
b {
  font-size: 16px;
  padding: 0.9rem;
  padding-left: 0;
}
section {
  min-width: 320px;
}
.detail-categorys {
  margin-top: 5px;
  margin-left: 10px;
}
h2 {
  color: var(--red);
  margin: 0 0 0 10px;
  font-size: 28px;
}
.header-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: transparent;
}
.ctn-btn {
  display: flex;
  flex-direction: column;
}
.button-infopoi {
  align-self: center;
}
.info-infopoi {
  padding-left: 0.5rem;
  padding-top: 0.5rem;
  background-color: var(--white);
  color: var(--black);
  border-radius: 1rem;
  width: 95%;
  margin-top: 2rem;
  margin-bottom: 1rem;
  align-self: center;
  position: relative;
}
.categorie-icon {
  position: absolute;
  top: 10px;
  right: 12px;
  width: 60px;
  border-radius: 10px;
}
.favorite-star-infopoi {
  position: absolute;
  top: 80px;
  right: 12px;
}
</style>
