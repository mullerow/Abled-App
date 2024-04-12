import { defineStore } from 'pinia'

export const storeData = defineStore('poiStore', {
  state: () => ({
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
        detailCategories: { 'elevator-size': 'large' },
        xCoordinates: 52.55347266835718,
        yCoordinates: 13.412074165422549,
        minWidth: 92,
        isFavorite: true
      },
      {
        id: 202,
        category: 'Toilette',
        detailCategories: {
          'handicapped-accessible': true,
          'changing station': true,
          'free-of-charge': false
        },
        xCoordinates: 52.55347266835722,
        yCoordinates: 13.412074165422512,
        minWidth: 122,
        isFavorite: false
      },
      {
        id: 203,
        category: 'Türbreite',
        detailCategories: {},
        xCoordinates: 52.55347266835722,
        yCoordinates: 13.412074165422512,
        minWidth: 122,
        isFavorite: true
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
  /////////////////////// GLOBALE FUNKTIONEN //////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  actions: {
    changeFavorite(poi) {
      poi.isFavorite = !poi.isFavorite
    }
  }
})
