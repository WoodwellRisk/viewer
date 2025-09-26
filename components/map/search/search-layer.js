import { useEffect, useRef } from 'react'
import { Badge, Box, useThemeUI } from 'theme-ui'
import { useMapbox } from '@carbonplan/maps'
import { v4 as uuidv4 } from 'uuid'

import useStore from '../../store/index'

const SearchLayer = ({
  id,
  source,
  color,
  minZoom = 0,
  maxZoom = 8.9,
  opacity = 1,
  type,
}) => {
  const { theme } = useThemeUI()
  const { map } = useMapbox()
  const removed = useRef(false)
  const sourceIdRef = useRef(null)
  const layerIdRef = useRef(null)
  const textIdRef = useRef()

  const place = useStore((state) => state.place)
  const setPlace = useStore((state) => state.setPlace)
  const setSearchText = useStore((state) => state.setSearchText)
  const lookup = useStore((state) => state.lookup)
  const result = useStore((state) => state.result)
  const setCoordinates = useStore((state) => state.setCoordinates)
  const setBbox = useStore((state) => state.setBbox)

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
    if (place != null) {
      sourceIdRef.current = id || uuidv4()
      const { current: sourceId } = sourceIdRef

      if (!map.getSource(sourceId)) {
        if (type == 'circle') {
          map.addSource(sourceId, {
            type: 'geojson',
            data: source,
          })
        } else {
          map.addSource(sourceId, {
            type: 'vector',
            tiles: [`${source}/{z}/{x}/{y}.pbf`],
          })
        }

        if (minZoom) {
          map.getSource(sourceId).minzoom = minZoom
        }
        if (maxZoom) {
          map.getSource(sourceId).maxzoom = maxZoom
        }
      }
    }
  }, [id])

  useEffect(() => {
    if (place != null) {
      const { current: sourceId } = sourceIdRef
      const layerId = place || uuidv4()
      layerIdRef.current = layerId
      textIdRef.current = uuidv4()
      const { current: textId } = textIdRef

      if (!map.getLayer(layerId)) {
        let tempLayer

        if (type == 'line') {
          tempLayer = map.addLayer({
            'id': layerId,
            'type': type,
            'source': sourceId,
            'source-layer': lookup, // commented out if using geojson layer instead of pbf layer
            'layout': {
              'visibility': 'visible',
            },
            'paint': {
              'line-blur': 0.4,
              'line-color': color,
              'line-opacity': opacity,
              'line-width': width,
            },
            'filter': ['==', 'name', place]
          })

        } else if (type == 'circle') {
          tempLayer = map.addLayer({
            'id': layerId,
            'type': type,
            'source': sourceId,
            // 'source-layer': lookup, // commented out if using geojson layer instead of pbf layer
            'layout': {
              'visibility': 'visible',
            },
            'paint': {
              'circle-color': color,
              // 'circle-opacity': 0.7,
              'circle-radius': 4,
            },
            'filter': ['==', 'name', place]
          })

          if (!map.style.stylesheet.glyphs) {
            console.log("Please specify a glyphs object in the <Map /> component in order to use text labels.")
            // return
          }

          if (!map.getLayer(textId) && map.style.stylesheet.glyphs) {
            map.addLayer({
              'id': textId,
              'type': 'symbol',
              'source': sourceId,
              'source-layer': lookup,
              'paint': {
                'text-color': color,
              },
              'filter': ['==', 'name', place],
              'layout': {
                'text-ignore-placement': false,
                'text-font': ['ginto-normal-regular'],
                'text-field': ['format', ['get', 'name'], { 'font-scale': 1.0 }],
                // 'text-field': ['get', 'name'],
                'text-variable-anchor': ['bottom-left'],
                'text-justify': 'left',
              },
            })
          }
        } else { // if type is not in ['cirle', 'line'], return null
          return null
        }

        setTimeout(() => {
          map.setPaintProperty(layerId, opacityProperty, 1);
        }, 0)

        if (result.length != 0) {
          console.log(result)
          if (lookup == 'cities') {
            let coords = JSON.parse(result[2])
            setCoordinates(coords)
          } else {
            let bbox = JSON.parse(result[2])
            setBbox(bbox)
          }
        }

        return () => {
          if (!removed.current) {
            if (map.getLayer(layerId)) {
              map.removeLayer(layerId)
            }
            if (map.getSource(sourceId)) {
              map.removeSource(sourceId)
            }
            if (map.getLayer(textId)) {
              map.removeLayer(textId)
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

export default SearchLayer