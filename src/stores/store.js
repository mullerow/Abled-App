import { defineStore } from 'pinia'
export const storeData = defineStore('poiStore', {
  state: () => ({
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////// TEMPORÄRE DATEN //////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    temporaryData: {
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
      ownXCoordinate: 0,
      ownYCoordinate: 0,
      // temporäre Daten für die Addressenbestimmung aus Koorinaten
      district: 0,
      street: '',
      houseNumber: null,
      city: '',
      ZipCode: 0
    },

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
        authorizationPositonQuery: 'true',
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
        authorizationPositonQuery: 'true',
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
        authorizationPositonQuery: 'true',
        ownPois: ['2012', '2034', '20191']
      }
    ],
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////// DATEN von den POIs //////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    poiData: [
      {
        id: 201,
        categoryId: '301',
        detailCategories: ['steil', 'Geländer'],
        xCoordinates: 52.554228,
        yCoordinates: 13.412095,
        status: true,
        minWidth: 92,
        isFavorite: false,
        openingTimes: 'Mo-Fr: 10-22 Uhr',
        prioWidth: 122,
        creationDate: '12.09.24',
        createdBy: 102
      },
      {
        id: 202,
        categoryId: '304',
        detailCategories: ['Wickelplatz', 'Behindertengerecht'],
        xCoordinates: 52.55347266835722,
        yCoordinates: 13.412074165422512,
        status: true,
        minWidth: 122,
        isFavorite: false,
        openingTimes: 'Mo-Fr: 10-22 Uhr',
        prioWidth: 102,
        creationDate: '13.12.23',
        createdBy: 102
      },
      {
        id: 203,
        categoryId: '304',
        detailCategories: ['Rollstuhl/Kinderwagen geeignet', 'Kinderstühle'],
        xCoordinates: 52.55347266835722,
        yCoordinates: 13.412074165422512,
        status: true,
        minWidth: 122,
        isFavorite: true,
        openingTimes: 'Mo-Fr: 10-22 Uhr',
        prioWidth: 86,
        creationDate: '19.01.24',
        createdBy: 101
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
          categoryName: 'Rampe',
          detailCategorys: ['flach', 'mäßig Steil', 'steil', 'Geländer']
        },
        {
          id: 302,
          categoryName: 'Fahrstuhl',
          detailCategorys: ['groß', 'mittel', 'klein']
        },
        {
          id: 303,
          categoryName: 'Zugang',
          detailCategorys: ['maximale breite (nicht zuende gedacht!)', 'Ohne Treppe'] //  der este arrayeintrag bezieht sich auf die Eingangsbreite
        },
        {
          id: 304,
          categoryName: 'Toilette',
          detailCategorys: ['Wickelplatz', 'Behindertengerecht', 'Kostenfrei']
        },
        {
          id: 305,
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
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //\/\/\/\/\/\/\/\/\/ GLOBALE FUNKTIONEN //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  actions: {
    changeFavorite(poi) {
      poi.isFavorite = !poi.isFavorite
    },
    calcDistance(poi, xCoordinatePosition, yCoordinatePosition) {
      this.xCoordinateDifference = Math.abs(xCoordinatePosition - poi.xCoordinates)
      this.yCoordinateDifference = Math.abs(yCoordinatePosition - poi.yCoordinates)
      this.xlengthDifference = this.xCoordinateDifference * this.temporaryData.lengthLatitude
      this.ylengthDifference = this.yCoordinateDifference * this.temporaryData.lengthlongitude

      // Trigonometrische Funktion
      this.straightLineToAim = Math.sqrt(
        Math.pow(this.xlengthDifference, 2) + Math.pow(this.ylengthDifference, 2)
      ).toFixed(0)
    },
    getAddressbyCoordinates(latitude, longitude) {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          console.log(data.address.city)
          console.log(data.address.postcode)
          console.log(data.address.road)
          console.log(data.address.suburb)
          this.street = data.address.road
          this.city = data.address.city
          this.zipCode = data.address.postcode
          this.district = data.address.suburb
          this.houseNumber = data.address.house_number
        })
        .catch((error) => {
          console.error('Die Koordinaten konnten leider nicht Verabeitet werden:', error)
        })
    },
    getOwnPosition() {
      const saveOwnPositon = (position) => {
        console.log(position.coords.latitude)
        console.log(position.coords.longitude)
        this.ownXCoordinate = position.coords.latitude
        this.ownYCoordinate = position.coords.longitude
      }
      navigator.geolocation.getCurrentPosition(saveOwnPositon)
    }
  }
})

// https://www.gpskoordinaten.de/entfernung
// 1.test Ergebnis: 22,21 km --> ergebnis kalkulation: 22,26km SUPER!!
// 2. Test Ergbebnis: 1,38 km --> ergebnis kalkulation:   1,39km SUPER!!
// 3. Test Ergbebnis: 0,64 km --> ergebnis kalkulation:   0,64km PERFEKT!!!
