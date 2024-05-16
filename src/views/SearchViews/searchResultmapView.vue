<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }">Gehe zurück zur Startseite</RouterLink>
    <RouterLink :to="{ name: 'searchresultlist' }">Gehe eine Seite zurück</RouterLink>
  </div>

  <h2>Ergebnismap</h2>

  <div style="height: 600px; width: 100%" id="map"></div>
</template>

<script>
import L from 'leaflet' // npm install leaflet@latest notwendig
import 'leaflet/dist/leaflet.css'
import { storeData } from '@/stores/store.js'
import { toRaw } from 'vue'
export default {
  data() {
    return {
      store: storeData(),
      zoom: 14,
      map: null,
      serachCircle: null,
      ownPosition: null,
      categoryIconURL: 'src/assets/icons/map-icons/Gastro.svg'
    }
  },
  mounted() {
    ///// EINBINDEN DER LEAFLET Karte ////////////////////////////////////////////////////////////////////////
    this.$nextTick(() => {
      // Initailisieren der Karte
      this.map = L.map('map').setView(
        [this.store.temporaryData.ownXCoordinate, this.store.temporaryData.ownYCoordinate],
        this.zoom
      )
      if (this.map) {
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map)

        // Legende erstellen
        let legend = L.control({ position: 'bottomleft' })

        legend.onAdd = function () {
          let div = L.DomUtil.create('div', 'info legend')
          div.innerHTML = `
          <h3>Legende</h3>
          <div class="legend-container">
            <img src="src/assets/icons/map-icons/Gastro.svg" style="width: 30px;" id="gastro">
            <label for="gastro"" >&nbsp;Gastronomie</label>
            <img src="src/assets/icons/map-icons/Baby-Changing-Table.svg" style="width: 30px;" id="baby-changing">
            <label for="baby-changing" >&nbsp;Wickleplatz</label>
            <img src="src/assets/icons/map-icons/Entrance.svg" style="width: 30px;" id="entrance">
            <label for="entrance" >&nbsp;Zugang&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <img src="src/assets/icons/map-icons/Lift.svg" style="width: 30px;" id="lift">
            <label for="lift" >&nbsp;Fahrstuhl&nbsp;&nbsp;&nbsp;</label>
            <img src="src/assets/icons/map-icons/Location.svg" style="width: 30px;" id="location">
            <label for="location" >&nbsp;Location&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <img src="src/assets/icons/map-icons/Ramp-Up.svg" style="width: 30px;" id="ramp">
            <label for="ramp" >&nbsp;Rampe&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <img src="src/assets/icons/map-icons/Toilet-Man-Woman-1--Streamline-Flex.svg" style="width: 30px;" id="toilette">
            <label for="toilette" >&nbsp;Toilette</label>
          </div>
          `
          return div
        }

        legend.addTo(this.map)

        // Hinzufügen des Suchradius
        this.serachCircle = L.circle(
          [this.store.temporaryData.ownXCoordinate, this.store.temporaryData.ownYCoordinate],
          {
            radius: this.store.temporaryData.searchDistance, // in meter
            fillColor: 'blue',
            color: 'red',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.15
          }
        )
        this.serachCircle.addTo(this.map)
        // eigener Standort
        this.ownPosition = L.marker(
          [this.store.temporaryData.ownXCoordinate, this.store.temporaryData.ownYCoordinate],
          {
            icon: L.icon({
              iconUrl: 'src/assets/icons/map-icons/Location.svg',
              iconSize: [30, 30],
              iconAnchor: [10, 10],
              popupAnchor: [30, 30]
            })
          }
        )
          .addTo(toRaw(this.map))
          .bindPopup('Dein Standort!')
        // pois Anzeigen
        this.store.temporaryData.poiListforMap.forEach((element) => {
          if (element.poiName === ' Wickelplatz') {
            this.categoryIconURL = 'src/assets/icons/map-icons/Baby-Changing-Table.svg'
          } else if (element.poiName === ' Toilette') {
            this.categoryIconURL =
              'src/assets/icons/map-icons/Toilet-Man-Woman-1--Streamline-Flex.svg'
          } else if (element.poiName === ' Zugang') {
            this.categoryIconURL = 'src/assets/icons/map-icons/Entrance.svg'
          } else if (element.poiName === ' Rampe') {
            this.categoryIconURL = 'src/assets/icons/map-icons/Ramp-Up.svg'
          } else if (element.poiName === ' Gastronomie') {
            this.categoryIconURL = 'src/assets/icons/map-icons/Gastro.svg'
          } else if (element.poiName === ' Fahrstuhl') {
            this.categoryIconURL = 'src/assets/icons/map-icons/Lift.svg'
          }

          L.marker([element.xCoordinates, element.yCoordinates], {
            icon: L.icon({
              iconUrl: this.categoryIconURL,
              iconSize: [30, 30],
              iconAnchor: [10, 10],
              popupAnchor: [30, 30]
            })
          })
            .addTo(toRaw(this.map)) // toRaw entfernt die proxiierung und löst einen konflikt von vue3 und map
            .bindPopup(
              `
            <div>
              <h3>${element.poiName}</h3>
              <b>Details: </b> <span>${element.detailCategories}</span> <br>
              <b>Mindestbreite Tür: </b> <span>${element.minWidth} cm</span> <br>
              <b>Erstelldatum: </b><span>${element.creationDate}</span> <br>
              <b>Derzeit nutzbar?: </b><span>${element.status}</span> <br>
              <b>Kommentar: </b><span>${element.comment}</span> <br>
              </div>
              <button @click="
              store.openExternMapToNavigate(${element.xCoordinates}, ${element.yCoordinates})
                ">Zeig mir den Weg</button>`
            )
          /*.bindTooltip(element.poiName, {
              permanent: true,
              direction: 'top',
              offset: L.point(5, -8)
            })
            .openTooltip()
             das dauerhafte Label wird aufgrund der Legende nict mehr benötigt, sodass die karte übersichtlicher wird */
        })
      }
    })
  }
}
</script>

<style>
/* scoped muss weggelassen werden, damit die styles auf leaflet angwendet werden können */
.header-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: transparent;
}
.legend {
  background-color: var(--white);
  height: 260px;
  border-radius: 20px;
}
.legend-container {
  display: flex;
  width: 120px;
  flex-wrap: wrap;
  margin-left: 5px;
}
h3 {
  text-align: center;
}
label {
  font-weight: bold;
  margin-top: 5px;
}
</style>
