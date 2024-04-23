<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
    <RouterLink :to="{ name: 'searchresultlist' }"> <BackArrow /></RouterLink>
  </div>
  <!-- 
  <RouterLink :to="{ name: 'searchresultmap' }"><EarthMap /></RouterLink> -->
  <br />
  <section v-if="findChoosenPoi" class="info">
    <h2>
      {{ findChoosenPoi.poiName ? findChoosenPoi.poiName : 'Poi konnte nicht geladen werden' }}
    </h2>
    <p>
      <b>Adresse:</b> <br />
      {{ findChoosenPoi.city }}, <br />
      {{ findChoosenPoi.street }}, <br />{{ findChoosenPoi.zip }}
    </p>
    <div>
      <div
        class="detail-categorys"
        v-for="detailcategorie of findChoosenPoi.detailCategories"
        :key="'detail-' + findChoosenPoi.id + '-' + detailcategorie"
      >
        ✅ {{ detailcategorie }}
      </div>
    </div>

    <p>
      <b>passierbare Mindestbreite:</b>
      {{ findChoosenPoi.minWidth ? findChoosenPoi.minWidth : 'Poi konnte nicht geladen werden' }} cm
    </p>
    <p>
      Es ist noch
      <b
        >{{
          this.store.calcDistance(
            findChoosenPoi.xCoordinates,
            findChoosenPoi.yCoordinates,
            this.store.temporaryData.ownXCoordinate,
            this.store.temporaryData.ownYCoordinate
          )
        }}
        Meter</b
      >entfernt
    </p>
  </section>
  <p>
    <LöschenButton :Löschen="'Nicht nutzbar'" @click="deletePoi" />
    <NavButton
      :Navigation="'In Maps öffnen'"
      @click="
        store.openExternMapToNavigate(findChoosenPoi.xCoordinates, findChoosenPoi.yCoordinates)
      "
    />
    <RouterLink :to="{ name: 'infopoicomment' }">Comments</RouterLink>
  </p>
</template>

<script>
import { storeData } from '@/stores/store.js'
import HomeButton from '@/components/HomeButton.vue'
import BackArrow from '@/components/BackArrow.vue'
import NavButton from '@/components/NavButton.vue'
import LöschenButton from '@/components/LöschenButton.vue'

export default {
  components: {
    HomeButton,
    BackArrow,
    NavButton,
    LöschenButton
  },
  data() {
    return {
      id: this.$route.params.id,
      store: storeData()
    }
  },
  methods: {
    deletePoi() {
      this.store.deletePoi(this.id)
    }
  },
  computed: {
    findChoosenPoi() {
      console.log(
        'poiData:',
        this.store.temporaryData.currentPois.find((el) => el.id == this.id)
      )
      return this.store.temporaryData.currentPois.find((el) => el.id == this.id)
    }
  },
  mounted() {
    this.store.getPoiDataFromAPI()
  }
}
</script>

<style scoped>
.info {
  padding-left: 0.5rem;
  background-color: var(--white);
  color: var(--black);
  border-radius: 1rem;
  width: 75%;
  margin-top: 0;
  margin-bottom: 0px;
  margin-left: 5px;

  display: grid;
  font-size: 16px;
}
b {
  font-size: 16px;
  padding: 0.9rem;
  padding-left: 0;
}
section {
  min-width: 320px;
}
.detail-categorys {
  margin-top: 5px;
  margin-left: 10px;
}
h2 {
  color: var(--red);
  margin: 0 0 0 10px;
  font-size: 28px;
}
</style>
