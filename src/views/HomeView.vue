<script setup>
//import { useStore } from 'pinia'
import { storeData } from '@/stores/store.js'

const store = storeData()
</script>

<template>
  <h2>Startseite</h2>
  <ul>
    <li><RouterLink to="/createPoi">Erstelle einen neuen Poi</RouterLink></li>
    <li><RouterLink to="/favoritePois">Hier findest du deine Favoriten</RouterLink></li>
    <li><RouterLink to="/account">Alles rund um deinen Account</RouterLink></li>
    <li><RouterLink to="/searchpois">Finde deinen Weg!</RouterLink></li>
    <li><RouterLink to="/ownpois">geteilte Orte</RouterLink></li>
  </ul>
  <p>{{ store.info }}</p>
</template>
