import { defineStore } from 'pinia'

export const storeData = defineStore('poiStore', {
  state: () => ({
    info: '🍍PINIA is running🍍!'
  })
})
