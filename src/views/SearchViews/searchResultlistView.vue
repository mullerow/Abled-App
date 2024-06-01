<template>
  <!--  INFO POPUP für den standort bestimmungsbutton -->
  <div class="resultlist-popup-container" v-if="resultlistPopup">
    <svg
      class="resultlist-svg-popup"
      viewBox="0 0 100 100"
      width="200px"
      height="200px"
      style="filter: url(#f1)"
    >
      <defs>
        <filter id="f1" x="-10%" y="-10%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="0.5" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 1 0"
            result="coloredBlur"
          />
          <feOffset in="coloredBlur" dx="3" dy="3" result="offsetBlur" />
          <feMerge>
            <feMergeNode in="offsetBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="clipPolygon">
          <path
            d="
            M 82.004 38.891 C 91.22 34.704 91.451 23.504 85.741 14.014 C 82.204 6.959 78.02 8.645 72.502 14.77 L 75.513 14.77 L 70.963 19.321 L 67.081 14.904 L 69.825 14.77 C 71.341 12.106 73.071 10.66 77.691 7.499 C 74.058 7.935 73.288 7.678 71.066 7.123 L 69.869 8.96 L 67.433 3.661 L 73.117 3.404 L 72.092 5.199 C 80.583 6.302 85.822 4.371 90.724 9.675 C 95.418 15.967 98.195 16.76 98.459 28.265 V 85.669 C 98.964 92.982 98.935 92.982 95.977 92.953 C 92.033 92.982 96.023 100.001 91.979 99.921 H 7.04 C 3.167 99.949 6.953 93.025 2.972 92.967 C 0.072 93.025 0.043 92.996 0.429 84.458 V 42.999 C 0.567 39.019 0.567 38.927 5.287 39.019 Z"
          />
        </clipPath>
      </defs>
      <rect width="200px" height="200px" clip-path="url(#clipPolygon)" style="fill: var(--black)" />
    </svg>
    <popupButtonTutorial
      class="resultlist-popup-button"
      :buttonLabel="'Geht klar!'"
      @click="searchPoiPopup = false"
    />
    <p class="resultlist-popup-text">
      Lege fest, in welchem Radius du Orte auf der Karte angezeigt bekommen möchtest und bitte
      stimme der Standortbestimmung zu, damit wir Dir dann auch interessante Orte in deiner Nähe
      zeigen können.
    </p>
  </div>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'searchoptionalcategorie' }"> <BackArrow /></RouterLink>
    <RouterLink :to="{ name: 'home' }"> <headerLogo /></RouterLink>
    <RouterLink :to="{ name: 'searchresultmap' }"><EarthMap /></RouterLink>
  </div>

  <HeadLine Headline="Ergebnisliste" class="headline-text"></HeadLine>
  <div class="search-list-container" v-for="poi of store.temporaryData.currentPois" :key="poi.id">
    <button class="searchlist-button" v-if="store.renderFilteredPois(poi)">
      <img class="categorie-icon" :src="this.store.getIconOfCategory(poi)" alt="Kategorie Icon" />
      <router-link :to="'/infopoi/' + poi.id">
        <div class="searchlist-poiname">{{ poi.poiName }}</div>

        <div
          class="searchlist-detailcategories"
          v-for="detailcategorie of poi.detailCategories"
          :key="'detail-' + poi.id + '-' + detailcategorie"
        >
          ✅ {{ detailcategorie }}
        </div>

        <div class="searchlist-distance">
          Entfernung: <b>{{ poi.currentSearchDistance }}</b> Meter
        </div>
      </router-link>
    </button>
  </div>
</template>

<script>
import { storeData } from '@/stores/store.js'
import EarthMap from '@/components/EarthMap.vue'
import BackArrow from '@/components/BackArrow.vue'
import headerLogo from '@/components/headerLogo.vue'
import HeadLine from '@/components/HeadLine.vue'
import popupButtonTutorial from '@/components/popupButtonTutorial.vue'

export default {
  components: {
    headerLogo,
    EarthMap,
    BackArrow,
    HeadLine,
    popupButtonTutorial
  },
  data() {
    return {
      store: storeData(),
      resultlistPopup: true
    }
  },
  created() {
    this.store.checkForFilterOptions()
  }
}
</script>

<style scoped>
.searchlist-button {
  position: relative;
  width: 100%;
  background-color: var(--white);
  color: var(--red);
  margin-bottom: 10px;
  border-radius: 16px;
  border: 1px solid var(--black);
  align-self: center;
  justify-content: space-around;
}
.searchlist-button:hover {
  background-color: rgb(252, 220, 180);
  cursor: pointer;
}
b {
  color: var(--black);
}

.searchlist-poiname {
  font-size: 20px;
  font-weight: bold;
  color: var(--red);
}
.searchlist-detailcategories {
  text-align: start;
  font-size: 14px;
  width: 70%;
}
.searchlist-distance {
  text-align: end;
  margin-right: 5px;
  font-size: 14px;
}
.header-buttons {
  justify-content: space-between;
  padding: 10px 20px;
  background-color: transparent;
}
.headline-text {
  width: 100%;
}
.search-list-container {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
.categorie-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  border-radius: 5px;
}
.resultlist-popup-container {
  position: relative;
  align-self: center;
  width: 300px;
  z-index: 10;
}
.resultlist-svg-popup {
  position: absolute;
  width: 300px;
  height: 300px;
  top: 195px;
  left: 20px;
}
.resultlist-popup-button {
  position: absolute;
  top: 415px;
  left: 173px;
}
.resultlist-popup-text {
  position: absolute;
  top: 305px;
  left: 50px;
  color: var(--white);
}

@media screen and (min-width: 600px) {
  .searchlist-button {
    width: 70%;
  }
}
@media screen and (min-width: 768px) {
  .searchlist-button {
    width: 50%;
  }
}
</style>
