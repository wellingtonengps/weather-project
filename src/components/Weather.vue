<template>
  <div v-if="weather">
    <h2>Clima: {{ weather.description }}</h2>
    <p>Temperatura: {{ weather.temp }}°C</p>
  </div>
  <p v-else-if="error">{{ error }}</p>
  <p v-else>Carregando...</p>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getWeather } from "@/services/api.js";

const weather = ref(null);
const error = ref(null);

onMounted(() => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        getWeather(latitude, longitude)
          .then((response) => {
            weather.value = response.data.results;
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
