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
      lng: 13.419938105983068, // Längenangabe
      lat: 52.551246414660746, // Breitenangabe
      zoom: 13,
      map: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.map = L.map('map').setView([this.lat, this.lng], this.zoom)
      if (this.map) {
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map)
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
