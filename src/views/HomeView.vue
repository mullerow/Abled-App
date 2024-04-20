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
  mounted() {
    //this.store.addNewPoiToAPI()
    this.store.getPoiDataFromAPI()
    this.store.getUserDataFromAPI()
    //this.store.addNewUserToAPI()
    this.store.updateUserAtAPI(this.store.temporaryData.currentUserId)
  }
}
</script>

<template>
  <h1><LandingPageTitle :username="'JohnDoe'" /></h1>
  <p v-if="store.temporaryData.currentUserData[0]">
    <b>Nutzer:</b>
    {{
      store.temporaryData.currentUserData[this.store.temporaryData.currentUserData.length - 1]
        .userName
        ? store.temporaryData.currentUserData[this.store.temporaryData.currentUserData.length - 1]
            .userName
        : 'User konnte nicht geladen werden'
    }}
  </p>

  <p v-if="this.store.temporaryData.currentPois[0]">
    <b>PoiId:</b>
    {{
      store.temporaryData.currentPois[this.store.temporaryData.currentPois.length - 1].id
        ? store.temporaryData.currentPois[this.store.temporaryData.currentPois.length - 1].id
        : 'Poi konnte nicht geladen werden'
    }}
  </p>

  <section class="container">
    <ul class="menu">
      <RouterLink :to="{ name: 'searchpoi' }" class="search">
        <li>
          <span class="icon"
            ><img src="@/assets/icons/Magnifying-Glass.png" alt="Search Icon"
          /></span>
          Suche
        </li>
      </RouterLink>
      <RouterLink :to="{ name: 'newpoicategorie' }" class="new">
        <li>
          <span class="icon"><img src="@/assets/icons/pencil.png" alt="newpoi Icon" /></span>Neuen
          Poi erstellen
        </li>
      </RouterLink>
      <RouterLink :to="{ name: 'favoritepoi' }" class="favorite">
        <li>
          <span class="icon"><img src="@/assets/icons/star.png" alt="favorite Icon" /></span>Deine
          Favoriten
        </li>
      </RouterLink>
      <RouterLink :to="{ name: 'ownpoi' }" class="own">
        <li>
          <span class="icon"><img src="@/assets/icons/folder.png" alt="ownpoi Icon" /></span
          >geteilte Orte
        </li>
      </RouterLink>
      <RouterLink :to="{ name: 'account' }" class="account">
        <li>
          <span class="icon"><img src="@/assets/icons/user-account.png" alt="account Icon" /></span>
          Deinen Account
        </li>
      </RouterLink>
    </ul>
  </section>
</template>
<style scoped>
ul {
  padding-left: 0;
}

.menu {
  display: flex;
  justify-content: center; /* Horizontal zentriert */
  list-style-type: none;
  margin-top: 1rem;
}
.container {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}
.menu {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.1rem;
  list-style-type: none;
  margin-top: 1rem;
}
.container.menu:first-child {
  grid-template-columns: 1fr;
}
.container.menu.first-row {
  grid-template-columns: 1fr; /* Eine Spalte für die erste Reihe */
}
.menu li {
  position: relative;
  margin: 0.4rem;
  text-align: center;
  background-color: var(--white);
  padding: 5vh;
  border-radius: 1rem;
  cursor: pointer;
}

.menu .icon {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 50%;
  transform: translateY(-50%);
}

.menu .search .icon,
.menu .new .icon,
.menu .favorite .icon,
.menu .own .icon,
.menu .account .icon {
  top: 20%;
  transform: translate(-50%, -50%);
}

.menu .search .icon img,
.menu .new .icon img,
.menu .favorite .icon img,
.menu .own .icon img,
.menu .account .icon img {
  width: 20px;
  height: 20px;
  display: block;
}
.menu .search {
  grid-column: 1 / -1;
}

h1 {
  height: 350px;
  width: 20rem;

  margin-left: 2%;
  margin-right: 5%;
  margin-top: 10%;
}
</style>
