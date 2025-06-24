import { useQuery } from '@tanstack/react-query'
import { ForecastTenDays } from '@/interfaces/types'

interface ErrorResponse {
  error: {
    message: string
  }
}

export const useUpcomingWeather = () => {
  return useQuery<ForecastTenDays>({
    queryKey: ['weather', '10DayForecast'],
    queryFn: async () => {
      const response = await fetch('/api/weather/hourlyForecast')
      if (!response.ok) {
        let errorData: ErrorResponse | null = null
        try {
          errorData = await response.json()
        } catch (e) {
          console.error('Error parsing error response', e)
        }
        throw new Error(errorData?.error?.message || 'Failed to fetch weather')
      }
      return response.json()
    },
  })
}
