<script>
import { storeData } from '@/stores/store.js'

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
    this.store.getPoiDataFromAPI()
    this.store.getUserDataFromAPI().then(() => {
      if (this.store.temporaryData.currentUserData.length > 0) {
        this.store.currentUserName = this.store.getUserName()
      }
    })
    this.store.resetTemporaryLists()
    this.store.temporaryData.currentUserId = JSON.parse(localStorage.getItem('currentUserID'))
  }
}
</script>

<template>
  <LandingPageTitle :username="store.temporaryData.currentUserName" class="welcome-text" />

  <div class="grid-container">
    <button class="btn-search btn-style">
      <RouterLink :to="{ name: 'searchpoi' }" class="search">
        <div class="icon"><img src="@/assets/icons/search.svg" alt="Search Icon" /> Suche</div>
      </RouterLink>
    </button>
    <button class="btn-new-poi btn-style">
      <RouterLink :to="{ name: 'newpoicategorie' }" class="new">
        <div class="icon"><img src="@/assets/icons/Pencil.svg" alt="newpoi Icon" /></div>
        Neuen Ort erstellen
      </RouterLink>
    </button>
    <button class="btn-favorite btn-style">
      <RouterLink :to="{ name: 'favoritepoi' }" class="favorite">
        <div class="icon"><img src="@/assets/icons/Star.svg" alt="favorite Icon" /></div>
        Deine Favoriten
      </RouterLink>
    </button>
    <button class="btn-own-poi btn-style">
      <RouterLink :to="{ name: 'ownpoi' }" class="own">
        <div class="icon"><img src="@/assets/icons/folder.svg" alt="ownpoi Icon" /></div>
        geteilte Orte
      </RouterLink>
    </button>
    <button class="btn-account btn-style">
      <RouterLink :to="{ name: 'account' }" class="account">
        <div class="icon"><img src="@/assets/icons/user-account.svg" alt="account Icon" /></div>
        Deinen Account
      </RouterLink>
    </button>
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
  grid-row-end: span 1;
  border-radius: 0.5rem;
  background-color: var(--white);
}

.btn-favorite {
  grid-area: favorite;
}
.btn-new-poi {
  grid-area: newpoi;
}
.btn-own-poi {
  grid-area: ownpoi;
}
.btn-account {
  grid-area: account;
}
.btn-style {
  height: 7rem;
  border-radius: 0.5rem;
  background-color: var(--white);
}
.btn-style:hover {
  border: 5px solid var(--black);
}
</style>
