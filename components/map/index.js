import { useState, useRef } from 'react'
import { useThemeUI, Box } from 'theme-ui'
import mapboxgl from 'mapbox-gl'
import { Map as MapContainer, Raster, Fill, Line, RegionPicker } from '@carbonplan/maps'
import { Dimmer } from '@carbonplan/components'
import RegionControls from './region-controls'
import Ruler from './ruler'
import Overlays from './overlays'

mapboxgl.accessToken = ''
const bucket = 'https://carbonplan-maps.s3.us-west-2.amazonaws.com/'

const Map = ({ getters, setters, mobile }) => {
  const container = useRef(null)
  const [map, setMap] = useState(null)
  const { theme } = useThemeUI()

  const {
    display, 
    opacity,
    risk,
    variable,
    clim,
    colormapName,
    colormap,
    regionData,
    showRegionPicker,
    showOceanMask,
    showCountriesOutline,
    showStatesOutline,
    showLandOutline,
    showLakes,
  } = getters

  const {
    setDisplay,
    setOpacity,
    setRisk,
    setVariable,
    setClim,
    setColormapName,
    setRegionData,
    setShowRegionPicker,
    setShowOceanMask,
    setShowCountriesOutline,
    setShowStatesOutline,
    setShowLandOutline,
    setShowLakes,
  } = setters

  const sx = {
    label: {
      fontFamily: 'mono',
      letterSpacing: 'mono',
      textTransform: 'uppercase',
      fontSize: [1, 1, 1, 2],
      mt: [3],
    },
  }

  return (
    <Box ref={container} sx={{flexBasis: '100%', 'canvas.mapboxgl-canvas:focus': {outline: 'none', },}} >
      <MapContainer zoom={1} maxZoom={8} center={[-40, 40]} >
      {showOceanMask && variable != 'slr' && !variable.startsWith('tc') && (
            <Fill
              color={theme.rawColors.background}
              // color={ '#000058' }
              source={'https://storage.googleapis.com/risk-maps/vector_layers/ocean'}
              variable={'ocean'}
            />
          )}

          {variable == 'slr' && (
            <Fill
              color={theme.rawColors.background}
              source={'https://storage.googleapis.com/risk-maps/vector_layers/land'}
              variable={'land'}
            />
          )}

          {showStatesOutline && variable != 'slr' && (
            <Line
              color={theme.rawColors.primary}
              source={'https://storage.googleapis.com/risk-maps/vector_layers/states'}
              variable={'states'}
              width={1}
            />
          )}

          {showCountriesOutline && variable != 'slr' && (
            <Line
              color={theme.rawColors.primary}
              source={'https://storage.googleapis.com/risk-maps/vector_layers/countries'}
              variable={'countries'}
              width={1}
            />
          )}

        {showLakes && variable != 'slr' && (
            <Fill
              color={theme.rawColors.background}
              source={'https://storage.googleapis.com/risk-maps/vector_layers/lakes'}
              variable={'lakes'}
            />
          )}

        {showLakes && variable != 'slr' && (
            <Line
              color={theme.rawColors.primary}
              source={'https://storage.googleapis.com/risk-maps/vector_layers/lakes'}
              variable={'lakes'}
              width={1}
            />
          )}

          {showLandOutline && (
            <Line
              color={theme.rawColors.primary}
              source={'https://storage.googleapis.com/risk-maps/vector_layers/land'}
              variable={'land'}
              width={1}
            />
          )}

          {showRegionPicker && (
            <RegionPicker
              color={theme.colors.primary}
              // backgroundColor="transparent"
              backgroundColor={theme.colors.background}
              fontFamily={theme.fonts.mono}
              fontSize={'14px'}
              minRadius={1}
              maxRadius={800}
            />
          )}

          <Raster
            key={variable}
            display={display}
            opacity={opacity}
            source={
              `https://storage.googleapis.com/risk-maps/zarr_layers/${variable}.zarr`
            }
            // source = {variable != 'prec' ? `https://storage.googleapis.com/carbonplan-maps/v2/demo/2d/${variable}` : `https://storage.googleapis.com/carbonplan-share/maps-demo/2d/${variable}-regrid` }
            variable={variable}
            clim={clim}
            colormap={colormap}
            // colormap={(variable == 'lethal_heat') ? colormap : colormap}
            // mode={'texture'}
            // there is an issue between zoom levels 5 and 6, https://github.com/carbonplan/maps/issues/19
            // though it could also be coming from ndpyramid: https://github.com/carbonplan/ndpyramid/blob/main/ndpyramid/reproject.py 
            // mode={(variable == 'lethal_heat') || (variable.startsWith('wdd')) ? 'grid' : 'texture'} // 'texture', 'grid', 'dotgrid'
            mode={(variable == 'lethal_heat') ? 'grid' : 'texture'} // 'texture', 'grid', 'dotgrid'
            regionOptions={{ setData: setRegionData }}
          />

          {(variable.startsWith('tc')) && (
            <Line
            color={theme.rawColors.secondary}
            source={'https://storage.googleapis.com/risk-maps/vector_layers/tc_boundaries'}
            variable={'tc_boundaries'}
            width={1}
          />
          )}

          <Ruler />
          <RegionControls showRegionPicker={showRegionPicker} setShowRegionPicker={setShowRegionPicker} />
          <Overlays getters={getters} setters={setters} />

      </MapContainer>

      {!mobile && (<Dimmer 
        sx={{
          display: ['initial', 'initial', 'initial', 'initial'],
          position: 'absolute',
          color: 'primary',
          right: [70],
          bottom: [20, 20, 20, 20],
        }}
      />
      )}

    </Box>
  )
}

export default Map
