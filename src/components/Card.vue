<template>
  <v-card :class="conditionBackground" class="card">
    <span>{{ data.date }} - {{ data.weekday }}</span>
    <h3>{{ data.description }}</h3>

    <div>
      <v-col class="d-flex flex-column justify-space-between align-center">
        <span class="minMax">{{ data.min }}/{{ data.max }} &deg;C</span>
        <v-img
          :src="`https://assets.hgbrasil.com/weather/icons/conditions/${data.condition}.svg`"
          contain
          height="88"
          width="88"
        />
      </v-col>
    </div>

    <v-divider />

    <v-list class="bg-transparent">
      <div class="d-flex flex-column justify-space-between">
        <v-list-item density="compact" prepend-icon="mdi-weather-windy">
          <v-list-item-subtitle>{{ data.wind_speedy }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item density="compact" prepend-icon="mdi-weather-pouring">
          <v-list-item-subtitle>
            {{ data.rain_probability }}%
          </v-list-item-subtitle>
        </v-list-item>
      </div>
    </v-list>
  </v-card>
</template>

<script lang="ts" setup>
import type { Forecast } from "@/types/weather";
import { computed } from "vue";

const props = defineProps<{ data: Forecast }>();

const conditionBackground = computed(() => {
  const conditionColors: Record<string, string> = {
    storm: "stormy-bg",
    snow: "snowy-bg",
    hail: "hail-bg",
    rain: "rainy-bg",
    fog: "foggy-bg",
    clear_day: "sunny-bg",
    clear_night: "night-bg",
    cloud: "cloudy-bg",
    cloudly_day: "cloudy-day-bg",
    cloudly_night: "cloudy-night-bg",
    none_day: "error-day-bg",
    none_night: "error-night-bg",
  };

  return conditionColors[props.data.condition] || "default";
});
</script>

<style scoped>
.card {
  padding: 18px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 240px;
  min-height: 340px;
  text-align: center;
}

.minMax {
  font-size: 30px;
  padding: 0px;
  margin: 0px;
}

.stormy-bg {
  background: linear-gradient(
    135deg,
    #4a4a4a,
    #000000
  ); /* Cinza escuro para tempestade */
}

.snowy-bg {
  background: linear-gradient(
    135deg,
    #d8efff,
    #a6c5e8
  ); /* Azul claro para neve */
}

.hail-bg {
  background: linear-gradient(
    135deg,
    #a6c5e8,
    #708090
  ); /* Azul acinzentado para granizo */
}

.rainy-bg {
  background: linear-gradient(
    135deg,
    #5f9ea0,
    #4682b4
  ); /* Azul esverdeado para chuva */
}

.foggy-bg {
  background: linear-gradient(
    135deg,
    #c0c0c0,
    #808080
  ); /* Cinza para neblina */
}

.sunny-bg {
  background: linear-gradient(
    135deg,
    #ffd700,
    #ffa500
  ); /* Amarelo para dia limpo */
}

.night-bg {
  background: linear-gradient(
    135deg,
    #2c3e50,
    #1a1a2e
  ); /* Azul escuro para noite limpa */
}

.cloudy-bg {
  background: linear-gradient(
    135deg,
    #b0c4de,
    #778899
  ); /* Azul claro para nublado */
}

.cloudy-day-bg {
  background: linear-gradient(
    135deg,
    #d3d3d3,
    #a9a9a9
  ); /* Cinza claro para nublado de dia */
}

.cloudy-night-bg {
  background: linear-gradient(
    135deg,
    #696969,
    #2f4f4f
  ); /* Cinza escuro para nublado de noite */
}

.error-day-bg {
  background: linear-gradient(
    135deg,
    #ff8c00,
    #ff4500
  ); /* Laranja para erro de dia */
}

.error-night-bg {
  background: linear-gradient(
    135deg,
    #8b0000,
    #4b0082
  ); /* Vermelho escuro para erro de noite */
}

.default-bg {
  background: linear-gradient(
    135deg,
    #ffffff,
    #dddddd
  ); /* Branco com cinza claro como padrão */
}
</style>
