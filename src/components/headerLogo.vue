<template>
  <div class="container-hover-text-headerlogo">
    <img src="../assets/images/final logo with background small (2).jpeg" alt="App-logo" />
    <p class="hover-text-headerlogo">Zurück zur Startseite</p>
  </div>
</template>

<style scoped>
img {
  width: 150px;
  height: auto;
  border-radius: 60% 0px 0px 10px;
}
.hover-text-headerlogo {
  display: none;
}
@media screen and (min-width: 600px) {
  .hover-text-headerlogo {
    display: block;
    color: transparent;
  }
  .container-hover-text-headerlogo:hover .hover-text-headerlogo {
    color: var(--black);
  }
  .container-hover-text-headerlogo:hover img {
    box-shadow: 0px 0px 15px var(--white);
    border-radius: 15px;
  }
}
</style>
