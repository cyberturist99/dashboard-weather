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
  TooltipProps,
} from 'recharts'
import { useUpcomingWeather } from '@/hooks/useUpcomingWeather'

import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent'

function getWeekdays(dates: string[]): string[] {
  const weekdays = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']

  return dates.map((dateStr) => {
    const date = new Date(dateStr)
    const dayName = weekdays[date.getDay()]
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    return `${dayName}, ${day}.${month}`
  })
}

interface UpcomingWeatherProps {
  coordinates: {
    latitude: number
    longitude: number
  }
}

interface ChartDataPoint {
  day: string
  tempMax: number
  tempMin: number
}

interface TemperatureValueProps {
  $isMax?: boolean
  children: React.ReactNode
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (!active || !payload || payload.length === 0) return null

  return (
    <TooltipContainer>
      <TooltipLabel>{label}</TooltipLabel>
      {payload.map((entry, index) => (
        <TooltipItem key={`tooltip-${index}`}>
          <span>{entry.name === 'tempMax' ? 'Максимум' : 'Минимум'}:</span>
          <TemperatureValue $isMax={entry.name === 'tempMax'}>
            {entry.value}°C
          </TemperatureValue>
        </TooltipItem>
      ))}
    </TooltipContainer>
  )
}

export default function UpcomingWeather({ coordinates }: UpcomingWeatherProps) {
  const { data, isLoading, isError, error } = useUpcomingWeather(coordinates)

  if (isLoading) return <LoadingWrapper>Загружаем прогноз...</LoadingWrapper>
  if (isError) return <ErrorWrapper>{error.message}</ErrorWrapper>
  if (!data) return <ErrorWrapper>Нет данных о погоде</ErrorWrapper>

  const { daily } = data
  const { time, temperature_2m_max, temperature_2m_min } = daily
  const dates = getWeekdays(time)

  const chartData: ChartDataPoint[] = dates.map((day, index) => ({
    day,
    tempMax: Math.round(temperature_2m_max[index]),
    tempMin: Math.round(temperature_2m_min[index]),
  }))

  return (
    <Wrapper>
      <Header>
        <Title>Прогноз на 10 дней</Title>
      </Header>

      <ChartContainer>
        <ResponsiveContainer
          width='100%'
          height={300}
        >
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
            barSize={24}
          >
            <CartesianGrid
              strokeDasharray='3 3'
              vertical={false}
              stroke='#eaeaea'
            />
            <XAxis
              dataKey='day'
              tick={{ fill: '#555', fontSize: 12 }}
              axisLine={{ stroke: '#ddd' }}
              tickMargin={10}
            />
            <YAxis
              tick={{ fill: '#555', fontSize: 12 }}
              axisLine={{ stroke: '#ddd' }}
              tickFormatter={(value) => `${value}°C`}
              tickMargin={10}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(200, 200, 200, 0.2)' }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => (
                <LegendItem $isMax={value === 'tempMax'}>
                  {value === 'tempMax'
                    ? 'Макс. температура'
                    : 'Мин. температура'}
                </LegendItem>
              )}
            />
            <ReferenceLine
              y={0}
              stroke='#aaa'
              strokeDasharray='3 3'
            />
            <Bar
              dataKey='tempMax'
              fill='#FF7E5D'
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey='tempMin'
              fill='#FFB45D'
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 0 10px 40px;
  width: calc(100% - 20px);
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`

const Header = styled.div`
  margin-bottom: 20px;
`

const Title = styled.h2`
  color: #333;
  font-size: 1.4rem;
  margin: 0 0 8px 0;
  font-weight: 600;
`

const ChartContainer = styled.div`
  width: 100%;
  height: 340px;
`

const TemperatureValue = styled.span<TemperatureValueProps>`
  color: ${(props) => (props.$isMax ? '#e74c3c' : '#3498db')};
  font-weight: 600;
  margin-left: 8px;
`

const TooltipLabel = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
  color: #333;
`

const TooltipContainer = styled.div`
  background: rgba(255, 255, 255, 0.96);
  border-radius: 8px;
  border: 1px solid #eee;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 12px;
  font-size: 14px;
`

const TooltipItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4px 0;
`

const LegendItem = styled.span<{ $isMax?: boolean }>`
  color: ${(props) => (props.$isMax ? '#e74c3c' : '#3498db')};
  padding: 0 8px;
  font-size: 0.9rem;
`

const LoadingWrapper = styled.div`
  margin: 20px;
  padding: 40px;
  text-align: center;
  color: #666;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`

const ErrorWrapper = styled.div`
  margin: 20px;
  padding: 40px;
  text-align: center;
  color: #e74c3c;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`
