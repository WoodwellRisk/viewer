import { useEffect, useRef } from 'react'
import { useMapbox } from '@carbonplan/maps'
import { v4 as uuidv4 } from 'uuid'

const updatePaintProperty = (map, ref, key, value) => {
  const { current: id } = ref
  if (map.getLayer(id)) {
    map.setPaintProperty(id, key, value)
  }
}

const Point = ({ source, variable, color, id, label = false, labelText = null, minZoom = 5.5, maxZoom = 10, opacity = 1 }) => {
  const { map } = useMapbox()
  const removed = useRef(false)

  const sourceIdRef = useRef()
  const layerIdRef = useRef()
  const textIdRef = useRef()

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
      if (maxZoom) {
        map.getSource(sourceId).maxzoom = maxZoom
      }
    }
  }, [id])

  useEffect(() => {
    layerIdRef.current = uuidv4()

    const { current: layerId } = layerIdRef
    const { current: sourceId } = sourceIdRef

    if (!map.getLayer(layerId)) {
      map.addLayer({
        id: layerId,
        type: 'circle',
        source: sourceId,
        'source-layer': variable,
        layout: { visibility: 'visible' },
        paint: {
          'circle-color': color,
          'circle-opacity': 0.7,
          'circle-radius': 4,
        },
      })
    }

    if (label) {
      if (!map.style.stylesheet.glyphs) {
        console.log("Please specify a glyphs object in the <Map /> component in order to use text labels.")
        return
      }
      textIdRef.current = uuidv4()
      const { current: textId } = textIdRef

      if (!map.getLayer(textId)) {
        map.addLayer({
          id: textId,
          type: 'symbol',
          source: sourceId,
          'source-layer': variable,
          paint: {
            'text-color': color,
            'text-opacity': 0.9,
            'text-translate': [30, -10],
          },
          layout: {
            'text-ignore-placement': false,
            // 'text-font': ['relative-faux-book'],
            'text-font': ['Metropolis Regular'],
            'text-field': ['format', ['get', labelText], { 'font-scale': 1.0 }],
          },
        })
      }

      return () => {
        if (!removed.current) {
          if (map.getLayer(layerId)) {
            map.removeLayer(layerId)
          }
          if (label && map.style.stylesheet.glyphs) {
            if (map.getLayer(textId)) {
              map.removeLayer(textId)
            }
          }
        }
      }
    }
  }, [])

  useEffect(() => {
    updatePaintProperty(map, layerIdRef, 'circle-color', color)
    if (label && map.style.stylesheet.glyphs) {
      updatePaintProperty(map, textIdRef, 'text-color', color)
    }
  }, [color])

  return null
}

export default Point