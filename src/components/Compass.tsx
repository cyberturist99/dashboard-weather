import styled from 'styled-components'
import { translateWindDir } from '@/utils/weatherAddhelpers'
type CompassProps = {
  direction: string
}

const directionToDegrees: Record<string, number> = {
  N: 0,
  NNE: 22.5,
  NE: 45,
  ENE: 67.5,
  E: 90,
  ESE: 112.5,
  SE: 135,
  SSE: 157.5,
  S: 180,
  SSW: 202.5,
  SW: 225,
  WSW: 247.5,
  W: 270,
  WNW: 292.5,
  NW: 315,
  NNW: 337.5,
}

const Compass: React.FC<CompassProps> = ({ direction }) => {
  const degrees = directionToDegrees[direction.toUpperCase()] ?? 0

  return (
    <CompassWrapper>
      <Circle />
      <Arrow style={{ transform: `rotate(${degrees}deg)` }} />
      <DirectionLabel>
        {translateWindDir(direction.toUpperCase())}
      </DirectionLabel>
    </CompassWrapper>
  )
}

const CompassWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`

const Circle = styled.div`
  width: 100px;
  height: 100px;
  border: 2px solid white;
  border-radius: 50%;
  position: relative;
`

const Arrow = styled.div`
  width: 6px;
  height: 45px;
  background: white;
  position: absolute;
  top: 12px;
  left: 50%;
  transform-origin: bottom center;
  margin-left: -3px;
  border-radius: 3px;
`

const DirectionLabel = styled.div`
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
  font-size: 18px;
  user-select: none;
  pointer-events: none;
`

export default Compass
