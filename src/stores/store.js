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
      }
    }),

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////// DATEN VON DEN USERN //////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    userData: [
      {
        ownId: 101,
        userName: 'Karl Otto',
        eMailAddress: 'karl@otto.de',
        address: {
          city: 'Eisenhüttenstadt',
          street: 'Juri Gagarin Ring 12',
          zipCode: '12983'
        },
        mobilityAssistance: 'Rollstuhl',
        mobilityAssistanceWidth: '72',
        ownPois: ['20292', '2091']
      },
      {
        ownId: 102,
        userName: 'Sven Marquardt',
        eMailAddress: 'sven@marquardt.de',
        address: {
          city: 'Schwedt',
          street: 'Otto Braun Straße 122',
          zipCode: '11113'
        },
        mobilityAssistance: 'Zwillingskinderwagen',
        mobilityAssistanceWidth: '92',
        ownPois: ['20232', '20911']
      },
      {
        ownId: 103,
        userName: 'Ringo Bingo',
        eMailAddress: 'ringo@bingo.de',
        address: {
          city: 'Finsterwalde',
          street: 'Apfelweg 2',
          zipCode: '01123'
        },
        mobilityAssistance: 'Rentnermobil',
        mobilityAssistanceWidth: '100',
        ownPois: ['2012', '2034', '20191']
      }
    ],
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////// DATEN von den POIs //////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    poiData: [
      {
        id: 201,
        poiName: 'Rampe',
        detailCategories: ['steil', 'Geländer'],
        xCoordinates: 52.554228,
        yCoordinates: 13.412095,
        status: true,
        minWidth: 92,
        openingTimes: 'Mo-Fr: 10-22 Uhr',
        prioWidth: 122,
        creationDate: '12.09.24',
        createdBy: 102,
        currentSearchDistance: 0
      },
      {
        id: 202,
        poiName: 'Toilette',
        detailCategories: ['Wickelplatz', 'Behindertengerecht'],
        xCoordinates: 52.55347266835722,
        yCoordinates: 13.412074165422512,
        status: true,
        minWidth: 122,
        openingTimes: 'Mo-Fr: 10-22 Uhr',
        prioWidth: 102,
        creationDate: '13.12.23',
        createdBy: 102,
        currentSearchDistance: 0
      },
      {
        id: 203,
        poiName: 'Toilette',
        detailCategories: ['Rollstuhl/Kinderwagen geeignet', 'Wickelplatz', 'kostenfrei'],
        xCoordinates: 52.556657,
        yCoordinates: 13.37754,
        status: true,
        minWidth: 122,
        openingTimes: 'Mo-Fr: 10-22 Uhr',
        prioWidth: 86,
        creationDate: '19.01.24',
        createdBy: 101,
        currentSearchDistance: 0
      },
      {
        id: 204,
        poiName: 'Rampe',
        detailCategories: ['flach', 'Geländer'],
        xCoordinates: 52.556351,
        yCoordinates: 13.37712,
        status: true,
        minWidth: 92,
        openingTimes: 'Mo-Fr: 10-22 Uhr',
        prioWidth: 122,
        creationDate: '12.09.24',
        createdBy: 102,
        currentSearchDistance: 0
      },
      {
        id: 205,
        poiName: 'Rampe',
        detailCategories: ['steil', 'Geländer'],
        xCoordinates: 52.554248,
        yCoordinates: 13.412295,
        status: true,
        minWidth: 92,
        openingTimes: 'Mo-Fr: 10-22 Uhr',
        prioWidth: 122,
        creationDate: '12.09.24',
        createdBy: 102,
        currentSearchDistance: 0
      },
      {
        id: 206,
        poiName: 'Rampe',
        detailCategories: ['steil', 'Geländer', 'extra breit'],
        xCoordinates: 52.554348,
        yCoordinates: 13.412995,
        status: true,
        minWidth: 92,
        openingTimes: 'Mo-Fr: 10-22 Uhr',
        prioWidth: 122,
        creationDate: '12.09.24',
        createdBy: 102,
        currentSearchDistance: 0
      }
    ],
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
          detailCategorys: ['maximale breite', 'Ohne Treppe'] //  der este arrayeintrag bezieht sich auf die Eingangsbreite
        },
        {
          id: 305,
          categoryName: 'Toilette',
          detailCategorys: ['Wickelplatz', 'Behindertengerecht', 'Kostenfrei']
        },
        {
          id: 306,
          categoryName: 'Gastronomie',
          detailCategorys: [
            'Wickelplatz',
            'Behindertengerechte Toiletten',
            'Rollstuhl/Kinderwagen geeignet',
            'Kinderstühle'
          ]
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
        console.log('POI Distanz:', this.temporaryData.currentPois[i].currentSearchDistance)
        console.log('Eingestellte Distanz:', this.temporaryData.searchDistance)
        if (
          Number(this.temporaryData.currentPois[i].currentSearchDistance) <=
          Number(this.temporaryData.searchDistance)
        ) {
          this.temporaryData.filteredPois.push(this.temporaryData.currentPois[i].id)
          console.log('filteredPois', this.temporaryData.filteredPois)
        }
      }
    },

    compareDetailCategories(poi) {
      let counter = 0
      for (let entry of this.temporaryData.choosenDetailCategories) {
        if (poi.detailCategories.includes(entry)) {
          console.log('entry gefunden!!')
          counter++
        }
      }
      if (this.temporaryData.choosenDetailCategories.length === counter) {
        return true
      } else return false
    },

    renderFilteredPois(poi) {
      for (let i = 0; i < this.temporaryData.currentPois.length; i++) {
        if (this.temporaryData.choosenCategory == ' Alle') {
          console.log('ALLE')
          return true
        } else if (
          poi.id === this.temporaryData.filteredPois[i] &&
          poi.poiName == this.temporaryData.choosenCategory &&
          this.compareDetailCategories(poi)
        ) {
          return true
        }
      }
      return false
    },
    resetDetailcategory() {
      this.temporaryData.choosenDetailCategories = []
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
