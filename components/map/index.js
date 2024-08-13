import { useState, useRef } from 'react'
import { useThemeUI, Box } from 'theme-ui'
import mapboxgl from 'mapbox-gl'
import { Map as MapContainer, Raster, Fill, Line, RegionPicker } from '@carbonplan/maps'
import { Dimmer } from '@carbonplan/components'
import RegionControls from './region-controls'
import Ruler from './ruler'
import Overlays from './overlays'
import Search from './search/index'
import Point from './point'
import LineMinZoom from './line-min-zoom'
import FillMinZoom from './fill-min-zoom'

const Map = ({ getters, setters, mobile }) => {
  const container = useRef(null)
  const [map, setMap] = useState(null)
  const [zoom, setZoom] = useState(1)

  const { theme } = useThemeUI()

  const [display, setDisplay] = useState(true)
  const [opacity, setOpacity] = useState(1)
  const [showOceanMask, setShowOceanMask] = useState(true)
  const [showCountriesOutline, setShowCountriesOutline] = useState(false)
  const [showStatesOutline, setShowStatesOutline] = useState(false)
  const [showLakes, setShowLakes] = useState(false)
  const [showLandOutline, setShowLandOutline] = useState(true)

  const [showSearch, setShowSearch] = useState(false)

  const {
    variable,
    band,
    clim,
    colormapName,
    colormap,
    regionData,
    showRegionPicker,
  } = getters

  const {
    setVariable,
    setBand,
    setClim,
    setColormapName,
    setRegionData,
    setShowRegionPicker,
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

  const glyphs = "http://fonts.openmaptiles.org/{fontstack}/{range}.pbf"

  return (
    <Box ref={container} sx={{flexBasis: '100%', 'canvas.mapboxgl-canvas:focus': {outline: 'none', },}} >
      <MapContainer zoom={zoom} center={[-40, 40]} glyphs={glyphs} >
      {showOceanMask && variable != 'slr_3d' && !variable.startsWith('tc') && (
            <Fill
              color={theme.rawColors.background}
              source={'https://storage.googleapis.com/risk-maps/vector_layers/ocean'}
              variable={'ocean'}
            />
          )}

          {variable == 'slr_3d' && (
            <Fill
              color={theme.rawColors.background}
              source={'https://storage.googleapis.com/risk-maps/vector_layers/land'}
              variable={'land'}
            />
          )}

          {showStatesOutline && variable != 'slr_3d' && (
            <Line
              color={theme.rawColors.primary}
              source={'https://storage.googleapis.com/risk-maps/vector_layers/states'}
              variable={'states'}
              width={1}
            />
          )}

          {showCountriesOutline && variable != 'slr_3d' && (
            <Line
              color={theme.rawColors.primary}
              source={'https://storage.googleapis.com/risk-maps/vector_layers/countries'}
              variable={'countries'}
              width={1}
            />
          )}

        {showLakes && variable != 'slr_3d' && (
            <Fill
              color={theme.rawColors.background}
              source={'https://storage.googleapis.com/risk-maps/vector_layers/lakes'}
              variable={'lakes'}
            />
          )}

        {showLakes && variable != 'slr_3d' && (
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
              maxRadius={1500}
            />
          )}

        <LineMinZoom
          id={'lakes-outline'}
          color={theme.rawColors.primary}
          source={'https://storage.googleapis.com/risk-maps/search/lakes'}
          variable={'lakes'}
          minZoom={4}
          width={1.5}
          label={true}
          labelText={'NAME'}
        />

        <FillMinZoom
          id={'lakes-fill'}
          color={theme.rawColors.background}
          source={'https://storage.googleapis.com/risk-maps/search/lakes'}
          variable={'lakes'}
          minZoom={4}
          width={1.5}
          label={true}
          labelText={'NAME'}
        />

        <LineMinZoom
          id={'states'}
          color={theme.rawColors.primary}
          source={'https://storage.googleapis.com/risk-maps/search/states'}
          variable={'states'}
          minZoom={4}
          width={1.5}
          label={true}
          labelText={'NAME'}
        />  

        <Point
          id={'populated-places'}
          color={theme.rawColors.primary}
          source={'https://storage.googleapis.com/risk-maps/search/pop_places'}
          variable={'pop_places'}
          label={true}
          labelText={'NAMEASCII'}
        />

        <Point
          id={'airports'}
          color={theme.rawColors.primary}
          source={'https://storage.googleapis.com/risk-maps/search/airports'}
          variable={'airports'}
          label={true}
          labelText={'NAME'}
        />

          <Raster
            key={variable}
            display={display}
            opacity={opacity}
            source={
              `https://storage.googleapis.com/risk-maps/zarr_layers/${variable}.zarr`
            }
            variable={variable}
            clim={clim}
            colormap={colormap}
            selector={{ band }}
            mode={(variable == 'lethal_heat_3d') ? 'grid' : 'texture'} // 'texture', 'grid', 'dotgrid'
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

          {!mobile && (<Ruler />)}

          <RegionControls showRegionPicker={showRegionPicker} setShowRegionPicker={setShowRegionPicker} />
          <Overlays 
            getters={{showStatesOutline, showCountriesOutline}} 
            setters={{setShowStatesOutline, setShowCountriesOutline}}
          />

          {!mobile && (
            <Search showSearch={showSearch} setShowSearch={setShowSearch} />
          )}

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
