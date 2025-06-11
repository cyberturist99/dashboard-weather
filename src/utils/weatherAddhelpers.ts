export const getUvDescription = (uv: number): string => {
  const roundedUv = Math.round(uv)
  if (roundedUv <= 2) return 'Низкий'
  else if (roundedUv >= 3 && roundedUv <= 5) return 'Средний'
  else if (roundedUv >= 6 && roundedUv <= 7) return 'Высокий'
  else if (roundedUv >= 8 && roundedUv <= 10) return 'Очень высокий'
  return 'Экстремально высокий'
}
export const getVisibilityDescription = (km: number): string => {
  const distanceInMeters = km * 1000
  if (distanceInMeters <= 200) return 'Нулевая'
  else if (distanceInMeters >= 201 && distanceInMeters <= 500)
    return 'Очень плохая'
  else if (distanceInMeters >= 501 && distanceInMeters <= 1000) return 'Плохая'
  else if (distanceInMeters >= 1001 && distanceInMeters <= 5000)
    return 'Умеренная'
  else if (distanceInMeters >= 5001 && distanceInMeters <= 10000)
    return 'Хорошая'
  return 'Идеальная'
}
export const convertInchesToMillimeters = (inches: number): number => {
  return Math.round(inches * 25.4)
}
export const getTomorrowWeekday = (): string => {
  const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']

  const today = new Date()
  today.setDate(today.getDate() + 1)

  const dayIndex = today.getDay()
  return days[dayIndex]
}
export const translateWindDir = (dir: string): string => {
  const map: Record<string, string> = {
    N: 'С',
    NNE: 'ССВ',
    NE: 'СВ',
    ENE: 'ВСВ',
    E: 'В',
    ESE: 'ВЮВ',
    SE: 'ЮВ',
    SSE: 'ЮЮВ',
    S: 'Ю',
    SSW: 'ЮЮЗ',
    SW: 'ЮЗ',
    WSW: 'ЗЮЗ',
    W: 'З',
    WNW: 'СЗЗ',
    NW: 'СЗ',
    NNW: 'ССЗ',
  }

  return map[dir.toUpperCase()] || dir
}
