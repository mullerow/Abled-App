<template>
  <div>
    <button @click="toggleMenu">☰</button>
    <div v-if="showMenu" class="menu-container">
      <RouterLink :to="{ name: 'home' }" class="menu-item">
        <span class="icon"><img src="@/assets/icons/Home.png" alt="go home" /></span
        >Home</RouterLink
      >
      <hr />
      <RouterLink :to="{ name: 'ownpoiinfo' }" class="menu-item">
        <span class="icon"><img src="@/assets/icons/locationPin.png" alt="ownpoiinfo" /></span>Own
        POI Info</RouterLink
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu
    }
  }
}
</script>
<style>
button {
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.menu-container {
  position: relative;
  top: 4px;
  right: 10px;
  background-color: var(--white);
  border: 1px solid var(--red);
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 5px var(--black);
  display: flex;
  flex-direction: column;
}

.menu-item {
  display: flex;
  align-items: center;
  color: var(--black);
  text-decoration: none;
}

.menu-item:hover {
  color: var(--red);
}

.icon {
  margin-right: 10px;
}
</style>
