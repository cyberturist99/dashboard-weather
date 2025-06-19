import { WeatherApiError, WeatherData } from '@/interfaces/types'
import { NextResponse } from 'next/server'

const apiKey = process.env.API_SECRET_KEY

export const GET = async (): Promise<NextResponse> => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Moscow&days=2&aqi=no&alerts=no`
    )

    const data: WeatherData | WeatherApiError = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: data.error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (e) {
    console.error(`Error fetching data: ${e}`)
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 })
  }
}
