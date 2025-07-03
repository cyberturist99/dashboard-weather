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

  // Автоматический расчет минимальной ширины для YAxis
  const calculateYAxisWidth = () => {
    const temps = chartData.map((item) => item['°C'])
    const maxTemp = Math.max(...temps)
    const minTemp = Math.min(...temps)
    // Ширина зависит от количества цифр в максимальном числе
    const maxDigits = Math.max(
      maxTemp.toString().length,
      minTemp.toString().length
    )
    return maxDigits * 8 + 20 // 8px на цифру + 20px на символ °C
  }

  const yAxisWidth = calculateYAxisWidth()

  return (
    <Wrapper24>
      <ChartTitle>Прогноз на 24 часа</ChartTitle>
      <ChartContainer>
        <ResponsiveContainer
          width='100%'
          height='100%'
        >
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: yAxisWidth, // Динамический отступ слева
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray='3 3'
              stroke='#e0e0e0'
            />
            <XAxis
              dataKey='name'
              tick={{ fill: '#555', fontSize: 11 }}
              axisLine={{ stroke: '#888' }}
              tickMargin={8}
              interval={0} // Показываем все метки
            />
            <YAxis
              tickFormatter={(value) => `${value}°C`}
              tick={{ fill: '#555', fontSize: 11 }}
              axisLine={{ stroke: '#888' }}
              tickMargin={5}
              width={yAxisWidth}
              domain={['dataMin - 1', 'dataMax + 1']}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '8px',
                border: '1px solid #ddd',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                fontSize: '14px',
              }}
              formatter={(value) => [`${value}°C`, 'Температура']}
              labelFormatter={(label) => `Время: ${label}:00`}
            />
            <defs>
              <linearGradient
                id='warmGradient'
                x1='0'
                y1='0'
                x2='0'
                y2='1'
              >
                <stop
                  offset='0%'
                  stopColor='#F1BA8B'
                />
                <stop
                  offset='100%'
                  stopColor='#E7491B'
                />
              </linearGradient>

              <linearGradient
                id='coldGradient'
                x1='0'
                y1='0'
                x2='0'
                y2='1'
              >
                <stop
                  offset='0%'
                  stopColor='#3E8AFF'
                />
                <stop
                  offset='100%'
                  stopColor='#3EC6FF'
                />
              </linearGradient>

              <linearGradient
                id='splitColor'
                x1='0'
                y1='0'
                x2='0'
                y2='1'
              >
                <stop
                  offset={off}
                  stopColor='#ec9006'
                  stopOpacity={1}
                />
                <stop
                  offset={off}
                  stopColor='#3E8AFF'
                  stopOpacity={1}
                />
              </linearGradient>
            </defs>
            <Area
              type='monotone'
              dataKey='°C'
              stroke='#444'
              fill='url(#warmGradient)'
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Wrapper24>
  )
}

const Wrapper24 = styled.div`
  margin: 0 10px 30px;
  width: calc(100% - 20px);
  height: 380px;
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  overflow: hidden;
`

const ChartContainer = styled.div`
  width: 100%;
  height: calc(100% - 28px);
  position: relative;
`

const ChartTitle = styled.h3`
  color: #333;
  font-size: 1.4rem;
  margin: 0 0 8px 0;
  font-weight: 600;
`
