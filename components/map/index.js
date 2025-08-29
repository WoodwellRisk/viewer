import { useState, useCallback, useRef } from 'react'
import { useThemeUI, Box } from 'theme-ui'
import { useThemedColormap } from '@carbonplan/colormaps'
import { Map as MapContainer, Raster, Fill, Line, RegionPicker } from '@carbonplan/maps'
import { Dimmer } from '@carbonplan/components'

import Loading from '../view/loading'
import useCustomColormap from '../store/use-custom-colormap'
import Point from './point'
import JustAccessLayer from './just-access-layer'
import JustAccessPDF from './just-access-pdf'
import ZoomReset from './zoom-reset'
import Ruler from './ruler'
import Router from './router'
import LayerOrder from './layer-order'
import Search from './search/index'
import Spinner from './search/spinner'
import FilterLayer from './filter-layer'

import useStore from '../store/index'

const Map = ({ mobile }) => {
  const { theme } = useThemeUI()
  const container = useRef(null)
  const [map, setMap] = useState(null)
  const zoom = useStore((state) => state.zoom)
  const center = useStore((state) => state.center)
  const glyphs = useStore((state) => state.glyphs)

  const variable = useStore((state) => state.variable)
  const crop = useStore((state) => state.crop)
  const band = useStore((state) => state.band)
  const clim = useStore((state) => state.clim)()
  const colormapName = useStore((state) => state.colormapName)()
  const colormap = (variable == 'lethal_heat') ? useThemedColormap(colormapName, { count: 8 }).slice(0,).reverse() :
    (variable.startsWith('cdd') || variable.startsWith('hdd')) ? useThemedColormap(colormapName).slice(0,).reverse().slice(10, -10) :
      (variable.startsWith('tavg')) ? useCustomColormap(colormapName) :
        // (variable.startsWith('precip')) ? useCustomColormap(colormapName) :
        (variable.startsWith('tc')) ? useThemedColormap(colormapName).slice(0,).reverse() :
          (variable == 'slr') ? useThemedColormap(colormapName).slice(0,).reverse() :
            variable.startsWith('cf') ? useCustomColormap(colormapName) :
              useThemedColormap(colormapName)

  const opacity = useStore((state) => state.opacity)
  const display = useStore((state) => state.display)
  const setRegionData = useStore((state) => state.setRegionData)
  const setRegionDataLoading = useStore((state) => state.setRegionDataLoading)

  const showRegionPicker = useStore((state) => state.showRegionPicker)
  const showLandOutline = useStore((state) => state.showLandOutline)
  const showOceanMask = useStore((state) => state.showOceanMask)
  const showJustAccess = useStore((state) => state.showJustAccess)
  const showReport = useStore((state) => state.showReport)
  const showLakes = useStore((state) => state.showLakes)
  const showCountriesOutline = useStore((state) => state.showCountriesOutline)
  const setShowCountriesOutline = useStore((state) => state.setShowCountriesOutline)
  const showRegionsOutline = useStore((state) => state.showRegionsOutline)
  const showStatesOutline = useStore((state) => state.showStatesOutline)
  const showStatesZoom = useStore((state) => state.showStatesZoom)

  const lookup = useStore((state) => state.lookup)
  const place = useStore((state) => state.place)
  const showSearch = useStore((state) => state.showSearch)
  const setShowSearch = useStore((state) => state.setShowSearch)
  const showSpinner = useStore((state) => state.showSpinner)
  const showFilter = useStore((state) => state.showFilter)

  // this callback was modified from its source: https://github.com/carbonplan/oae-web/blob/3eff3fb99a24a024f6f9a8278add9233a31e853b/components/map.js#L93
  const handleRegionData = useCallback((data) => {
    // console.log(data)
    if (data.value == null) {
      setRegionDataLoading(true)
    } else if (data.value) {
      setRegionData(data.value)
      setRegionDataLoading(false)
    }
  },
    [setRegionData, setRegionDataLoading]
  )

  return (
    <Box ref={container} sx={{ display: 'flex', flexBasis: '100%', justifyContent: 'center', 'canvas.mapboxgl-canvas:focus': { outline: 'none', }, }} >

      <MapContainer zoom={zoom} maxZoom={24} center={center} glyphs={glyphs} >
        {variable != 'slr' && !variable.startsWith('tc') && (
          <>
            <Fill
              id={'ocean-fill'}
              color={theme.rawColors.background}
              source={'https://storage.googleapis.com/risk-maps/vector/ocean'}
              variable={'ocean'}
              zIndex={-1}
            />

            {/* <Point
              id={'cities'}
              color={theme.rawColors.primary}
              source={'https://storage.googleapis.com/risk-maps/vector/cities'}
              variable={'cities'}
              label={true}
              labelText={'name'}
              minZoom={6}
            /> */}
          </>
        )}

        {variable == 'slr' && (
          <>
            <Fill
              id={'land-fill'}
              color={theme.rawColors.background}
              source={'https://storage.googleapis.com/risk-maps/vector/land'}
              variable={'land'}
              zIndex={-1}
            />
          </>
        )}

        <Line
          id={'ocean'}
          color={theme.rawColors.primary}
          source={'https://storage.googleapis.com/risk-maps/vector/ocean'}
          variable={'ocean'}
          width={1}
        />

        <Fill
          id={'lakes-fill'}
          color={theme.rawColors.background}
          source={'https://storage.googleapis.com/risk-maps/vector/largest_lakes'}
          variable={'largest_lakes'}
        />

        <Line
          id={'lakes'}
          color={theme.rawColors.primary}
          source={'https://storage.googleapis.com/risk-maps/vector/largest_lakes'}
          variable={'largest_lakes'}
          width={1}
        />

        {showRegionsOutline && (
          <Line
            id={'regions'}
            color={theme.rawColors.primary}
            source={'https://storage.googleapis.com/risk-maps/vector/regions'}
            variable={'regions'}
            width={1}
          />
        )}

        {showCountriesOutline && (
          <Line
            id={'countries'}
            color={theme.rawColors.primary}
            source={'https://storage.googleapis.com/risk-maps/vector/countries'}
            variable={'countries'}
            width={showStatesOutline && zoom > showStatesZoom ? 1.75 : 1}
          />
        )}

        {showStatesOutline && zoom > showStatesZoom && (
          <Line
            id={'states'}
            // color={theme.rawColors.primary}
            color={'grey'}
            source={'https://storage.googleapis.com/risk-maps/vector/states'}
            variable={'states'}
            width={zoom < 4 ? 0.5 : 1}
          />
        )}

        {showLakes && (
          <>
            <Fill
              id={'all-lakes-fill'}
              color={theme.rawColors.background}
              source={'https://storage.googleapis.com/risk-maps/vector/lakes'}
              variable={'lakes'}
              width={1}
            />

            <Line
              id={'all-lakes'}
              color={theme.rawColors.primary}
              source={'https://storage.googleapis.com/risk-maps/vector/lakes'}
              variable={'lakes'}
              width={1}
            />
          </>
        )}

        {(variable.startsWith('tc')) && (
          <Line
            id={'tc-boundaries'}
            color={theme.rawColors.secondary}
            source={'https://storage.googleapis.com/risk-maps/vector/tc_boundaries'}
            variable={'tc_boundaries'}
            width={1}
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

        {/* 
          they key={} in the Line and Fill components forces the components to re-render. 
          so the variable prop controls whether any crop layer is shown and the change in the 
          crop prop's state controls the actual re-render between crop layers.
        */}
        {/* {(variable.startsWith('cf') && crop != "") && (
          <>
            <Fill
              key={`${crop}_mask`}
              source={crop == 'soy' ? `https://storage.googleapis.com/risk-maps/vector/${crop}bean_mask` : `https://storage.googleapis.com/risk-maps/vector/${crop}_mask`}
              variable={crop == 'soy' ? `${crop}bean_mask` : `${crop}_mask`}
              color={theme.rawColors.secondary}
              opacity={0.5}
            />

            <Line
              key={`${crop}`}
              source={crop == 'soy' ? `https://storage.googleapis.com/risk-maps/vector/${crop}bean` : `https://storage.googleapis.com/risk-maps/vector/${crop}`}
              variable={crop == 'soy' ? `${crop}bean` : `${crop}`}
              color={'black'}
              width={1}
            />
          </>
        )} */}

        <Raster
          key={variable}
          display={display}
          opacity={opacity}
          source={`https://storage.googleapis.com/risk-maps/zarr/${variable}.zarr`}
          variable={variable}
          clim={clim}
          colormap={colormap}
          selector={variable.startsWith('cf') ? { crop, band } : { band }}
          mode={(variable == 'lethal_heat') ? 'grid' : 'texture'} // 'texture', 'grid', 'dotgrid'
          regionOptions={{ setData: handleRegionData, selector: {} }}
        />

        {showSpinner && (
          <Spinner />
        )}

        {/* 
        Right now, when a variable is re-rendered, the land outline layer get redrawn.
        This means that if the filter layer is active, it will be drawn over by the land outline.
        There might be a way to make sure that when the land outline layer gets redrawn, the filter 
        layer (if active) is always on top. This might mean writing custom Line and Fill components.
        https://docs.mapbox.com/mapbox-gl-js/api/map/#map#movelayer 
      */}
        {place != null && lookup != null && showFilter && showSearch && (
          <FilterLayer
            key={`filter-layer-${place})}`}
            id={`filter-layer-${Date.now()}`}
            source={'https://storage.googleapis.com/risk-maps/vector/' + lookup}
            // source={`https://storage.googleapis.com/risk-maps/vector/${lookup}.geojson`}
            opacity={0.0}
            // color={theme.rawColors.primary}
            color={'#860F4F'}
            type={lookup == 'cities' ? 'circle' : 'line'}
          />
        )}

        {!mobile && showJustAccess && (
          <JustAccessLayer theme={theme} />
        )}

        <Ruler mobile={mobile} />

        <ZoomReset mobile={mobile} />

        {!mobile && (
          <Search showSearch={showSearch} setShowSearch={setShowSearch} />
        )}

        {showReport && ( <JustAccessPDF /> )}

        <LayerOrder />

        <Router />


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

      <Loading />

      </MapContainer>
    </Box>
  )
}

export default Map