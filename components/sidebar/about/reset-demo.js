import { useState, useEffect, useRef } from 'react'
import { Box, useThemeUI } from 'theme-ui'
import { Line, Map, Raster } from '@carbonplan/maps'
import mapboxgl from 'mapbox-gl'
import ZoomResetDemo from './zoom-reset-demo'
import { equirectangular, naturalEarth1 } from '@carbonplan/minimaps/projections'
import { Minimap, Path, Sphere, Graticule } from '@carbonplan/minimaps'

const ResetDemo = () => {
  const { theme } = useThemeUI()
  const resetDemoContainer = useRef()
  const mapRef = useRef()

  const [demoBand, setDemoBand] = useState('3.5')
  const [zoom, setZoom] = useState(0.6)
  const [center, setCenter] = useState([-103.0, 53.0])

  // const [scale, setScale] = useState(2.5)
  // const [translate, setTranslate] = useState([1.3, 1.2])

  // useEffect(() => {
  //   console.log('registering change')
  // }, [loading])

  // https://github.com/carbonplan/ncview-js/blob/199ba7a2f662053f9280a871ba009b536a36424e/components/map-container.js#L6
  // https://github.com/carbonplan/prototype-maps/blob/6f867bfe6731c5c880f6ebf3ea36c8b3efe2809e/components/titiler/mapbox-map.js#L19
  // try to start with this link ^^
  // this issue might be that i need to put mapRef into a <div> component, like:
  // <Box sx={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}>
  //   <div style={{ width: '100%', height: '100%' }} ref={mapRef}></div>
  // </Box>
  // you can see that again here: https://github.com/carbonplan/maps/blob/f22c038c1e09b88d98e7005d25184d96dd4229a4/src/mapbox.js#L13

  useEffect(() => {
    if (!mapRef.current) return
    const mbMap = new mapboxgl.Map({
      container: mapRef.current,
      // attributionControl: false,
      // style: 'mapbox://styles/mapbox/light-v11',
      zoom: zoom,
      center: center
    })
    mapRef.current = mbMap

    mapRef.current.on('load', () => {

      // const zarrSource = {
      //   type: 'raster',
      //   url: `${XARRAY_TILER_ENDPOINT}?${querystring.stringify(
      //     dataset.tilerParams
      //   )}`,
      // }

      // const zarrLayer = {
      //   id: zarr_layer_id,
      //   type: 'raster',
      //   source: zarr_source_id,
      //   metadata: {
      //     layerOrderPosition: 'raster',
      //   },
      // }

      // mapRef.current.addSource(zarr_source_id, zarrSource)
      // mapRef.current.addLayer(zarrLayer)

      // https://github.com/carbonplan/maps/blob/main/src/line.js
    //   <Line
    //   color={theme.rawColors.primary}
    //   source={'https://storage.googleapis.com/risk-maps/vector/land'}
    //   variable={'land'}
    //   width={1}
    // />

    })

    return () => {
      mapRef.current = null
    }
  }, [])

  return (
    <>
      {/* <Minimap projection={equirectangular} translate={translate} scale={scale}>
        <Path
          stroke={theme.colors.primary}
          source={'https://cdn.jsdelivr.net/npm/world-atlas@2/land-50m.json'}
          feature={'land'}
        />
        <Graticule stroke={theme.colors.primary} />
      </Minimap> */}
      <Box  sx={{ height: '200px', 'canvas.mapboxgl-canvas:focus': { outline: 'none', }, }} >
        <div ref={mapRef}style={{ width: '100%', height: '100%' }} ></div>
        {/* <Map id={'demo-map'} zoom={zoom} center={center} >

          <Line
            color={theme.rawColors.primary}
            source={'https://storage.googleapis.com/risk-maps/vector/land'}
            variable={'land'}
            width={1}
          />
          <ZoomResetDemo reference={mapRef} zoom={zoom} center={center} />
        </Map> */}
      </Box>
    </>
  )
}

export default ResetDemo