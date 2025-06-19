interface WeatherCurrent {
  uv: number
  vis_km: number
  wind_kph: number
  gust_kph: number
  wind_dir: string
  humidity: number
  pressure_in: number
  precip_mm: number
  windchill_c: number
  temp_c: number
}

interface WeatherDay {
  maxtemp_c: number
  totalprecip_mm: number
  mintemp_c: number
}

interface WeatherForecastDay {
  date: string
  day: WeatherDay
}
interface WeatherLocation {
  name: string
}

interface WeatherForecast {
  forecastday: WeatherForecastDay[]
}

export interface WeatherData {
  current: WeatherCurrent
  forecast: WeatherForecast
  location: WeatherLocation
}
export interface WeatherApiError {
  error: {
    code?: number
    message: string
  }
}
