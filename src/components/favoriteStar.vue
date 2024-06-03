<template>
  <svg
    class="favorite-star-svg"
    viewBox="0 0 100 100"
    width="500px"
    height="500px"
    @click="favoriteStarClicked"
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
      <mask id="hole" :class="{ 'favorite-star-on': isStarClicked }">
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
</template>
<script>
export default {
  data() {
    return {
      isStarClicked: false
    }
  },
  methods: {
    favoriteStarClicked() {
      console.log('klick kommt an!')
      this.isStarClicked = !this.isStarClicked
    }
  }
}
</script>

<style scoped>
.favorite-star-svg {
  width: 60px;
  height: auto;
  background-color: transparent;
}
.favorite-star-on {
  background-color: red;
}
</style>
