import { WeatherData, WeatherApiError, ForecastTenDays } from './types'

export const isWeatherErrorResponse = (
  obj: WeatherApiError | WeatherData
): obj is WeatherApiError => {
  return 'error' in obj
}

export const isWeatherErrorResponseFor10Days = (
  obj: WeatherApiError | ForecastTenDays
): obj is WeatherApiError => {
  return 'error' in obj
}
