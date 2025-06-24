'use client'
import styled from 'styled-components'
import { HourlyForecast } from '@/interfaces/types'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface Weather24Props {
  forecast: HourlyForecast[]
}

function gradientOffset(data: HourlyForecast[]) {
  if (!data.length) return 0

  const temps = data.map((i) => i.temp_c)
  const dataMax = Math.max(...temps)
  const dataMin = Math.min(...temps)

  if (dataMax <= 0) return 0
  if (dataMin >= 0) return 1

  return dataMax / (dataMax - dataMin)
}

export default function Weather24({ forecast }: Weather24Props) {
  const off = gradientOffset(forecast)

  const chartData = forecast.map(({ time, temp_c }) => ({
    name: time.slice(10, 13),
    '°C': Math.round(temp_c),
    tempDisplay: `${Math.round(temp_c)}°C`,
  }))

  return (
    <Wrapper24>
      На 24 часа
      <ResponsiveContainer
        width='100%'
        height='100%'
      >
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis tickFormatter={(value) => `${value}°C`} />
          <Tooltip
            formatter={(value) => [`${value}°C`, 'Температура']}
            labelFormatter={(label) => `Время: ${label}:00`}
          />
          <defs>
            <linearGradient
              id='splitColor'
              x1='0'
              y1='0'
              x2='0'
              y2='1'
            >
              <stop
                offset={off}
                stopColor='#A30000'
                stopOpacity={1}
              />
              <stop
                offset={off}
                stopColor='#0390fc'
                stopOpacity={1}
              />
            </linearGradient>
          </defs>
          <Area
            type='monotone'
            dataKey='°C'
            stroke='#000'
            fill='url(#splitColor)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </Wrapper24>
  )
}

const Wrapper24 = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 70px;
  width: 100%;
  height: 400px;
`
