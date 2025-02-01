<template>
  <div class="container" :class="conditionBackground">
    <div class="city-container" v-if="weather">
      <h1>{{ weather.city }}</h1>
      <div class="wrapper-temp">
        <!--
       <DotLottieVue
        style="height: 88px; width: 88px"
        autoplay
        loop
        src="https://lottie.host/b919a743-a4e4-472a-9296-d2ff854dc7d8/nYNcPDwVCw.lottie"
      />
      -->
        <v-img
          :src="`https://assets.hgbrasil.com/weather/icons/conditions/${weather.condition_slug}.svg`"
          contain
          height="88"
          width="88"
        />
        <v-col>
          <span>{{ weather.description }}</span>
          <h1>{{ weather.temp }}&deg;C</h1>
        </v-col>
      </div>

      <div class="d-flex flex-column justify-space-between">
        <v-list-item density="compact" prepend-icon="mdi-weather-windy">
          <v-list-item-subtitle>{{ weather.wind_speedy }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item density="compact" prepend-icon="mdi-weather-pouring">
          <v-list-item-subtitle>{{ weather.rain }}% </v-list-item-subtitle>
        </v-list-item>
        <v-list-item density="compact" prepend-icon="mdi-water">
          <v-list-item-subtitle>{{ weather.humidity }}% </v-list-item-subtitle>
        </v-list-item>
      </div>
    </div>
    <div class="forecast-container" v-if="weather">
      <Card v-for="(day, index) in weather.forecast" :key="index" :data="day" />
    </div>
    <p v-else-if="error">{{ error }}</p>
    <p v-else>Carregando...</p>
  </div>
</template>

<script setup lang="ts">
import Card from "./Card.vue";
import { ref, onMounted, computed } from "vue";
import { getWeather } from "@/services/api.js";
import type { WeatherResponse } from "@/types/weather";
//import { DotLottieVue } from "@lottiefiles/dotlottie-vue";

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

const conditionBackground = computed(() => {
  const conditionColors: Record<string, string> = {
    dia: "day-bg",
    noite: "night-bg",
  };

  return conditionColors[weather.value?.currently] || "default";
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  height: 100vh;
  width: 100vw;
  padding: 20px;
  box-sizing: border-box;
}

.wrapper-temp {
  display: grid;
  grid-template-columns: auto auto;
  gap: 10px;
}

.city-container {
  margin-left: 10px;
}

.night-bg {
  background: linear-gradient(
    135deg,
    #6a1b9a,
    /* Roxo escuro */ #8e24aa /* Lilás escuro */
  ); /* Roxo e lilás para noite */
}

.day-bg {
  background: linear-gradient(
    135deg,
    #f4a300,
    /* Amarelo mais escuro */ #ff7f32 /* Laranja mais escuro */
  ); /* Amarelo e laranja mais escuros para dia limpo */
}

.default {
  background: linear-gradient(
    135deg,
    #4a4a4a,
    #000000
  ); /* Cinza escuro para tempestade */
}

.forecast-container {
  display: flex;
  overflow-x: auto; /* Somente rolagem horizontal */
  gap: 10px;
  padding: 10px;
  white-space: nowrap;
  scrollbar-width: thin;
  scrollbar-color: #888 transparent;
  max-width: 100%; /* Limita o tamanho do container */
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
