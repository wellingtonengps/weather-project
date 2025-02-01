export interface Forecast {
  date: string;
  weekday: string;
  max: number;
  min: number;
  humidity: number;
  cloudiness: number;
  condition: string;
  description: string;
  rain: number;
  rain_probability: number;
  sunrise: string;
  sunset: string;
  wind_speedy: string;
}

export interface WeatherResponse {
  cid: string;
  city: string;
  city_name: string;
  cloudiness: number;
  condition_code: string;
  condition_slug: string;
  cref: string;
  currently: string;
  date: string;
  description: string;
  forecast: Forecast[];
  humidity: number;
  img_id: string;
  moon_phase: string;
  rain: number;
  sunrise: string;
  sunset: string;
  temp: number;
  time: string;
  timezone: string;
  wind_cardinal: string;
  wind_direction: number;
  wind_speedy: string;
}
