import { useState, useRef } from 'react'
import { useThemeUI, Box } from 'theme-ui'
import { useThemedColormap } from '@carbonplan/colormaps'
import { Map as MapContainer, Raster, Fill, Line, RegionPicker } from '@carbonplan/maps'
import { Dimmer } from '@carbonplan/components'
import Ruler from './ruler'
import Search from './search/index'
import Point from './point'
import LineMinZoom from './line-min-zoom'
import FillMinZoom from './fill-min-zoom'
import Router from './router'


import useStore from '../store/index'

const Map = ({ mobile }) => {
  const { theme } = useThemeUI()
  const container = useRef(null)
  const [map, setMap] = useState(null)
  const zoom = useStore((state) => state.zoom)
  const center = useStore((state) => state.center)
  const glyphs = useStore((state) => state.glyphs)

  const variable = useStore((state) => state.variable)
  const band = useStore((state) => state.band)
  const clim = useStore((state) => state.clim)()
  const colormapName = useStore((state) => state.colormapName)()
  const colormap = (variable == 'lethal_heat_3d') ? useThemedColormap(colormapName, { count: 8 }).slice(0,).reverse() :
    (variable.startsWith('tavg')) ? useThemedColormap(colormapName).slice(0,).reverse() :
      (variable.startsWith('tc')) ? useThemedColormap(colormapName).slice(0,).reverse() :
        (variable == 'slr_3d') ? useThemedColormap(colormapName).slice(0,).reverse() :
          useThemedColormap(colormapName)

  const opacity = useStore((state) => state.opacity)
  const display = useStore((state) => state.display)
  const setRegionData = useStore((state) => state.setRegionData)

  const showRegionPicker = useStore((state) => state.showRegionPicker)
  const showLandOutline = useStore((state) => state.showLandOutline)
  const showOceanMask = useStore((state) => state.showOceanMask)
  const showLakes = useStore((state) => state.showLakes)
  const showCountriesOutline = useStore((state) => state.showCountriesOutline)
  const showStatesOutline = useStore((state) => state.showStatesOutline)

  const [lookup, setLookup] = useState(null)
  const [showSearch, setShowSearch] = useState(false)
  const [showFilter, setShowFilter] = useState(true)
  const [showTemp, setShowTemp] = useState(false)

  return (
    <Box ref={container} sx={{ flexBasis: '100%', 'canvas.mapboxgl-canvas:focus': { outline: 'none', }, }} >
      <MapContainer zoom={zoom} center={center} glyphs={glyphs} >
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

        <LineMinZoom
          id={'countries'}
          color={theme.rawColors.primary}
          source={'https://storage.googleapis.com/risk-maps/search/countries'}
          variable={'countries'}
          minZoom={2}
          width={1.5}
          label={true}
          labelText={'name'}
        />

        <LineMinZoom
          id={'regions'}
          color={theme.rawColors.primary}
          source={'https://storage.googleapis.com/risk-maps/search/regions'}
          variable={'regions'}
          minZoom={2}
          width={1.5}
          label={true}
          labelText={'name'}
        />

        <LineMinZoom
          id={'states'}
          color={theme.rawColors.primary}
          source={'https://storage.googleapis.com/risk-maps/search/states'}
          variable={'states'}
          minZoom={4}
          width={1.5}
          label={true}
          labelText={'name'}
        />

                {/* <LineMinZoom
          id={'counties'}
          color={theme.rawColors.primary}
          source={'https://storage.googleapis.com/risk-maps/search/counties'}
          variable={'counties'}
          minZoom={6}
          width={1.5}
          label={true}
          labelText={'name'}
        /> */}

        {/* <Box sx={{
            width: '300px',
            height: '300px',
            border: '2px solid red',
            position: 'absolute', 
            top: 40, 
            right: 5,
            animationDelay: '0s',
            animationDuration: '0.5s',
            animationIterationCount: 4,
            animationName: fade.toString(),
            // animationTimingFunction: 'linear',
            animationFillMode: 'forwards',
        }}>
        </Box> */}

        {/* {showTemp && (
          <TempLayer
            id={'temp-layer'}
            variable={'states'}
            color={'red'}
            width={5}
            opacity={0}
          />
        )} */}

        <Point
          id={'cities'}
          color={theme.rawColors.primary}
          source={'https://storage.googleapis.com/risk-maps/search/cities'}
          variable={'cities'}
          label={true}
          labelText={'name'}
          minZoom={6}
        />

        {showFilter && lookup == 'counties' && (
          <FilterLayer
            key={place}
            id={'counties'}
            source={filterSource + lookup}
            variable={lookup}
            minZoom={4}
            opacity={0}
            color={theme.rawColors.primary}
            label={true}
            labelText={'name'}
            filter={null}
            type={'line'}
            place={place}
          />
        )}

        {showRegionPicker && (
          <RegionPicker
            color={theme.colors.primary}
            backgroundColor={theme.colors.background}
            fontFamily={theme.fonts.mono}
            fontSize={'14px'}
            minRadius={1}
            maxRadius={1500}
          />
        )}

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

        {!mobile && (
          <Search showSearch={showSearch} setShowSearch={setShowSearch} />
        )}

        <Router />

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
