interface WeatherCurrent {
  uv: number
  vis_km: number
  wind_kph: number
  gust_kph: number
  wind_dir: string
  humidity: number
  pressure_in: number
  precip_mm: number
}

interface WeatherDay {
  maxtemp_c: number
  totalprecip_mm: number
}

interface WeatherForecastDay {
  date: string
  day: WeatherDay
}

interface WeatherForecast {
  forecastday: WeatherForecastDay[]
}

interface WeatherData {
  current: WeatherCurrent
  forecast: WeatherForecast
}

export interface WeatherAdditionalProps {
  data: WeatherData
}
