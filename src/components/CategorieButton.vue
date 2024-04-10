<template>
  <button id="CategorieButton" v-for="categorie in categories" :key="categorie.id">
    <img src="" alt="" /> {{ categorie.categorie }}
  </button>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        {
          categorie: 'Toilette',
          id: 11
        },
        {
          categorie: 'Aufzug',
          id: 12
        },
        {
          categorie: 'Wickelplatz',
          id: 13
        }
      ]
    }
  }
}
</script>

<style>
#CategorieButton {
  padding: 1rem;
  background-color: #f4f1de;
  color: #3d405b;
  border-radius: 1rem;
  width: 70%;
  display: grid;
  margin-top: 1rem;
  font-weight: bold;
}
</style>
