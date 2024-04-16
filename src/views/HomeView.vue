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
  }
}
</script>

<template>
  <h2>Startseite</h2>
  <h1><LandingPageTitle :username="'JohnDoe'" /></h1>
  <ul class="menu">
    <li class="search">
      <RouterLink :to="{ name: 'searchpoi' }">
        <span class="icon"><img src="@/assets/icons/Magnifying-Glass.png" alt="Search Icon" /></span
        >Suche</RouterLink
      >
    </li>
    <li class="new">
      <RouterLink :to="{ name: 'newpoicategorie' }">
        <span class="icon"><img src="@/assets/icons/pencil.png" alt="newpoi Icon" /></span>Neuen Poi
        erstellten</RouterLink
      >
    </li>
    <li class="favorite">
      <RouterLink :to="{ name: 'favoritepoi' }">
        <span class="icon"><img src="@/assets/icons/star.png" alt="favorite Icon" /></span>Deine
        Favoriten</RouterLink
      >
    </li>
    <li class="own">
      <RouterLink :to="{ name: 'ownpoi' }">
        <span class="icon"><img src="@/assets/icons/folder.png" alt="ownpoi Icon" /></span>geteilte
        Orte</RouterLink
      >
    </li>
    <li class="account">
      <RouterLink :to="{ name: 'account' }">
        <span class="icon"><img src="@/assets/icons/user.png" alt="account Icon" /></span>Deinen
        Account</RouterLink
      >
    </li>
  </ul>

  <!--
  <h3>Liste aller User aus der Pinia Datenbank</h3>
  <ul v-for="user of store.userData" :key="user.id">
    <li>
      <b style="font-size: 16px">{{ user.id }}</b>
      <ul>
        <li>Kategorie: {{ user.userName }}</li>
        <li>E-Mail Adresse: {{ user.eMailAddress }}</li>
      </ul>
    </li>
  </ul>

  <h3>Liste aller POIs aus der Pinia Datenbank</h3>
  <ul v-for="poi of store.poiData" :key="poi.id">
    <li>
      <b style="font-size: 16px">{{ poi.id }}</b>
      <ul>
        <li>Kategorie: {{ poi.category }}</li>
        <li>X-Koordinate: {{ poi.xCoordinates }}</li>
        <li>Y-Koordinate: {{ poi.yCoordinates }}</li>
        <li>Favorit: {{ poi.isFavorite }}</li>
        <button @click="store.changeFavorite(poi)">Favorit hinzufügen</button>
      </ul>
    </li>
  </ul>
  -->
</template>
<style scoped>
.menu {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.1rem;
  list-style-type: none;
}

.menu li {
  position: relative;
  margin: 0.4rem;
  text-align: center;
  background-color: var(--white);
  padding: 2rem;
  border-radius: 1rem;
}

.menu .icon {
  position: absolute;
  left: 50%; /* Position des Icons anpassen */
  transform: translateX(-50%);
  top: 0; /* Position des Icons anpassen */
}

.menu .search .icon {
  top: 20%; /* Position des Icons anpassen */
  transform: translate(-50%, -50%);
}

.menu .new .icon {
  top: 20%;
  transform: translate(-50%, -50%);
}

.menu .favorite .icon {
  top: 20%;
  transform: translate(-50%, -50%);
}

.menu .own .icon {
  top: 20%;
  transform: translate(-50%, -50%);
}
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
  height: 500px;
  width: 20rem;
  margin-left: 2%;
  margin-right: 5%;
  margin-top: 10%;
}
</style>
