import { useQuery } from '@tanstack/react-query'
import { WeatherData } from '@/interfaces/types'

interface ErrorResponse {
  error: {
    message: string
  }
}

export const useCurrentWeather = () => {
  return useQuery<WeatherData, Error>({
    queryKey: ['weather', 'current'],
    queryFn: async () => {
      const response = await fetch('/api/weather/current')
      if (!response.ok) {
        let errorData: ErrorResponse | null = null
        try {
          errorData = await response.json()
        } catch (e) {
          console.error('Error parsing error response', e)
        }
        throw new Error(errorData?.error?.message || 'Failed to fetch weather')
      }
      return response.json() as Promise<WeatherData>
    },
  })
}
