import { MOSCOW_COORDS } from '@/consts/locations/moscow'
import { COORDINATE_RANGES } from '@/consts/coordsRanges'

interface IValidationResult {
  isValid: boolean
  coords: typeof MOSCOW_COORDS
  error?: 'Координат нет' | 'Неверный формат данных'
}

export function geoCoordsValidation(
  lat: string | null,
  lon: string | null
): IValidationResult {
  if (!lat || !lon) {
    return {
      isValid: false,
      coords: { ...MOSCOW_COORDS },
      error: 'Координат нет',
    }
  }
  const numberLat = Number(lat)
  const numberLon = Number(lon)

  if (isNaN(numberLat) || isNaN(numberLon)) {
    return {
      isValid: false,
      coords: { ...MOSCOW_COORDS },
      error: 'Неверный формат данных',
    }
  }

  if (
    numberLat < COORDINATE_RANGES.latitude.min ||
    numberLat > COORDINATE_RANGES.latitude.max ||
    numberLon < COORDINATE_RANGES.longitude.min ||
    numberLon > COORDINATE_RANGES.longitude.max
  ) {
    return {
      isValid: false,
      coords: { ...MOSCOW_COORDS },
      error: 'Неверный формат данных',
    }
  }

  return {
    isValid: true,
    coords: { latitude: numberLat, longitude: numberLon },
  }
}
