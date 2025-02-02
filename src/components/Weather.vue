<template>
  <div class="container" :class="conditionBackground">
    <div v-if="weather" class="city-container">
      <SearchCity @search="fetchWeatherByCity" />

      <h1>{{ weather.city }}</h1>
      <div class="wrapper-temp">
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

    <div v-if="weather" class="forecast-container">
      <Card v-for="(day, index) in weather.forecast" :key="index" :data="day" />
    </div>
    <v-col v-else-if="error" class="d-flex justify-center align-center mt-4">
      <v-alert type="error" class="error-alert">
        {{ error }}
      </v-alert>
    </v-col>
    <p v-else>
      <DotLottieVue
        style="height: 88px; width: 88px"
        autoplay
        loop
        src="https://lottie.host/9a811fb4-c338-4380-8057-e0bf932ab293/Amy44xoGPm.lottie"
      />
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

import { getWeather, getWeatherByCity } from "@/services/api.js";
import Card from "@/components/Card.vue";
import SearchCity from "./SearchCity.vue";

import type { WeatherResponse } from "@/types/weather";
import type { WeatherQuery } from "@/types/query";

import { DotLottieVue } from "@lottiefiles/dotlottie-vue";
const route = useRoute();
const weather = ref<WeatherResponse | null>(null);
const error = ref<string | null>(null);

onMounted(() => {
  const params: WeatherQuery = route.query;

  if (params.city) {
    fetchWeatherByCity(params.city);
  }

  if (params.lat && params.log) fetchWeatherByLocation(params.lat, params.log);
});

async function fetchWeatherByLocation(lat: number, lon: number) {
  try {
    weather.value = await getWeather(lat, lon);
    error.value = null;
  } catch (err) {
    error.value = "Erro ao buscar previsão do tempo. " + err;
  }
}

async function fetchWeatherByCity(city: string) {
  if (!city) return;
  try {
    weather.value = await getWeatherByCity(city);
    error.value = null;
  } catch (err) {
    error.value =
      "Cidade não encontrada. Exemplo de pesquisa: Juiz de Fora, MG. " + err;
  }
}

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

.wrapper-search {
  display: grid;
  grid-template-columns: auto min-content;
  gap: 2px;
  margin-left: 2px;
}

.wrapper-temp {
  display: grid;
  grid-template-columns: auto auto;
  gap: 10px;
}

.city-container {
  margin-top: 30px;
  margin-left: 10px;
}

.night-bg {
  background: linear-gradient(135deg, #4a0072, #311b92);
}

.day-bg {
  background: linear-gradient(135deg, #f4a300, #ff7f32);
}

.default {
  background: linear-gradient(135deg, #f1f1f1);
}

.forecast-container {
  display: flex;
  overflow-x: auto;
  gap: 10px;
  padding: 10px;
  white-space: nowrap;
  scrollbar-width: thin;
  scrollbar-color: #888 transparent;
  max-width: 100%;
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
