import { useEffect, useRef } from 'react'
import { useMapbox } from '@carbonplan/maps'
import { v4 as uuidv4 } from 'uuid'

const FilterLayer = ({
  id,
  source,
  variable,
  place,
  color,
  minZoom = null,
  opacity = 1,
  type,
}) => {
  const { map } = useMapbox()
  const removed = useRef(false)
  const sourceIdRef = useRef(null)
  const layerIdRef = useRef(null)

  let opacityProperty = type == 'line' ? 'line-opacity' : 'circle-opacity'
  let width = 2

  console.log(source)

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

    if (!map.getLayer(layerId)) {
      let tempLayer
      tempLayer = map.addLayer({
        id: layerId,
        type: 'line',
        source: sourceId,
        'source-layer': variable,
        layout: { 
          visibility: 'visible',
          // 'line-cap': 'round',
          // 'line-cap': 'butt',
          // 'line-join': 'round',
        },
        paint: {
          'line-blur': 0.4,
          'line-color': color,
          'line-opacity': opacity,
          'line-width': width,
          // "line-dasharray": [1, 1]
        },
        'filter': ['==', 'name', place]
      })

      setTimeout(function () {
        map.setPaintProperty(layerId, opacityProperty, 1);
      }, 0)

      return () => {
        if (!removed.current) {
          if (map.getLayer(layerId)) {
            map.removeLayer(layerId)
          }
        }
      }
    }
  }, [])

  return null
}

export default FilterLayer