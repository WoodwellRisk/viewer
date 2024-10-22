import { useEffect, useRef } from 'react'
import { Badge, Box, useThemeUI } from 'theme-ui'
import { useMapbox } from '@carbonplan/maps'
import { v4 as uuidv4 } from 'uuid'

import useStore from '../store/index'

const FilterLayer = ({
  id,
  source,
  color,
  minZoom = null,
  opacity = 1,
  type,
}) => {
  const { theme } = useThemeUI()
  const { map } = useMapbox()
  const removed = useRef(false)
  const sourceIdRef = useRef(null)
  const layerIdRef = useRef(null)

  const place = useStore((state) => state.place)
  const setPlace = useStore((state) => state.setPlace)
  const setSearchText = useStore((state) => state.setSearchText)
  const lookup = useStore((state) => state.lookup)

  let opacityProperty = type == 'line' ? 'line-opacity' : 'circle-opacity'
  let width = 2

  const sx = {
    'remove-layer-container': {
      display: ['initial', 'initial', 'initial', 'initial'],
      position: 'absolute',
      color: 'primary',
      left: [7],
      bottom: [20, 20, 20, 20],
    },
    'remove-layer-button': {
      color: 'secondary',
      bg: theme.colors.background,
      border: '2px solid',
      borderColor: 'secondary',
      borderRadius: '5px',
      transition: 'border 0.15s',
      fontSize: [3, 3, 3, 4],
      fontFamily: 'body',
      letterSpacing: 'body',
      lineHeight: [1.0],
      height: ['24px', '24px', '24px', '26px'],
      textAlign: 'center',
      pt: ['6px'],
      pb: ['26px'],
      mt: [1],
      '&:hover': {
        color: 'primary',
        borderColor: 'primary',
      },
    }
  }

  useEffect(() => {
    map.on('remove', () => {
      removed.current = true
    })
  }, [])

  useEffect(() => {
    if(place != null) {
      sourceIdRef.current = id || uuidv4()
      const { current: sourceId } = sourceIdRef
  
      if (!map.getSource(sourceId)) {
        map.addSource(sourceId, {
          type: 'vector',
          tiles: [`${source}/{z}/{x}/{y}.pbf`],
        })
        if (minZoom) {
          map.getSource(sourceId).minzoom = minZoom
        }
      }
    }
  }, [id])

  useEffect(() => {
    if(place != null) {
      const { current: sourceId } = sourceIdRef
      const layerId = place || uuidv4()
      layerIdRef.current = layerId
  
      if (!map.getLayer(layerId)) {
        let tempLayer
        tempLayer = map.addLayer({
          id: layerId,
          type: 'line',
          source: sourceId,
          'source-layer': lookup,
          layout: {
            visibility: 'visible',
          },
          paint: {
            'line-blur': 0.4,
            'line-color': color,
            'line-opacity': opacity,
            'line-width': width,
          },
          'filter': ['==', 'name', place]
        })
  
        setTimeout(() => {
          map.setPaintProperty(layerId, opacityProperty, 1);
        }, 0)
  
        return () => {
          if (!removed.current) {
            if (map.getLayer(layerId)) {
              map.removeLayer(layerId)
            }
            if (map.getSource(sourceId)) {
              map.removeSource(sourceId)
            }
          }
        }
  
      }
    }

  }, [])

  const handleRemoveLayer = (() => {
    setSearchText('')
    setPlace(null)
})

  // return null
  return (
    <Box>
      {place != null ?
        <Box sx={sx['remove-layer-container']}>
          <Badge sx={sx['remove-layer-button']} onClick={handleRemoveLayer}>
            Remove search layer
          </Badge>
        </Box>
      : null}
    </Box>
  )
}

export default FilterLayer