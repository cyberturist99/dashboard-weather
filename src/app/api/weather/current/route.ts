import { NextResponse } from 'next/server'

const apiKey = process.env.API_SECRET_KEY
export const GET = async () => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Moscow&days=2&aqi=no&alerts=no
` // main page requires next day to show precip_mm
    )
    const data = await response.json()
    return NextResponse.json(data)
  } catch (e) {
    console.log(e)
  }
}
