import { useState, useEffect } from 'react'

interface GeolocationCoordinates {
  latitude: number
  longitude: number
}

export const useGeolocation = () => {
  const [coordinates, setCoordinates] = useState<GeolocationCoordinates | null>(
    null
  )
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Геолокация не поддерживается вашим браузером')
      setIsLoading(false)
      return
    }

    const successHandler = (position: GeolocationPosition) => {
      setCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
      setIsLoading(false)
    }

    const errorHandler = (error: GeolocationPositionError) => {
      let errorMessage = 'Не удалось получить ваше местоположение'
      switch (error.code) {
        case GeolocationPositionError.PERMISSION_DENIED:
          errorMessage = 'Доступ к геолокации запрещен'
          break
        case GeolocationPositionError.POSITION_UNAVAILABLE:
          errorMessage = 'Информация о местоположении недоступна'
          break
        case GeolocationPositionError.TIMEOUT:
          errorMessage = 'Время ожидания запроса истекло'
          break
      }
      setError(errorMessage)
      setIsLoading(false)
    }

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    })
  }, [])

  return { coordinates, error, isLoading }
}
