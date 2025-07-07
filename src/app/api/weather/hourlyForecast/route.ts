import { isWeatherErrorResponse } from '@/interfaces/typeguards'
import { WeatherApiError, ForecastTenDays } from '@/interfaces/types'
import { NextResponse } from 'next/server'
import { geoCoordsValidation } from '@/utils/geoCoordsValidation'

export const GET = async (request: Request): Promise<NextResponse> => {
  try {
    const { searchParams } = new URL(request.url)
    const lat = searchParams.get('lat')
    const lon = searchParams.get('lon')

    const validationResult = geoCoordsValidation(lat, lon)

    const latitude = `${validationResult.coords.latitude}`
    const longitude = `${validationResult.coords.longitude}`
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&forecast_days=10&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_hours,weathercode&timezone=auto`
    )

    const data: ForecastTenDays | WeatherApiError = await response.json()

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
