<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }">Gehe zurück zur Startseite</RouterLink>
    <RouterLink :to="{ name: 'searchresultlist' }">Gehe eine Seite zurück</RouterLink>
  </div>

  <h2>Ergebnismap</h2>

  <div style="height: 600px; width: 100%" id="map"></div>
</template>

<script>
import L from 'leaflet' // npm install leaflet@latest
import 'leaflet/dist/leaflet.css'
import { storeData } from '@/stores/store.js'
import { toRaw } from 'vue'
export default {
  data() {
    return {
      store: storeData(),
      initalMapFocuslon: 13.419938105983068, // Längenangabe
      initalMapFocuslat: 52.551246414660746, // Breitenangabe
      PoiLon: 13.419938105983068,
      PoiLat: 52.551246414660746,
      zoom: 14,
      map: null,
      serachCircle: null,
      ownPosition: null,
      testIcon: null
    }
  },
  mounted() {
    ///// EINBINDEN DER LEAFLET Karte ////////////////////////////////////////////////////////////////////////
    this.$nextTick(() => {
      // Initailisieren der Karte
      this.map = L.map('map').setView([this.initalMapFocuslat, this.initalMapFocuslon], this.zoom)
      if (this.map) {
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map)
        // Icon Design erzeugen
        this.testIcon = L.icon({
          iconUrl: '/src/assets/icons/testicon_for_map.png',
          iconSize: [30, 30],
          iconAnchor: [10, 10],
          popupAnchor: [30, 30]
        })

        // Hinzufügen des Suchradius
        this.serachCircle = L.circle([this.initalMapFocuslat, this.initalMapFocuslon], {
          radius: this.store.temporaryData.searchDistance, // in meter
          fillColor: 'blue',
          color: 'red',
          weight: 1,
          opacity: 1,
          fillOpacity: 0.15
        })
        this.serachCircle.addTo(this.map)
        // eigener Standort
        this.ownPosition = L.marker([this.initalMapFocuslat, this.initalMapFocuslon], {
          icon: this.testIcon
        })
          .addTo(toRaw(this.map))
          .bindPopup('Dein Standort!')
        // pois Anzeigen
        console.log(
          'this.store.temporaryData.poiListforMap',
          this.store.temporaryData.poiListforMap
        )
        this.store.temporaryData.poiListforMap.forEach((element) => {
          L.marker([element.xCoordinates, element.yCoordinates], {
            icon: this.testIcon
          })
            .addTo(toRaw(this.map)) // toRaw entfernt die proxiierung und löst einen konflikt von vue3 und map
            .bindPopup(element.poiName)
            .bindTooltip(element.poiName, {
              permanent: true,
              direction: 'top',
              offset: L.point(5, -8)
            })
            .openTooltip()
        })
      }
    })
  }
}
</script>

<style scoped>
.header-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: transparent;
}
</style>
