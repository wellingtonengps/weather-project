import axios from "axios";

export const key = "f3cf07f7";

//https://api.hgbrasil.com/weather?key=f3cf07f7&lat=-23.682&lon=-46.875&user_ip=remote

export const getWeather = (latitude, longitude) => {
  return axios.get("/api/weather", {
    params: {
      key,
      lat: latitude,
      lon: longitude,
      user_ip: "remote",
    },
  });
};
