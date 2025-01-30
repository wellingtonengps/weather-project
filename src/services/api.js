import axios from "axios";

export const key = "f3cf07f7";

//https://api.hgbrasil.com/weather?key=f3cf07f7&lat=-23.682&lon=-46.875&user_ip=remote

const api = axios.create({
  baseURL: "https://api.hgbrasil.com",
});

export const getWeather = (latitude, longitude) => {
  return api.get(`/weather?key=${key}&lat=${latitude}&lon=${longitude}`);
};

console.log(getWeather);
