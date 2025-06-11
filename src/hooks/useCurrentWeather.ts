import { useQuery } from '@tanstack/react-query'

export const useCurrentWeather = () => {
  return useQuery({
    queryKey: ['weather', 'current'],
    queryFn: async () => {
      const response = await fetch('/api/weather/current')
      if (!response.ok) {
        let errorData
        try {
          errorData = await response.json()
        } catch (e) {
          console.error('Error fetching weather', e)
          throw new Error(errorData.message || 'Failed to fetch weather')
        }
      }
      return response.json()
    },
  })
}
