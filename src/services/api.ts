import axios from "axios";
import type { WeatherResponse } from "@/types/weather";

export const key = "f3cf07f7";

//https://api.hgbrasil.com/weather?key=f3cf07f7&lat=-23.682&lon=-46.875&user_ip=remote

export const getWeather = async (
  latitude: number,
  longitude: number
): Promise<WeatherResponse> => {
  const response = await axios.get("/api/weather", {
    params: {
      key,
      lat: latitude,
      lon: longitude,
      user_ip: "remote",
    },
  });

  return response.data.results;
};

export const getWeatherByCity = async (
  city: string
): Promise<WeatherResponse> => {
  const response = await axios.get("/api/weather", {
    params: {
      key,
      city_name: city,
    },
  });

  if (response.data.by === "default") {
    throw new Error("Cidade não encontrada");
  }

  return response.data.results;
};
