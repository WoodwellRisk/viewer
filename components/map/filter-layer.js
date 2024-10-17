import { useEffect, useRef } from 'react'
import { useMapbox } from '@carbonplan/maps'
import { v4 as uuidv4 } from 'uuid'

const updatePaintProperty = (map, ref, key, value) => {
  const { current: id } = ref
  if (map.getLayer(id)) {
    map.setPaintProperty(id, key, value)
  }
}

const FilterLayer = ({
  source,
  variable,
  color,
  id,
  minZoom = null,
  opacity = 1,
  label = false,
  labelText = null,
  filter = null,
  type,
  place
}) => {
  const { map } = useMapbox()
  const removed = useRef(false)

  const sourceIdRef = useRef()
  const layerIdRef = useRef()
  const textIdRef = useRef()

  let opacityProperty = type == 'line' ? 'line-opacity' : 'circle-opacity'
  let colorProperty = type == 'line' ? 'line-color' : 'circle-color'
  let widthProperty = type == 'line' ? 'line-width' : 'circle-radius'
  let width = 4

  useEffect(() => {
    map.on('remove', () => {
      removed.current = true
    })
  }, [])

  useEffect(() => {
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
  }, [id])

  useEffect(() => {
    const { current: sourceId } = sourceIdRef

    const layerId = layerIdRef.current || uuidv4()
    layerIdRef.current = layerId
    
    textIdRef.current = uuidv4()
    const { current: textId } = textIdRef

    if (!map.getLayer(layerId)) {
      let tempLayer
      tempLayer = map.addLayer({
        id: layerId,
        type: 'line',
        source: sourceId,
        'source-layer': variable,
        layout: { visibility: 'visible' },
        paint: {
          'line-blur': 0.4,
          'line-color': color,
          'line-opacity': opacity,
          'line-width': width * 2,
        },
        'filter': ['==', 'name', place]
      })
    }


    // if (label) {
    //   if (!map.style.stylesheet.glyphs) {
    //     console.log("Please specify a glyphs object in the <Map /> component in order to use text labels.")
    //     return
    //   }

    //   if (!map.getLayer(textId)) {
    //     map.addLayer({
    //       id: textId,
    //       type: 'symbol',
    //       source: sourceId,
    //       'source-layer': variable,
    //       paint: {
    //         'text-color': color,
    //         'text-opacity': 1.0,
    //         'text-translate': [0, 0],
    //       },
    //       layout: {
    //         'text-ignore-placement': false,
    //         'text-font': ['Metropolis Regular'],
    //         'text-field': ['format', ['get', labelText], { 'font-scale': 1.0 }],
    //       },
    //       'filter': ['==', 'name', place],
    //     //   'filter': [ "any", 
    //     //   ["any", [ ">=", "$zoom", 0 ], [ ">=", "pop_max", 1500000 ] ],
    //     //   [ "any", [ ">=", "$zoom", 4 ], [ ">=", "pop_max", 1000000 ] ],
    //     //   [ "any", [ ">=", "$zoom", 6 ], [ ">=", "pop_max", 0 ] ],
    //     // ]
    //     })
    //   }
    // }

    setTimeout(function () {
      map.setPaintProperty(layerId, 'line-opacity', 1);
      // map.setPaintProperty(textId, 'text-opacity', 1);
    }, 1)

    return () => {
      if (!removed.current) {
        if (map.getLayer(layerId)) {
          map.removeLayer(layerId)
        }
      }
    }
  }, [])

  useEffect(() => {
    updatePaintProperty(map, layerIdRef, colorProperty, color)
  }, [color])

  useEffect(() => {
    updatePaintProperty(map, layerIdRef, opacityProperty, opacity)
  }, [opacity])

  useEffect(() => {
    updatePaintProperty(map, layerIdRef, widthProperty, width)
  }, [width])

  return null
}

export default FilterLayer