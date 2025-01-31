<template>
  <v-card class="card">
    <h3>{{ data.date }}</h3>
    <h3>{{ data.weekday }}</h3>
    <strong>{{ data.description }}</strong>

    <v-card-text class="py-5">
      <v-col align="center" no-gutters>
        <v-col class="text-h2"> 32&deg;C </v-col>

        <v-col class="">
          <v-icon color="error" icon="mdi-weather-hurricane" size="88"></v-icon>
        </v-col>
      </v-col>
    </v-card-text>

    <v-list class="bg-transparent">
      <div class="d-flex py-3 justify-space-between">
        <v-list-item density="compact" prepend-icon="mdi-weather-windy">
          <v-list-item-subtitle>{{ data.wind_speedy }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item density="compact" prepend-icon="mdi-weather-pouring">
          <v-list-item-subtitle
            >{{ data.rain_probability }}%</v-list-item-subtitle
          >
        </v-list-item>
      </div>
    </v-list>

    <v-expand-transition>
      <div v-if="expand">
        <div class="py-2">
          <v-slider
            v-model="time"
            :max="6"
            :step="1"
            :ticks="labels"
            class="mx-4"
            color="primary"
            density="compact"
            show-ticks="always"
            thumb-size="10"
            hide-details
          ></v-slider>
        </div>

        <v-list class="bg-transparent">
          <v-list-item
            v-for="item in forecast"
            :key="item.day"
            :append-icon="item.icon"
            :subtitle="item.temp"
            :title="item.day"
          >
          </v-list-item>
        </v-list>
      </div>
    </v-expand-transition>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        :text="!expand ? 'Mais' : 'Menos'"
        @click="expand = !expand"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import type { Forecast } from "@/types/weather";
import { defineProps } from "vue";

defineProps<{ data: Forecast }>();

import { ref } from "vue";

const labels = ref({
  0: "SU",
  1: "MO",
  2: "TU",
  3: "WED",
  4: "TH",
  5: "FR",
  6: "SA",
});
const expand = ref(false);
const time = ref(0);
const forecast = ref([
  { day: "Tuesday", icon: "mdi-white-balance-sunny", temp: "24°/12°" },
  { day: "Wednesday", icon: "mdi-white-balance-sunny", temp: "22°/14°" },
  { day: "Thursday", icon: "mdi-cloud", temp: "25°/15°" },
]);
</script>

<style scoped>
.card {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 240px;
  min-height: 340px;
  text-align: center;
}
</style>
