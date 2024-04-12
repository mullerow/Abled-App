<template>
  <div>
    <p>User ID: {{ userID }}</p>
    <p>POI ID: {{ poiID }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userCounter: 0,
      poiCounter: 0
    }
  },
  methods: {
    userID() {
      this.userCounter++
      return 100000 + this.userCounter
    },
    poiID() {
      this.poiCounter++
      return 200000 + this.poiCounter
    }
  }
}
</script>
