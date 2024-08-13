import { useEffect, useRef } from 'react'
import { useMapbox } from '@carbonplan/maps'
// import { updatePaintProperty } from './utils'
import { v4 as uuidv4 } from 'uuid'

const updatePaintProperty = (map, ref, key, value) => {
    const { current: id } = ref
    if (map.getLayer(id)) {
      map.setPaintProperty(id, key, value)
    }
  }

const FillMinZoom = ({
  source,
  variable,
  color,
  id,
  minZoom = 4,
  opacity = 1,
  blur = 0.4,
  width = 0.5,
  label = false, 
  labelText = null,
}) => {
  const { map } = useMapbox()
  const removed = useRef(false)

  const sourceIdRef = useRef()
  const layerIdRef = useRef()

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
    const layerId = layerIdRef.current || uuidv4()
    layerIdRef.current = layerId
    const { current: sourceId } = sourceIdRef
    if (!map.getLayer(layerId)) {
      map.addLayer({
        id: layerId,
        type: 'fill',
        source: sourceId,
        'source-layer': variable,
        layout: { visibility: 'visible' },
        paint: {
            'fill-color': color,
            'fill-opacity': opacity,
          },
      })
    }

    // if (label) {
    //     if (!map.style.stylesheet.glyphs) {
    //       console.log("Please specify a glyphs object in the <Map /> component in order to use text labels.")
    //       return
    //     }
    //     textIdRef.current = uuidv4()
    //     const { current: textId } = textIdRef
  
    //     if (!map.getLayer(textId)) {
    //       map.addLayer({
    //         id: textId,
    //         type: 'symbol',
    //         source: sourceId,
    //         'source-layer': variable,
    //         paint: {
    //           'text-color': color,
    //           'text-opacity': 0.7,
    //           'text-translate': [30, -10],
    //         },
    //         layout: {
    //           'text-ignore-placement': false,
    //           // 'text-font': ['relative-faux-book'],
    //           'text-font': ['Metropolis Regular'],
    //           'text-field': ['format', ['get', labelText], { 'font-scale': 1.0 }],
    //         },
    //       })
    //     }
    // }

    return () => {
      if (!removed.current) {
        if (map.getLayer(layerId)) {
          map.removeLayer(layerId)
        }
      }
    }
  }, [])

  useEffect(() => {
    updatePaintProperty(map, layerIdRef, 'fill-color', color)
  }, [color])

  useEffect(() => {
    updatePaintProperty(map, layerIdRef, 'fill-opacity', opacity)
  }, [opacity])

  return null
}

export default FillMinZoom