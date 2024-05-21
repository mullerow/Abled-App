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
      store: storeData()
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
  width: 21rem;
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
  width: 21rem;
}
</style>
