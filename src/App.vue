<template>
  <header>
    <h1>Accsessibility App For ALL!</h1>
  </header>

  <RouterView />
</template>

<script>
//import { RouterView } from 'vue-router'

export default {
  data() {
    return {
      poiList: [
        {
          id: 1,
          category: 'elevator',
          'detail-categories': { 'elevator-size': 'large' },
          xCoordinates: 52.55347266835718,
          yCoordinates: 13.412074165422549,
          minWidth: 0.92
        },
        {
          id: 2,
          category: 'toilet',
          'detail-categories': {
            'handicapped-accessible': true,
            'changing station': true,
            'free-of-charge': false
          },
          xCoordinates: 52.55347266835722,
          yCoordinates: 13.412074165422512,
          minWidth: 1.22
        }
      ]
    }
  }
}
</script>

<style scoped></style>
