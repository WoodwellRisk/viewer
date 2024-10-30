import { useState, useEffect, useCallback, useRef } from 'react'
import { Box, IconButton, useThemeUI } from 'theme-ui'
import { keyframes } from '@emotion/react'
import mapboxgl from 'mapbox-gl'
import { Reset } from '@carbonplan/icons'

const ResetDemo = () => {
  const { theme } = useThemeUI()
  const mapRef = useRef()
  const demoResetButton = useRef(null)

  const [zoom, setZoom] = useState(0.6)
  const [center, setCenter] = useState([-103.0, 53.0])

  const spin = keyframes({
    from: {
      transform: 'rotate(0turn)'
    },
    to: {
      transform: 'rotate(1turn)'
    }
  })

  const handleResetClick = useCallback((event) => {
    // reset map
    demoResetButton.current = event.target
    demoResetButton.current.classList.add('spin')

    if (zoom != 0.6 || center[0] != -103.0 || center[1] != 53.0) {
      mapRef.current.flyTo({
        center: [-103.0, 53.0],
        zoom: 0.6,
      })
      setZoom(0.6)
      setCenter([-103.0, 53.0])
    }
  })

  const handleAnimationEnd = useCallback(() => {
    demoResetButton.current.classList.remove('spin')
  })

  useEffect(() => {
    if (!mapRef.current) return
    const mbMap = new mapboxgl.Map({
      container: mapRef.current,
      center: center,
      zoom: zoom,
      maxZoom: 4.5
    })
    mapRef.current = mbMap

    const demoCountriesSource = ('demoCountriesSource', {
      'type': 'vector',
      'tiles': [`https://storage.googleapis.com/risk-maps/vector/land/{z}/{x}/{y}.pbf`],
    })

    mapRef.current.addSource('demoCountriesSource', demoCountriesSource)

    const demoCountriesOutline = {
      'id': 'demoCountriesOutline',
      'type': 'line',
      'source': 'demoCountriesSource',
      'source-layer': 'land',
      'layout': { visibility: 'visible' },
      'paint': {
        'line-color': theme.rawColors.primary,
        'line-color': 'black',
        'line-opacity': 1.0,
        'line-width': 0.5,
      },
    }

    mapRef.current.addLayer(demoCountriesOutline)

    mapRef.current.on('move', () => {
      // get the current center coordinates and zoom level from the map
      let newCenter = mapRef.current.getCenter()
      let newZoom = mapRef.current.getZoom()

      // update state
      setCenter([newCenter.lng, newCenter.lat])
      setZoom(newZoom)
    })

    return () => {
      mapRef.current = null
    }
    // return

  }, [])

  return (
    <Box>
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '200px',
          outlineWidth: '1px',
          outlineStyle: 'solid',
          outlineColor: theme.rawColors.primary,
        }}
      >
      </div>
      <IconButton
        aria-label='Reset map extent - demo'
        onClick={handleResetClick}
        onAnimationEnd={handleAnimationEnd}
        disabled={zoom == 0.6 && center[0] == -103.0 && center[1] == 53.0}
        sx={{
          stroke: 'primary', cursor: 'pointer', ml: [2],
          display: ['initial', 'initial', 'initial', 'initial'],
          position: 'absolute',
          color: (zoom == 0.6 && center[0] == -103.0 && center[1] == 53.0) ? 'muted' : 'primary',
          left: [4],
          bottom: [13],
          '.spin': {
            animation: `${spin.toString()} 1s`,
          },
        }}
      >
        <Reset sx={{ strokeWidth: 1.75, width: 20, height: 20 }} />
      </IconButton>
    </Box>
  )
}

export default ResetDemo