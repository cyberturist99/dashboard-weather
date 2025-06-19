import { WeatherData, WeatherApiError } from './types'

export const isWeatherErrorResponse = (
  obj: WeatherApiError | WeatherData
): obj is WeatherApiError => {
  return 'error' in obj
}
