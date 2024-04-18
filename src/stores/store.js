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
      ownXCoordinate: 52.554228,
      ownYCoordinate: 13.412095,
      // temporäre Daten für die Adressbestimmung aus Koordinaten
      district: 0,
      street: '',
      houseNumber: null,
      city: '',
      ZipCode: 0,
      // temporäre Daten für die gefilterte Poi-Liste zum Rendern
      filteredPois: [],
      choosenCategory: 'Alle',
      choosenDetailCategories: [], // 'Geländer', 'steil', 'extra breit'
      // User Managament
      currentUser: []
    }),

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////// DATEN VON DEN USERN //////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    userData: [
      {
        id: 101,
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
        id: 102,
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
        id: 103,
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
    /////////////////////// LOKALE DATEN (WERDEN NICHT AUF DER API GESPEICHERT) //////////////////////////////////////////////////////////////////////////////////
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
      this.xCoordinateDifference = Math.abs(xCoordinatePosition - poiXcoordinate)
      this.yCoordinateDifference = Math.abs(yCoordinatePosition - poiYcoordinate)
      this.xlengthDifference = this.xCoordinateDifference * this.temporaryData.lengthLatitude
      this.ylengthDifference = this.yCoordinateDifference * this.temporaryData.lengthlongitude

      // Trigonometrische Funktion
      this.straightLineToAim = Math.sqrt(
        Math.pow(this.xlengthDifference, 2) + Math.pow(this.ylengthDifference, 2)
      ).toFixed(0)
      return this.straightLineToAim
    },

    async getAddressByCoordinates(latitude, longitude) {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      )
      if (res.ok) {
        const data = await res.json()
        this.street = data.address.road
        this.city = data.address.city
        this.zipCode = data.address.postcode
        this.district = data.address.suburb
        this.houseNumber = data.address.house_number
      } else {
        console.error('Die Koordinaten konnten leider nicht Verabeitet werden:')
      }
    },

    getOwnPosition() {
      const saveOwnPositon = (position) => {
        this.ownXCoordinate = position.coords.latitude
        this.ownYCoordinate = position.coords.longitude
        this.getAddressByCoordinates(this.ownXCoordinate, this.ownYCoordinate)
      }
      navigator.geolocation.getCurrentPosition(saveOwnPositon)
    },

    checkForFilterOptions() {
      // renderFilteredPois
      this.temporaryData.filteredPois = []
      for (let i = 0; i < this.poiData.length; i++) {
        this.poiData[i].currentSearchDistance = this.calcDistance(
          this.poiData[i].xCoordinates,
          this.poiData[i].yCoordinates,
          this.ownXCoordinate,
          this.ownYCoordinate
        )
        if (
          Number(this.poiData[i].currentSearchDistance) <= Number(this.temporaryData.searchDistance)
        ) {
          this.temporaryData.filteredPois.push(this.poiData[i].id)
          this.temporaryData.filteredPois.push(this.poiData[i].currentSearchDistance)
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
      // checkForFilterOptions
      for (let i = 0; i < this.temporaryData.filteredPois.length; i++) {
        if (this.temporaryData.choosenCategory === 'Alle') {
          console.log('ALLE')
          return true
        } else if (
          poi.id === this.temporaryData.filteredPois[i] &&
          poi.poiName == this.temporaryData.choosenCategory &&
          this.compareDetailCategories(poi)
        ) {
          return true
        } else return false
      }
    },
    ///////////////////////////////////// API-Datenbank anbindungen ////////////////////////////////////////////////////////////////////////
    async getUserDataFromAPI() {
      const res = await fetch('http://localhost:3000/users')
      if (res.ok) {
        const data = await res.json()
        this.temporaryData.currentUser = data
      } else {
        console.warn(
          'Die GET-Anfrage an den API-Server konnte nicht erfolgreich durchgeführt werden'
        )
      }
    }
  }
})
