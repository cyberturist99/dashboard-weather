import styled from 'styled-components'
import { WeatherData } from '@/interfaces/types'
import {
  getVisibilityDescription,
  getUvDescription,
  getTomorrowWeekday,
  convertInchesToMillimeters,
  translateWindDir,
} from '@/utils/weatherAddhelpers'
import Compass from '@/UI/Compass'

interface WeatherAdditionalProps {
  data: WeatherData
}
export default function WeatherAdditional({ data }: WeatherAdditionalProps) {
  const { current, forecast } = data

  return (
    <WrapperSec>
      <Item className='item1'>
        <Text>Ощущается как</Text>
        <Text> {Math.round(forecast.forecastday[0].day.maxtemp_c)}°</Text>
      </Item>
      <Item className='item2'>
        <Text>УФ-Индекс</Text>
        <Text>{Math.round(current.uv)}</Text>
        <Text>{getUvDescription(current.uv)}</Text>
      </Item>

      <Item className='item3'>
        <WrapperText>
          <Text> Ветер {Math.round(current.wind_kph)} м/с </Text>
          <Text>Порывы ветра {Math.round(current.gust_kph)} м/с </Text>
          <Text>Направление {translateWindDir(current.wind_dir)}</Text>
        </WrapperText>
        <Compass direction={current.wind_dir} />
      </Item>
      <Item className='item4'>
        <Text>Видимость</Text>
        <Text>{current.vis_km} км</Text>
        <Text>{getVisibilityDescription(current.vis_km)}</Text>
      </Item>
      <Item className='item5'>
        <Text>Влажность</Text>
        <Text>{current.humidity}%</Text>
      </Item>
      <Item className='item6'>
        <Text>Давление</Text>
        <Text>
          {convertInchesToMillimeters(current.pressure_in)} мм. рт. ст.
        </Text>
      </Item>
      <Item className='item7'>
        <Text>Осадки</Text>
        <Text>{current.precip_mm} мм </Text>
        <Text>
          {getTomorrowWeekday()}: Ожидается{' '}
          {Math.round(forecast.forecastday[1].day.totalprecip_mm)} мм осадков
        </Text>
      </Item>
    </WrapperSec>
  )
}

const WrapperSec = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-left: 15px;
  margin-right: 15px;
`
const Text = styled.div``
const Item = styled.div`
  background: #cce4ff;
  padding: 15px;
  text-align: center;
  font-weight: bold;
  border-radius: 6px;
  color: white;

  &.item1 {
    grid-column: 1 / 2;
    grid-row: 1;
    background: linear-gradient(to right, #d946ef, #06b6d4);
  }

  &.item2 {
    grid-column: 2 / 3;
    grid-row: 1;
    background: linear-gradient(to right, #ef4444, #f97316);
  }
  &.item3 {
    grid-column: 1 / 3; /* занимает обе колонки */
    grid-row: 2;
    background: linear-gradient(to right, #38b2ac, #fef08a);
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
  }

  &.item4 {
    grid-column: 1 / 2;
    grid-row: 3;
    background: linear-gradient(to right, #bfdbfe, #67e8f9);
  }

  &.item5 {
    grid-column: 2 / 3;
    grid-row: 3;
    background: linear-gradient(to right, #f59e0b, #ec4899);
  }

  &.item6 {
    grid-column: 1 / 2;
    grid-row: 4;
    background: linear-gradient(to right, #ec4899, #f43f5e);
  }

  &.item7 {
    grid-column: 2 / 3;
    grid-row: 4;
    background: linear-gradient(to right, #6366f1, #3b82f6);
  }
`
const WrapperText = styled.div`
  margin-right: 30px; /* больше отступ чтобы было не так плотно */
  flex: 1;
`
