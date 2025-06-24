// app/api/weather/route.ts
import { isWeatherErrorResponse } from '@/interfaces/typeguards'
import { WeatherApiError, WeatherData } from '@/interfaces/types'
import { NextResponse } from 'next/server'

const apiKey = process.env.API_SECRET_KEY

export const GET = async (request: Request): Promise<NextResponse> => {
  try {
    const { searchParams } = new URL(request.url)
    const lat = searchParams.get('lat')
    const lon = searchParams.get('lon')

    // Если нет координат - используем Москву как fallback
    const locationQuery = lat && lon ? `${lat},${lon}` : 'Moscow'

    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${locationQuery}&days=2&aqi=no&alerts=no`
    )

    const data: WeatherData | WeatherApiError = await response.json()

    if (!response.ok) {
      if (isWeatherErrorResponse(data)) {
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
