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
export default {
  data() {
    return {
      initalMapFocuslon: 13.419938105983068, // Längenangabe
      initalMapFocuslat: 52.551246414660746, // Breitenangabe
      PoiLon: 13.419938105983068,
      PoiLat: 52.551246414660746,
      zoom: 15,
      map: null,
      serachCircle: null,
      ownPosition: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      // Initailisieren der Karte
      this.map = L.map('map').setView([this.initalMapFocuslat, this.initalMapFocuslon], this.zoom)
      if (this.map) {
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map)
        // Hinzufügen des Suchradius
        this.serachCircle = L.circle([this.initalMapFocuslat, this.initalMapFocuslon], {
          radius: 200,
          fillColor: 'blue',
          color: 'red',
          weight: 1,
          opacity: 1,
          fillOpacity: 0.15
        })
        this.serachCircle.addTo(this.map)
        this.serachCircle.bindPopup('Dein Suchradius!')
        // eigener Standort
        this.ownPosition = L.marker([this.initalMapFocuslat, this.initalMapFocuslon])
        this.ownPosition.addTo(this.map)
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
