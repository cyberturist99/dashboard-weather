'use client'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import Weather24 from '@/components/Weather24'
import UpcomingWeather from '@/components/UpcomingWeather'
import WeatherAdditional from '@/components/WeatherAdditional'
import Loader from '@/ui/Loader'
import styled from 'styled-components'
import { useCurrentWeather } from '@/hooks/useCurrentWeather'
import { useGeolocation } from '@/hooks/useGeolocation'

export default function CurrentWeather() {
  const {
    coordinates,
    error: geoError,
    isLoading: isGeoLoading,
  } = useGeolocation()
  const { data, isLoading, isError, error } = useCurrentWeather(
    coordinates,
    isGeoLoading
  )

  useEffect(() => {
    if (geoError) {
      toast.warn(`${geoError} (используем данные для Москвы)`, {
        toastId: 'geo-error',
      })
    }
  }, [geoError])

  if (isGeoLoading || isLoading)
    return (
      <WrapperMain>
        <Loader />
      </WrapperMain>
    )

  if (isError) return <WrapperMain>{error.message}</WrapperMain>
  if (!data) return <WrapperMain>Нет данных</WrapperMain>

  const { location, current, forecast } = data
  const { forecastday } = forecast

  return (
    <WrapperMain>
      <WeatherInfo>
        <Text>{location.name}</Text>
        <Text>{Math.round(current.temp_c)}°</Text>
        по ощущениям как {Math.round(current.windchill_c)}° Макс.:{' '}
        {Math.round(forecastday[0].day.maxtemp_c)}°, мин.:{' '}
        {Math.round(forecastday[0].day.mintemp_c)}°
      </WeatherInfo>
      <Weather24 forecast={forecastday[0].hour} />
      <UpcomingWeather coordinates={coordinates} />
      <WeatherAdditional data={data} />
    </WrapperMain>
  )
}

const WrapperMain = styled.main`
  min-height: calc(100vh - 60px);
  font-size: 1.35rem;
  line-height: 1.7;
  text-align: center;
  color: black;
  background: white;
`
const WeatherInfo = styled.div`
  margin-bottom: 10px;
`

const Text = styled.div`
  font-size: 2rem;
`
