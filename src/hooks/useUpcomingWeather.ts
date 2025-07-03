import { useQuery } from '@tanstack/react-query'
import { ForecastTenDays } from '@/interfaces/types'

interface ErrorResponse {
  error: {
    message: string
  }
}

export const useUpcomingWeather = (
  coords: { latitude: number; longitude: number } | null
) => {
  return useQuery<ForecastTenDays>({
    queryKey: ['weather', '10DayForecast', coords?.latitude, coords?.longitude],
    queryFn: async () => {
      const url = coords
        ? `/api/weather/hourlyForecast?lat=${coords.latitude}&lon=${coords.longitude}`
        : '/api/weather/hourlyForecast'

      const response = await fetch(url)
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
    enabled: !!coords,
  })
}
