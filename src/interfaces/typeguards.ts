import { WeatherData, WeatherApiError, ForecastTenDays } from './types'

export const isWeatherErrorResponse = (
  obj: WeatherApiError | WeatherData | ForecastTenDays
): obj is WeatherApiError => {
  return 'error' in obj
}
