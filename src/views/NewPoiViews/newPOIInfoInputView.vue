<template>
  <div class="header-buttons">
    <RouterLink :to="{ name: 'home' }"> <HomeButton /></RouterLink>
    <RouterLink :to="{ name: 'newpoiaddressinput' }"> <BackArrow /></RouterLink>
  </div>

  <h2>Optionale Infos</h2>
  <InputField value="Gib Öffnungszeiten ein" />
  <InputField value="Gib eine Zugangsbreite ein" />
  <InputField value="Füge einen Kommentar hinzu" />
  <LöschenButton Löschen="Nicht nutzbar" />
  <categorie-button Kategorie="Abbrechen" />
  <NavButton Navigation="Erstellen" />
</template>

<script>
import HomeButton from '@/components/HomeButton.vue'
import BackArrow from '@/components/BackArrow.vue'
import NavButton from '@/components/NavButton.vue'
import CategorieButton from '@/components/CategorieButton.vue'
import InputField from '@/components/InputField.vue'
import LöschenButton from '@/components/LöschenButton.vue'
export default {
  components: {
    HomeButton,
    BackArrow,
    NavButton,
    CategorieButton,
    InputField,
    LöschenButton
  }
}
</script>
