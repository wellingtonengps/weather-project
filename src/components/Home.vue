<template>
  <v-btn stacked variant="text" class="custom-btn" @click="goToWeather">
    <v-img
      src="../assets/hg-brasil-conditions-slugs/clear_day.svg"
      width="62"
      height="62"
      class="icon"
    />
    <span>Clima</span>
  </v-btn>

  <v-divider vertical class="custom-divider" />

  <v-btn stacked variant="text" class="custom-btn" @click="goToMoon">
    <v-img
      src="../assets/hg-brasil-moon-phases/full.png"
      width="62"
      height="62"
      class="icon"
    />
    <span>Fases da Lua</span>
  </v-btn>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToWeather = () => {
  router.push("/weather");
};

const goToMoon = () => {
  router.push("/moon");
};
</script>

<style>
.custom-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-transform: none;
  height: 200px;
  width: 200px;
}

.icon {
  margin-bottom: 8px;
}
</style>
