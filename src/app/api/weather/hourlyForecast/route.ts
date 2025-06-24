import { isWeatherErrorResponseFor10Days } from '@/interfaces/typeguards'
import { WeatherApiError, ForecastTenDays } from '@/interfaces/types'
import { NextResponse } from 'next/server'

export const GET = async (): Promise<NextResponse> => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=55.7558&longitude=37.6173&forecast_days=10&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_hours,weathercode&timezone=Europe/Moscow`
    )

    const data: ForecastTenDays | WeatherApiError = await response.json()

    if (!response.ok) {
      if (isWeatherErrorResponseFor10Days(data)) {
        return NextResponse.json({ error: data.error.message }, { status: 500 })
      } else {
        throw new Error('Unknown response from API')
      }
    }

    return NextResponse.json(data)
  } catch (e) {
    console.error(`Error fetching data: ${e}`)
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 })
  }
}
