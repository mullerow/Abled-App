<script>
import { storeData } from '@/stores/store.js'
import router from '@/router'
import LandingPageTitle from '@/components/LandingPageTitle.vue'

export default {
  components: {
    LandingPageTitle
  },
  data() {
    return {
      store: storeData(),
      tutorialPopup: true
    }
  },
  created() {
    const currentUserID = localStorage.getItem('currentUserID')
    if (!currentUserID) {
      router.push({ name: 'register' })
    } else {
      this.store.getPoiDataFromAPI()
      this.store.getUserDataFromAPI().then(() => {
        if (this.store.temporaryData.currentUserData.length > 0) {
          this.store.currentUserName = this.store.getUserName()
        }
      })
      this.store.resetTemporaryLists()
      this.store.temporaryData.currentUserId = JSON.parse(currentUserID)
    }
  },
  updated() {
    // DELETE the Dummydata
    // sollte immer auskommentiert sein, nur zum gezielten löschen einmalig ausführen
    /*
    if (this.store.temporaryData.currentPois) {
      this.store.temporaryData.currentPois.forEach(async (element) => {
        if (element.creationDate === 'Dummys bekommen kein Datum') {
          this.store.deletePoifromAPI(element.id)
        }
      })
    }
    */
  }
}
</script>

<template>
  <div class="popup-container" v-if="tutorialPopup">
    <svg
      class="svg-popup"
      viewBox="0 0 100 100"
      width="200px"
      height="200px"
      style="filter: url(#f1)"
    >
      <defs>
        <filter id="f1" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 1 0"
            result="coloredBlur"
          />
          <feOffset in="coloredBlur" dx="7" dy="7" result="offsetBlur" />
          <feMerge>
            <feMergeNode in="offsetBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="clipPolygon">
          <path
            d="
            M 24.746 20.888 L 34.15 17.725 L 30.277 26.461 L 92.896 90.926 C 95.74 94.96 99.994 99.965 92.833 99.835 H 9.272 C 0.029 99.83 0.272 94.812 0.181 88.457 V 4.849 C 0.23 1.034 3.39 -2.613 8.108 3.633 Z"
          />
        </clipPath>
      </defs>
      <rect width="200px" height="200px" clip-path="url(#clipPolygon)" style="fill: var(--black)" />
    </svg>
    <button class="popup-button">OK</button>
    <p class="popup-text">
      Wie wär es, <br />
      wenn sie sich <br />
      zunächst die Karte <br />
      in Ihrer Umgebung <br />
      ansehen?
    </p>
  </div>

  <LandingPageTitle :username="store.temporaryData.currentUserName" class="welcome-text" />
  <div class="grid-container">
    <RouterLink :to="{ name: 'searchpoi' }" class="search btn-search">
      <button class="btn-style search-button-width">
        <div class="icon"><img src="@/assets/icons/search.svg" alt="Search Icon" /> Suche</div>
      </button>
    </RouterLink>

    <RouterLink :to="{ name: 'newpoicategorie' }" class="new">
      <button class="btn-new-poi btn-style">
        <div class="icon"><img src="@/assets/icons/Pencil.svg" alt="newpoi Icon" /></div>
        Neuen Ort erstellen
      </button>
    </RouterLink>

    <RouterLink :to="{ name: 'favoritepoi' }" class="favorite">
      <button class="btn-favorite btn-style">
        <div class="icon"><img src="@/assets/icons/Star.svg" alt="favorite Icon" /></div>
        Deine Favoriten
      </button>
    </RouterLink>

    <RouterLink :to="{ name: 'ownpoi' }" class="own">
      <button class="btn-own-poi btn-style">
        <div class="icon"><img src="@/assets/icons/folder.svg" alt="ownpoi Icon" /></div>
        geteilte Orte
      </button>
    </RouterLink>

    <RouterLink :to="{ name: 'account' }" class="account">
      <button class="btn-account btn-style">
        <div class="icon"><img src="@/assets/icons/user-account.svg" alt="account Icon" /></div>
        Deinen Account
      </button>
    </RouterLink>
  </div>
</template>

<style scoped>
.welcome-text {
  margin-bottom: 20px;
  margin-top: 10px;
}

.grid-container {
  align-self: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-auto-flow: row;
  gap: 0.6rem;
  grid-template-areas:
    'search search'
    'newpoi favorite'
    'ownpoi account';
}

.btn-search {
  width: 330px;
  grid-area: search;
  grid-row-start: 1;
  _grid-row-end: span 1;
  border-radius: 0.5rem;
  background-color: var(--white);
}

.btn-favorite {
  grid-area: favorite;
  width: 10rem;
}
.btn-new-poi {
  grid-area: newpoi;
  width: 10rem;
}
.btn-own-poi {
  grid-area: ownpoi;
  width: 10rem;
}
.btn-account {
  grid-area: account;
  width: 10rem;
}
.btn-style {
  height: 7rem;
  border-radius: 0.5rem;
  background-color: var(--white);
  font-weight: bold;
}
.btn-style:hover {
  border: 5px solid var(--black);
  cursor: pointer;
}
.search-button-width {
  width: 330px;
}
.svg-popup {
  position: absolute;
  background-color: transparent;
  width: 300px;
  height: 300px;
}
.popup-container {
  top: 380px;
  position: relative;
  display: flex;
  justify-content: center;
}
.popup-text {
  position: absolute;
  color: var(--white);
  z-index: 10;
  top: 120px;
  margin-right: 140px;
}
.popup-button {
  position: absolute;
  background-color: var(--white);
  right: 55%;
  top: 250px;
  color: var(--black);
}

#app {
  position: relative;
}
</style>
