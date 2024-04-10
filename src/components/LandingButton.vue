<template>
  <div>
    <button id="ImageButton" v-for="Text in Texts" :key="Text.id">
      <img src="" alt="" /> <br />
      {{ Text.Landing }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Texts: [
        {
          Landing: 'Suchen',
          id: 6
        },
        {
          Landing: 'Neuer Ort',
          id: 7
        },
        {
          Landing: 'Favoriten',
          id: 8
        },
        {
          Landing: 'Eigener Ort',
          id: 9
        },
        {
          Landing: 'Account',
          id: 10
        }
      ]
    }
  }
}
</script>

<style>
#ImageButton {
  padding: 1rem;
  background-color: #f4f1de;
  color: #3d405b;
  border-radius: 1rem;
  width: 70%;
  margin-top: 1rem;
  font-weight: bold;
}

div {
  display: grid;
  grid-template-areas:
    'search'
    'new-place favorites'
    'own-place account';
  grid-gap: 1rem;
}

div:nth-child(1) {
  grid-area: search;
}

div:nth-child(2) {
  grid-area: new-place;
}

div:nth-child(3) {
  grid-area: favorites;
}

div:nth-child(4) {
  grid-area: own-place;
}

div:nth-child(5) {
  grid-area: account;
}
</style>
