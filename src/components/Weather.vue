<template>
  <h1>Weather</h1>
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

        this.weather = getWeather(latitude, longitude)
          .then((data) => (weather.value = data))
          .catch((error) => console.error("Erro ao buscar dados:", error));

        console.log(weather);
      },
      (error) => {
        this.error = "Permissão de localização negada";
        console.error(error.message);
      }
    );
  } else {
    this.error = "Geolocalização não suportada pelo navegador";
  }
});
</script>
