<template>
  <v-row class="wrapper-search">
    <v-text-field
      v-model="cityInput"
      label="Ex.: Juiz de Fora, MG"
      variant="outlined"
      width="200"
      @keyup.enter="searchWeather"
    />
    <v-btn height="56" class="ml-2" color="primary" @click="searchWeather">
      <v-icon size="22">mdi-magnify</v-icon>
    </v-btn>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from "vue";

const cityInput = ref("");
const emit = defineEmits(["search"]);

function searchWeather() {
  if (cityInput.value) {
    emit("search", cityInput.value);
  }
}
</script>

<style scoped>
.wrapper-search {
  display: grid;
  grid-template-columns: max-content min-content;
  gap: 2px;
  margin-left: 2px;
}
</style>
