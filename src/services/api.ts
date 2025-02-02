import axios from "axios";
import type { WeatherResponse } from "@/types/weather";

export const key = "f3cf07f7";

const baseURL =
  import.meta.env.MODE === "development"
    ? "/api/weather" // Proxy em desenvolvimento
    : "https://api.hgbrasil.com/weather"; // URL real em produção

export const getWeather = async (
  latitude: number,
  longitude: number
): Promise<WeatherResponse> => {
  const response = await axios.get(baseURL, {
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
