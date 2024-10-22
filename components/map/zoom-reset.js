import { IconButton } from 'theme-ui'
import { keyframes } from '@emotion/react'
import { useCallback, useRef } from 'react'
import { useMapbox } from '@carbonplan/maps'
import { Reset } from '@carbonplan/icons'

import useStore from '../store/index'

const ZoomReset = () => {
  const { map } = useMapbox()
  const zoom = useStore((state) => state.zoom)
  const center = useStore((state) => state.center)
  const place = useStore((state) => state.place)
  const setPlace = useStore((state) => state.setPlace)
  const setSearchText = useStore((state) => state.setSearchText)
  const resetButton = useRef(null)

  const spin = keyframes({
    from: {
      transform: 'rotate(0turn)'
    },
    to: {
      transform: 'rotate(1turn)'
    }
  })

  const handleResetClick = useCallback((event) => {
      // remove any remaining search layer from map if it exists
      if(map.getLayer(place)) {
        map.removeLayer(place)
      }
      setSearchText('')
      setPlace(null)

    // reset map
    resetButton.current = event.target
    resetButton.current.classList.add('spin')
    
    if (zoom != 1.00) {
      map.flyTo({
        center: [center[0], 40],
        zoom: 1.0,
      })
    }
  })

  const handleAnimationEnd = useCallback(() => {
    resetButton.current.classList.remove('spin')
  })

  return (
    <IconButton
      aria-label='Reset map extent'
      onClick={handleResetClick}
      onAnimationEnd={handleAnimationEnd}
      sx={{
        stroke: 'primary', cursor: 'pointer', ml: [2],
        display: ['initial', 'initial', 'initial', 'initial'],
        position: 'absolute',
        color: 'primary',
        left: [2],
        bottom: [20, 20, 20, 20],
        '.spin': {
          animation: `${spin.toString()} 1s`,
        },
      }}
    >
      <Reset sx={{ strokeWidth: 1.75, width: 20, height: 20 }} />
    </IconButton>
  )
}

export default ZoomReset