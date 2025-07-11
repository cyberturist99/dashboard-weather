import { useQuery } from '@tanstack/react-query'
import { WeatherData } from '@/interfaces/types'

interface ErrorResponse {
  error: {
    message: string
  }
}

export const useCurrentWeather = (
  coords: { latitude: number; longitude: number } | null,
  isGeoLoading: boolean
) => {
  return useQuery<WeatherData>({
    queryKey: ['weather', 'current', coords?.latitude, coords?.longitude],
    queryFn: async () => {
      const url = coords
        ? `/api/weather/current?lat=${coords.latitude}&lon=${coords.longitude}`
        : `/api/weather/current`

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
    enabled: !isGeoLoading,
  })
}
