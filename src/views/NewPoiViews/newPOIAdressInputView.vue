<template>
  <BackgroundGradient />
  <div class="header-buttons">
    <RouterLink :to="{ name: 'newpoilocationselection' }"> <BackArrow /></RouterLink>
    <RouterLink :to="{ name: 'home' }"> <headerLogo /></RouterLink>
  </div>
  <HeadLine class="headline-new-poi-adress" :Headline="'Gib eine Adresse ein'" />

  <RouterLink class="nav-button-adress-input" :to="{ name: 'newpoiinfoinput' }"
    ><NavButton Navigation="Weiter"
  /></RouterLink>
</template>

<script>
import headerLogo from '@/components/headerLogo.vue'
import BackArrow from '@/components/BackArrow.vue'
import HeadLine from '@/components/HeadLine.vue'
import NavButton from '@/components/NavButton.vue'
import BackgroundGradient from '@/components/BackgroundGradient.vue'

export default {
  components: {
    headerLogo,
    BackArrow,
    HeadLine,
    BackgroundGradient,
    NavButton
  }
}
</script>

<style scoped>
.headline-new-poi-adress {
  align-self: center;
}
.header-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: transparent;
}
.nav-button-adress-input {
  align-self: center;
}
</style>
