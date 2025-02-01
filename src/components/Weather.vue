<template>
  <div class="forecast-container" v-if="weather">
    <Card v-for="(day, index) in weather.forecast" :key="index" :data="day" />
  </div>
  <p v-else-if="error">{{ error }}</p>
  <p v-else>Carregando...</p>
</template>

<script setup lang="ts">
import Card from "./Card.vue";
import { ref, onMounted } from "vue";
import { getWeather } from "@/services/api.js";
import type { WeatherResponse } from "@/types/weather";

const weather = ref<WeatherResponse | null>(null);
const error = ref(null);

onMounted(() => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        getWeather(latitude, longitude)
          .then((response: WeatherResponse) => {
            weather.value = response;
            console.log(response);
          })
          .catch((err) => {
            error.value = "Erro ao buscar previsão do tempo";
            console.error(err);
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
});
</script>

<style scoped>
.forecast-container {
  display: flex;
  overflow-x: auto;
  gap: 10px;
  padding: 10px;
  white-space: nowrap;
  scrollbar-width: thin;
  scrollbar-color: #888 transparent;
}

.forecast-container::-webkit-scrollbar {
  height: 8px;
}

.forecast-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.forecast-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
