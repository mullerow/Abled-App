<template>
  <div class="star-container">
    <!-- SVG to change background color -->
    <svg
      :class="[
        'favorite-star-background-svg',
        { 'animate-rising-star': animateRisingStar },
        { 'animate-falling-star': animateFallingStar }
      ]"
      viewBox="0 0 100 100"
      :width="svgWidth"
      :height="svgHeight"
      :style="{ filter: 'url(#f1)', opacity: addedToFavorite ? 1 : 0 }"
    >
      <defs>
        <clipPath id="clipPolygon-star-background">
          <path
            d="
            M
             45 4.5 C 53.91 9.54 54.36 16.47 56.97 28.44 C 65.61 26.73 80.82 25.2 88.2 31.5 C 88.38 41.22 72.99 47.52 66.06 51.93 C 67.95 60.66 77.22 68.94 71.1 81.9 C 59.58 84.33 51.57 73.71 45.36 67.23 C 40.77 71.37 31.59 84.33 18.9 81.9 C 10.71 73.53 20.52 60.3 22.86 54.09 C 16.47 48.33 3.24 47.52 3.24 33.66 C 10.44 24.03 23.67 29.07 33.66 27.9 C 35.46 15.75 36.45 7.2 45 4.5 Z
        "
          />
        </clipPath>
      </defs>
      <rect
        x="0"
        y="0"
        width="100"
        height="100"
        clip-path="url(#clipPolygon-star-background)"
        style="fill: goldenrod"
      />
    </svg>
    <!-- SVG for the star frame -->
    <svg
      class="favorite-star-svg"
      viewBox="0 0 100 100"
      :width="svgWidth"
      :height="svgHeight"
      @click="changeFavoriteStateOfPoi"
      style="filter: url(#f1)"
    >
      <defs>
        <clipPath id="clipPolygon-star">
          <path
            d="
          M 50 5 C 59.9 10.6 60.4 18.3 63.3 31.6 C 72.9 29.7 89.8 28 98 35 C 98.2 45.8 81.1 52.8 73.4 57.7 C 75.5 67.4 85.8 76.6 79 91 C 66.2 93.7 57.3 81.9 50.4 74.7 C 45.3 79.3 35.1 93.7 21 91 C 11.9 81.7 22.8 67 25.4 60.1 C 18.3 53.7 3.6 52.8 3.6 37.4 C 11.6 26.7 26.3 32.3 37.4 31 C 39.4 17.5 40.5 8 50 5 Z M 50.6 14.1 C 58.6 17.3 57.4 37.8 60.5 36.8 C 63.8 40.1 79.6 30.8 89.6 37.6 C 89.9 47.1 67.4 53.2 66.3 57 C 65.7 62.6 76.6 72.5 73.8 83.1 C 60.8 83.5 56 69 50.2 67.7 C 44 69 38.6 82.4 25.9 84.1 C 22.3 71 34.9 63.5 33.9 57.7 C 30.9 53.4 11 48.6 11 39.7 C 17.7 32.8 34.5 40 39.9 37.4 C 43.1 38.1 43.6 16.3 50.4 14.1
        "
          />
        </clipPath>
        <mask id="hole">
          <rect width="100%" height="100%" fill="white" />
          <path
            d="
          M 50.6 14.1 C 58.6 17.3 57.4 37.8 60.5 36.8 C 63.8 40.1 79.6 30.8 89.6 37.6 C 89.9 47.1 67.4 53.2 66.3 57 C 65.7 62.6 76.6 72.5 73.8 83.1 C 60.8 83.5 56 69 50.2 67.7 C 44 69 38.6 82.4 25.9 84.1 C 22.3 71 34.9 63.5 33.9 57.7 C 30.9 53.4 11 48.6 11 39.7 C 17.7 32.8 34.5 40 39.9 37.4 C 43.1 38.1 43.6 16.3 50.4 14.1
        "
            fill="black"
          />
        </mask>
      </defs>
      <rect
        x="0"
        y="0"
        width="100"
        height="100"
        clip-path="url(#clipPolygon-star)"
        style="fill: var(--black)"
        mask="url(#hole)"
      />
    </svg>
  </div>
</template>

<script>
import { storeData } from '@/stores/store.js'
export default {
  data() {
    return {
      store: storeData(),
      poiId: this.$route.params.id,
      addedToFavorite: false,
      animateRisingStar: false,
      animateFallingStar: false
    }
  },
  props: {
    svgWidth: {
      type: String,
      default: '50px'
    },
    svgheight: {
      type: String,
      default: '50px'
    }
  },
  created() {
    if (this.store.temporaryData.DataFromCurrentUser.favoritePoisOfUser.includes(this.poiId)) {
      this.addedToFavorite = true
    }
  },
  methods: {
    changeFavoriteStateOfPoi() {
      ///////// vorbereiten der Userdaten für das update der API-daten   //////////////////////////////////////////
      // lade die Daten des Users in die temporären daten
      this.store.getDataFromCurrentUser()
      try {
        // lade die userdaten aus dem local storage
        const updatedUserData = JSON.parse(localStorage.getItem('userData'))
        if (!updatedUserData) {
          console.error('Keine aktualisierten Benutzerdaten im lokalen Speicher gefunden.')
          return
        }
        // speichere die daten aus dem localstorage in die temporären daten für das api update
        console.log('DataFromCurrentUser componente', this.store.temporaryData.DataFromCurrentUser)
        this.store.temporaryData.changedUserData = {
          id: this.store.temporaryData.DataFromCurrentUser.id,
          username: updatedUserData.username,
          email: updatedUserData.email,
          mobilityAssistance: updatedUserData.mobilityAssistance,
          mobilityAssistanceWidth: parseInt(updatedUserData.mobilityAssistanceWidth),
          password: updatedUserData.password,
          favoritePoisOfUser: this.store.temporaryData.DataFromCurrentUser.favoritePoisOfUser
        }
      } catch (error) {
        console.error(
          'Fehler beim Speichern der aktualisierten Benutzerdaten im temporären Speicher:',
          error
        )
      }
      ///////// löschen des Pois aus der Favoritenliste //////////////////////////////////////////
      if (this.addedToFavorite) {
        this.animateFallingStar = true
        setTimeout(() => {
          this.addedToFavorite = false
          this.animateFallingStar = false
        }, 2000)
        let indexOfPoi = this.store.temporaryData.changedUserData.favoritePoisOfUser.findIndex(
          (item) => item === this.poiId
        )
        console.log('indexOfPoi', indexOfPoi)
        console.log(
          'favoritePoisOfUser davor',
          this.store.temporaryData.changedUserData.favoritePoisOfUser
        )
        if (indexOfPoi !== -1) {
          this.store.temporaryData.changedUserData.favoritePoisOfUser.splice(indexOfPoi, 1)
        }
        console.log(
          'favoritePoisOfUser ddanach',
          this.store.temporaryData.changedUserData.favoritePoisOfUser
        )
      }
      ///////// hinzufügen des Pois aus der Favoritenliste //////////////////////////////////////////
      else {
        this.addedToFavorite = true
        this.animateRisingStar = true
        setTimeout(() => {
          this.animateRisingStar = false
        }, 2000)

        this.store.temporaryData.changedUserData.favoritePoisOfUser.push(this.poiId)
      }
      localStorage.setItem('userData', JSON.stringify(this.store.temporaryData.changedUserData))
      this.store.updateUserAtAPI(this.store.temporaryData.DataFromCurrentUser.id)
    }
  }
}
</script>

<style scoped>
.star-container {
  position: relative;
}

.favorite-star-svg {
  position: absolute;
  right: 2px;
  background-color: transparent;
}

.favorite-star-background-svg {
  opacity: 0;
}

.favorite-star-background-svg.animate-rising-star {
  animation: star-click-animation-color 2s forwards;
  opacity: 1;
}

.favorite-star-background-svg.animate-falling-star {
  animation: star-click-animation-falling 2s forwards;
  opacity: 0;
}

@keyframes star-click-animation-color {
  0% {
    transform: scale(0.01);
  }
  50% {
    transform: scale(2);
    rotate: 360deg;
  }
  100% {
    transform: scale(1);
  }
}

@keyframes star-click-animation-falling {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.5);
    rotate: 360deg;
  }
  100% {
    transform: scale(0.01);
  }
}
@keyframes hover-star-heartbeat {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.favorite-star-svg:hover {
  animation: hover-star-heartbeat 2s forwards;
  animation-iteration-count: 3;
  cursor: pointer;
}
</style>
