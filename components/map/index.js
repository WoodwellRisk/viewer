import { useState, useRef } from 'react'
import { useThemeUI, Box } from 'theme-ui'
import { useThemedColormap } from '@carbonplan/colormaps'
import { Map as MapContainer, Raster, Fill, Line, RegionPicker } from '@carbonplan/maps'
import { Dimmer } from '@carbonplan/components'

import Point from './point'
import FilterLayer from './filter-layer'
import Search from './search/index'
import ZoomReset from './zoom-reset'
import Ruler from './ruler'
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
  const showRegionsOutline = useStore((state) => state.showRegionsOutline)
  const showStatesOutline = useStore((state) => state.showStatesOutline)
  const showStatesZoom = useStore((state) => state.showStatesZoom)

  const lookup = useStore((state) => state.lookup)
  const place = useStore((state) => state.place)
  const showSearch = useStore((state) => state.showSearch)
  const setShowSearch = useStore((state) => state.setShowSearch)
  const showFilter = useStore((state) => state.showFilter)

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
          <>

            <Fill
              color={theme.rawColors.background}
              source={'https://storage.googleapis.com/risk-maps/vector_layers/land'}
              variable={'land'}
              zIndex={-1}
            />

            <Point
              id={'cities'}
              color={theme.rawColors.primary}
              source={'https://storage.googleapis.com/risk-maps/search/cities'}
              variable={'cities'}
              label={true}
              labelText={'name'}
              minZoom={6}
            />
          </>
        )}

        {variable != 'slr_3d' && showRegionsOutline && (
          <Line
            id={'regions'}
            color={theme.rawColors.primary}
            source={'https://storage.googleapis.com/risk-maps/search/regions'}
            variable={'regions'}
            width={1}
          />
        )}

        {variable != 'slr_3d' && showCountriesOutline && (
          <Line
            id={'countries'}
            color={theme.rawColors.primary}
            // source={'https://storage.googleapis.com/risk-maps/vector_layers/countries'}
            source={'https://storage.googleapis.com/risk-maps/search/countries'}
            variable={'countries'}
            width={showStatesOutline && zoom > showStatesZoom ? 1.75 : 1}
          />
        )}

        {variable != 'slr_3d' && showStatesOutline && zoom > showStatesZoom && (
          <Line
            id={'states'}
            // color={theme.rawColors.primary}
            color={'grey'}
            // source={'https://storage.googleapis.com/risk-maps/vector_layers/states'}
            source={'https://storage.googleapis.com/risk-maps/search/states'}
            variable={'states'}
            width={zoom < 4 ? 0.5 : 1}
          />
        )}

        {showLakes && variable != 'slr_3d' && (
          <>
            <Fill
              color={theme.rawColors.background}
              source={'https://storage.googleapis.com/risk-maps/vector_layers/lakes'}
              variable={'lakes'}
            />
            <Line
              color={theme.rawColors.primary}
              source={'https://storage.googleapis.com/risk-maps/vector_layers/lakes'}
              variable={'lakes'}
              width={1}
            />
          </>
        )}

        {showLandOutline && (
          <Line
            color={theme.rawColors.primary}
            source={'https://storage.googleapis.com/risk-maps/vector_layers/land'}
            variable={'land'}
            width={1}
          />
        )}

        {variable != 'slr_3d' && (
          <Point
            id={'cities'}
            color={theme.rawColors.primary}
            source={'https://storage.googleapis.com/risk-maps/search/cities'}
            variable={'cities'}
            label={true}
            labelText={'name'}
            minZoom={6}
          />
        )}

        {/* {place!= null && showFilter && showSearch && (lookup != null && lookup != 'cities') && (
          <FilterLayer
            key={`filter-layer-${place})}`}
            id={`filter-layer-${Date.now()}`}
            source={'https://storage.googleapis.com/risk-maps/search/' + lookup}
            opacity={0.0}
            // color={theme.rawColors.primary}
            color={'#860F4F'}
            type={'line'}
          />
        )} */}

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
          source={`https://storage.googleapis.com/risk-maps/zarr_layers/${variable}.zarr`}
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

        {!mobile && (<ZoomReset />)}

        {/* {!mobile && (
          <Search showSearch={showSearch} setShowSearch={setShowSearch} />
        )} */}

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