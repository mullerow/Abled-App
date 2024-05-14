import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const storeData = defineStore('poiStore', {
  state: () => ({
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////// TEMPORÄRE DATEN //////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    temporaryData: reactive({
      // temporäre Daten für die Koordinatenberechnung
      xCoordinateDifference: 0,
      yCoordinateDifference: 0,
      xlengthDifference: 0,
      ylengthDifference: 0,
      straightLineToAim: 0, // Luftline bis zum Ziel
      lengthLatitude: 111320, // 111 km lang (Breitengrade sind relativ konstant)
      lengthlongitude: 68710, // 68,71 km lang ist die durchschnittliche Länge der Längengrade (mittlerer Grad über Deutschland)
      // temporäre Daten für die Suchfunktion
      searchDistance: 500,
      ownXCoordinate: null,
      ownYCoordinate: null,
      // temporäre Daten für die Adressbestimmung aus Koordinaten
      district: 0,
      street: '',
      houseNumber: null,
      city: '',
      zipCode: 0,
      // temporäre Daten für die gefilterte Poi-Liste zum Rendern
      filteredPois: [],
      choosenCategory: '',
      choosenDetailCategories: [], // 'Geländer', 'steil', 'extra breit'
      choosenPoi: {}, // Objekt welches alle Informationen des gewählten Pois enthalten soll

      //own Poi rendern
      ownPoisList: [],

      ///////// API MANAGAMENT /////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      currentUserData: [],
      currentPois: [],
      currentPoi: {},
      currentUserId: '', // Hier muss dynamisch die ID zugewiesen werden
      currentUserName: '',
      currentPoiId: '',
      newUserData: {
        userName: '',
        eMailAddress: '',
        address: {
          city: '',
          street: '',
          zipCode: ''
        },
        mobilityAssistance: '',
        mobilityAssistanceWidth: '',
        ownPois: []
      },
      newPoiData: {
        poiName: 'Rampe',
        detailCategories: [],
        xCoordinates: null,
        yCoordinates: null,
        status: true,
        minWidth: null,
        openingTimes: '',
        prioWidth: null,
        creationDate: '',
        createdBy: null
      },
      changedUserData: {
        // WICHTIG!!!! ES WERDEN ALLE DATEN ÜBERSCHRIEBEN; ALSO MUSS DER GESAMTE DATENSATZ EINES POIS / USER AKTUALISIERT WERDEN
        userName: 'frischer Username'
      },
      changedPoiData: {
        poiName: 'Schweinchen'
      },
      poiListforMap: []
    }),

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////// DATEN VON DEN USERN //////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    userData: [],
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////// DATEN von den POIs //////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    poiData: [],
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////// LOKALE DATEN (WERDEN NICHT AUF DER API GESPEICHERT) /////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    localData: {
      mobilityAssistanceClasses: [
        'Rollstuhl',
        'Kinderwagen',
        'Zwillingskinderwagen',
        'Rentnermobil',
        'Rollator',
        'Lastenrad'
      ],
      categories: [
        {
          id: 301,
          categoryName: 'Alle',
          detailCategorys: []
        },
        {
          id: 302,
          categoryName: 'Rampe',
          detailCategorys: ['flach', 'mäßig Steil', 'steil', 'Geländer']
        },
        {
          id: 303,
          categoryName: 'Fahrstuhl',
          detailCategorys: ['groß', 'mittel', 'klein']
        },
        {
          id: 304,
          categoryName: 'Zugang',
          detailCategorys: ['Ohne Treppe']
        },
        {
          id: 305,
          categoryName: 'Toilette',
          detailCategorys: [
            'Wickelplatz',
            'Behindertengerecht',
            'Kostenfrei',
            'Desinfektionsmittel'
          ]
        },
        {
          id: 306,
          categoryName: 'Gastronomie',
          detailCategorys: [
            'Wickelplatz',
            'Behindertengerechte Toiletten',
            'Rollstuhl/Kinderwagen geeignet',
            'Kinderstühle',
            'Stellplatz Kinderwagen',
            'Desinfektionsmittel'
          ]
        },
        {
          id: 307,
          categoryName: 'Wickelplatz',
          detailCategorys: ['Windelspender', 'Platz für Kinderwagen', 'Desinfektionsmittel']
        }
      ]
    }
  }),

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //\/\/\/\/\/\/\/\/\/ GLOBALE FUNKTIONEN //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  actions: {
    ///////////////////////////////////// Filterfunktion und Koordinatenberechnungen ////////////////////////////////////////////////////////////////////////
    calcDistance(poiXcoordinate, poiYcoordinate, xCoordinatePosition, yCoordinatePosition) {
      this.temporaryData.xCoordinateDifference = Math.abs(xCoordinatePosition - poiXcoordinate)
      this.temporaryData.yCoordinateDifference = Math.abs(yCoordinatePosition - poiYcoordinate)
      this.temporaryData.xlengthDifference =
        this.temporaryData.xCoordinateDifference * this.temporaryData.lengthLatitude
      this.temporaryData.ylengthDifference =
        this.temporaryData.yCoordinateDifference * this.temporaryData.lengthlongitude

      // Trigonometrische Funktion
      this.temporaryData.straightLineToAim = Math.sqrt(
        Math.pow(this.temporaryData.xlengthDifference, 2) +
          Math.pow(this.temporaryData.ylengthDifference, 2)
      ).toFixed(0)
      return this.temporaryData.straightLineToAim
    },

    async getAddressByCoordinates(latitude, longitude) {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      )
      if (res.ok) {
        const data = await res.json()
        this.temporaryData.street = data.address.road
        this.temporaryData.city = data.address.city || data.address.village
        this.temporaryData.zipCode = data.address.postcode
        this.temporaryData.district = data.address.suburb
        this.temporaryData.houseNumber = data.address.house_number
      } else {
        console.error('Die Koordinaten konnten leider nicht Verabeitet werden:')
      }
    },

    getOwnPosition() {
      const saveOwnPositon = (position) => {
        this.temporaryData.ownXCoordinate = position.coords.latitude
        this.temporaryData.ownYCoordinate = position.coords.longitude
        this.getAddressByCoordinates(
          this.temporaryData.ownXCoordinate,
          this.temporaryData.ownYCoordinate
        )
        localStorage.setItem('x-Koordinate', this.temporaryData.ownXCoordinate)
        localStorage.setItem('y-Koordinate', this.temporaryData.ownYCoordinate)
      }
      navigator.geolocation.getCurrentPosition(saveOwnPositon)
    },

    checkForFilterOptions() {
      this.temporaryData.filteredPois = []
      for (let i = 0; i < this.temporaryData.currentPois.length; i++) {
        this.temporaryData.currentPois[i].currentSearchDistance = this.calcDistance(
          this.temporaryData.currentPois[i].xCoordinates,
          this.temporaryData.currentPois[i].yCoordinates,
          this.temporaryData.ownXCoordinate,
          this.temporaryData.ownYCoordinate
        )
        if (
          Number(this.temporaryData.currentPois[i].currentSearchDistance) <=
          Number(this.temporaryData.searchDistance)
        ) {
          this.temporaryData.filteredPois.push(this.temporaryData.currentPois[i])
        }
      }
    },

    compareDetailCategories(poi) {
      let counter = 0
      for (let entry of this.temporaryData.choosenDetailCategories) {
        if (poi.detailCategories.includes(entry)) {
          counter++
        }
      }
      if (this.temporaryData.choosenDetailCategories.length === counter) {
        return true
      } else return false
    },

    renderFilteredPois(poi) {
      for (let i = 0; i < this.temporaryData.currentPois.length; i++) {
        if (this.temporaryData.filteredPois[i] && this.temporaryData.filteredPois[i].id) {
          if (
            this.temporaryData.choosenCategory == ' Alle' &&
            poi.id === this.temporaryData.filteredPois[i].id
          ) {
            this.temporaryData.poiListforMap.push(this.temporaryData.filteredPois[i])
            return true
          } else if (
            poi.id === this.temporaryData.filteredPois[i].id &&
            poi.poiName == this.temporaryData.choosenCategory &&
            this.compareDetailCategories(poi)
          ) {
            this.temporaryData.poiListforMap.push(this.temporaryData.filteredPois[i])
            return true
          }
        }
      }
      console.log('nix gefunden')
      return false
    },

    resetTemporaryLists() {
      this.temporaryData.choosenDetailCategories = []
      this.temporaryData.poiListforMap = []
    },

    openExternMapToNavigate(poiXPosition, poiYPosition) {
      const zoomFactor = 16
      const centerDisplay =
        this.temporaryData.ownXCoordinate + '%2C' + this.temporaryData.ownYCoordinate
      const locationStart =
        this.temporaryData.ownXCoordinate + '%2C' + this.temporaryData.ownYCoordinate
      const locationPoi = poiXPosition + '%2C' + poiYPosition
      const streetmapsURL = `https://routing.openstreetmap.de/?z=${zoomFactor}&center=${centerDisplay}&loc=${locationStart}&loc=${locationPoi}&hl=en&alt=0&srv=2`
      console.log('URL:', streetmapsURL)
      const link = document.createElement('a')
      link.href = streetmapsURL
      link.target = '_blank'
      link.click()
    },
    getUserName() {
      const nameOfUser = this.temporaryData.currentUserData.find((user) => {
        return user.id === this.temporaryData.currentUserId
      })
      this.temporaryData.currentUserName = nameOfUser.username
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////// API-Datenbank Anbindungen ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async getUserDataFromAPI() {
      const res = await fetch('http://localhost:3000/users')
      if (res.ok) {
        const data = await res.json()
        this.temporaryData.currentUserData = data
        console.log('Die GET-Anfrage (User) an den API-Server war erfolgreich')
      } else {
        console.warn(
          'Die GET-Anfrage (User) an den API-Server konnte nicht erfolgreich durchgeführt werden'
        )
      }
    },

    async addNewUserToAPI() {
      const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.temporaryData.newUserData)
      })
      if (res.ok) {
        console.log('Die POST-Anfrage (User) an den API-Server war erfolgreich')
      } else
        console.warn(
          'Die POST-Anfrage (User) an den API-Server konnte nicht erfolgreich durchgeführt werden'
        )
    },

    async updateUserAtAPI(userId) {
      const res = await fetch('http://localhost:3000/users/' + userId, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.temporaryData.changedUserData)
      })
      if (res.ok) {
        console.log('Die PUT-Anfrage (User) an den API-Server war erfolgreich')
      } else
        console.warn(
          'Die PUT-Anfrage (User) an den API-Server konnte nicht erfolgreich durchgeführt werden'
        )
    },

    async deleteUserfromAPI(userId) {
      const res = await fetch('http://localhost:3000/users/' + userId, {
        method: 'DELETE'
      })
      if (res.ok) {
        console.log('Die DELETE-Anfrage (User) an den API-Server war erfolgreich')
      } else
        console.warn(
          'Die DELETE-Anfrage (User) an den API-Server konnte nicht erfolgreich durchgeführt werden'
        )
    },

    async getPoiDataFromAPI() {
      const res = await fetch('http://localhost:3000/pois')
      if (res.ok) {
        const data = await res.json()
        this.temporaryData.currentPois = data
        console.log('Die GET-Anfrage (POIs) an den API-Server war erfolgreich')
      } else {
        console.warn(
          'Die GET-Anfrage (POIs) an den API-Server konnte nicht erfolgreich durchgeführt werden'
        )
      }
    },
    async addNewPoiToAPI() {
      const res = await fetch('http://localhost:3000/pois', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.temporaryData.newPoiData)
      })
      if (res.ok) {
        console.log('Die POST-Anfrage (Poi) an den API-Server war erfolgreich')
      } else
        console.warn(
          'Die POST-Anfrage (Poi) an den API-Server konnte nicht erfolgreich durchgeführt werden'
        )
    },
    async updatePoiAtAPI(poiId) {
      const res = await fetch('http://localhost:3000/pois/' + poiId, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.temporaryData.changedPoiData)
      })
      if (res.ok) {
        console.log('Die PUT-Anfrage (POI) an den API-Server war erfolgreich')
      } else
        console.warn(
          'Die PUT-Anfrage (POI) an den API-Server konnte nicht erfolgreich durchgeführt werden'
        )
    },

    async deletePoifromAPI(poiId) {
      const res = await fetch('http://localhost:3000/pois/' + poiId, {
        method: 'DELETE'
      })
      if (res.ok) {
        console.log('Die DELETE-Anfrage (Poi) an den API-Server war erfolgreich')
      } else
        console.warn(
          'Die DELETE-Anfrage (Poi) an den API-Server konnte nicht erfolgreich durchgeführt werden'
        )
    }
  }
})
