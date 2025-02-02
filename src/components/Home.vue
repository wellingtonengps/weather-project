<template>
  <div class="container-home">
    <v-col class="d-flex flex-column justify-center align-center">
      <div class="d-flex flex-column gap-2 justify-center align-center mb-12">
        <h1>YWeather</h1>
        <DotLottieVue
          style="height: 120px; width: 120px"
          autoplay
          loop
          src="https://lottie.host/8aaad17a-07df-48d2-b07e-acc9c863f1f1/LG9YGHoRkc.lottie"
        />
      </div>
      <SearchCity @search="fetchWeatherByCity" />
      <v-btn
        height="56"
        class="ml-2 mt-4"
        color="#E5584C"
        @click="fetchWeatherByLocation"
      >
        <v-icon size="22">mdi-map-marker</v-icon>
        Usar localização
      </v-btn>
      <v-col class="d-flex justify-center align-center mt-4">
        <v-alert v-if="error" type="error" class="error-alert">
          {{ error }}
        </v-alert>
      </v-col>
    </v-col>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import SearchCity from "@/components/SearchCity.vue";
import { useRouter } from "vue-router";
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";

const router = useRouter();

const error = ref<string | null>(null);

function fetchWeatherByCity(city: string) {
  if (!city) return;

  if (city) {
    router.push({
      path: "/weather",
      query: { city },
    });
  }
}

function fetchWeatherByLocation() {
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
        error.value = "Permissão de localização negada. " + err.message;
      }
    );
  } else {
    error.value = "Geolocalização não suportada pelo navegador";
  }
}
</script>

<style scoped>
.container-home {
  display: flex;
  width: 100vw;
  padding: 20px;
  height: 100vh;
  background-color: #596bab;
  align-items: center;
}

.error-alert {
  max-width: 80%;
  text-align: center;
}
</style>
