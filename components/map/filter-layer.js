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

  // const delay = ms => new Promise(res => setTimeout(res, ms));

  useEffect(() => {
    map.on('remove', () => {
      removed.current = true
    })
  }, [])

  // https://github.com/mapbox/mapbox-gl-js/issues/1794#issuecomment-588252774
  useEffect(() => {
    map.on('moveend', ({ originalEvent }) => {
      if (originalEvent) {
        map.fire('usermoveend');
      } else {
        map.fire('flyend');
      }
    });
  }, [])

  useEffect(() => {
    console.log(map.getStyle().layers)
  }, [map.getStyle().layers])

  useEffect(() => {
    sourceIdRef.current = id || uuidv4()
    const { current: sourceId } = sourceIdRef
    layerIdRef.current = null

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
    // const layerId = layerIdRef.current || uuidv4()
    // layerIdRef.current = layerId
    layerIdRef.current = place || uuidv4()
    const { current: layerId } = layerIdRef

    if (!map.getLayer(layerId)) {
      let tempLayer
      tempLayer = map.addLayer({
        id: layerId,
        type: 'line',
        source: sourceId,
        'source-layer': variable,
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

      // the problem with this code is that we are always hitting the 
      //return statement before the map.on('flyend') call is finishing
      // map.on('flyend', () => {
      // setTimeout(function () {
      //   map.setPaintProperty(layerId, opacityProperty, 0)
      // }, 0)
      // setTimeout(function () {
      //   map.setPaintProperty(layerId, opacityProperty, 1)
      // }, 250)
      // setTimeout(function () {
      //   map.setPaintProperty(layerId, opacityProperty, 0)
      // }, 500)
      // setTimeout(function () {
      //   map.setPaintProperty(layerId, opacityProperty, 1)
      // }, 750)
      // setTimeout(function () {
      //   map.setPaintProperty(layerId, opacityProperty, 0)
      // }, 1000)
      // setTimeout(function () {
      //   map.setPaintProperty(layerId, opacityProperty, 1)
      // }, 1250)
      // setTimeout(function () {
      //   map.setPaintProperty(layerId, opacityProperty, 0)
      // }, 1500)
      // setTimeout(function () {
      //   map.setPaintProperty(layerId, opacityProperty, 1)
      // }, 1750)
      // setTimeout(function () {
      //   map.setPaintProperty(layerId, opacityProperty, 0)
      // }, 2000)
      // })

      // setTimeout(function () {
      //   map.setPaintProperty(layerId, opacityProperty, 1);
      // }, 0)
    }

      return () => {
        if (!removed.current) {
          if (map.getLayer(layerId)) {
            map.removeLayer(layerId)
          }
          map.removeSource(sourceId)
        }
      }
  }, [])

  return null
}

export default FilterLayer