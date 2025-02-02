<template>
  <div class="container">
    <SearchCity @search="fetchWeatherByCity" />
    <v-btn height="56" class="ml-2" color="red" @click="fetchWeatherByLocation">
      <v-icon size="22">mdi-map-marker</v-icon>
      Usar localização
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import SearchCity from "./SearchCity.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const error = ref(null);

async function fetchWeatherByCity(city: string) {
  if (!city) return;
  try {
    if (city) {
      router.push({
        path: "/weather",
        query: { city },
      });
    }
    error.value = null;
  } catch (err) {
    error.value = "Cidade não encontrada!";
  }
}

async function fetchWeatherByLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        router.push({
          path: "/weather",
          query: {
            lat: position.coords.latitude,
            log: position.coords.longitude,
          },
        });
      },
      (err) => {
        error.value = "Permissão de localização negada";
        console.error(err.message);
      }
    );
  } else {
    error.value = "Geolocalização não suportada pelo navegador";
  }
}
</script>

<style scoped>
.container {
  display: flex;
  width: 100vw;
  padding: 20px;
  height: 100vh;
  background-color: #000;
}
</style>
