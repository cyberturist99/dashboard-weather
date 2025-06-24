'use client'
import styled from 'styled-components'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'
import { useUpcomingWeather } from '@/hooks/use10DayForecast'

function getWeekdays(dates: string[]): string[] {
  const weekdays = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']

  return dates.map((dateStr) => {
    const date = new Date(dateStr)
    const dayName = weekdays[date.getDay()]
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    return `${dayName}, ${day}.${month}` // например: "вт, 25.06"
  })
}
type ChartDataPoint = {
  day: string
  tempMax: number
  tempMin: number
}
// const data = [
//   { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
//   { name: 'Page B', uv: -3000, pv: 1398, amt: 2210 },
//   { name: 'Page C', uv: -2000, pv: -9800, amt: 2290 },
//   { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
//   { name: 'Page E', uv: -1890, pv: 4800, amt: 2181 },
//   { name: 'Page F', uv: 2390, pv: -3800, amt: 2500 },
//   { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
// ]

export default function UpcomingWeather() {
  const { data, isLoading, isError, error } = useUpcomingWeather()

  if (isLoading)
    return <WrapperUpcomingWeather>Загрузка...</WrapperUpcomingWeather>
  if (isError)
    return <WrapperUpcomingWeather>{error.message}</WrapperUpcomingWeather>
  if (!data) return <WrapperUpcomingWeather>Нет данных</WrapperUpcomingWeather>

  const { daily } = data
  const { time } = daily
  const dates = getWeekdays(time)

  function getAccurateDataForGraphic(
    daysArr: string[],
    temperatureMaxArr: number[],
    temperatureMinArr: number[]
  ) {
    const result: ChartDataPoint[] = []
    for (let i = 0; i < daysArr.length; i++) {
      result.push({
        day: daysArr[i],
        tempMax: Math.round(temperatureMaxArr[i]),
        tempMin: Math.round(temperatureMinArr[i]),
      })
    }
    return result
  }
  const chartData = getAccurateDataForGraphic(
    dates,
    daily.temperature_2m_max,
    daily.temperature_2m_min
  )
  return (
    <WrapperUpcomingWeather>
      На 10 дней вперед
      <ResponsiveContainer
        width='100%'
        height={300}
      >
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='day' />
          <YAxis />
          <Tooltip
            formatter={(value, name) => {
              if (name === 'tempMax') {
                return [`${value}°C`, 'Максимальная']
              }
              if (name === 'tempMin') {
                return [`${value}°C`, 'Минимальная']
              }
              return [`${value}°C`, name]
            }}
          />

          <Legend
            formatter={(value) => {
              if (value === 'tempMax') {
                return 'Максимальная температура'
              }
              if (value === 'tempMin') {
                return 'Минимальная температура'
              }
              return
            }}
          />
          <ReferenceLine
            y={0}
            stroke='#000'
          />
          <Bar
            dataKey='tempMax'
            fill='#8884d8'
          />
          <Bar
            dataKey='tempMin'
            fill='#82ca9d'
          />
        </BarChart>
      </ResponsiveContainer>
    </WrapperUpcomingWeather>
  )
}

const WrapperUpcomingWeather = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  width: '100%';
  height: 400px;
`
