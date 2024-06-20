import { useCallback, useEffect, useState } from 'react'
import { Box, Text } from 'theme-ui'
import { colormaps, useThemedColormap } from '@carbonplan/colormaps'
import { Badge, Colorbar, Filter, Link, Tag, Slider } from '@carbonplan/components'
import { SidebarDivider } from '@carbonplan/layouts'

import Info from './info'
import {
  risks, riskTitles, defaultRiskColors, riskDescriptions,
    riskLayers, climRanges, defaultColormaps, defaultLabels, defaultUnits,
} from './sidebar-options'

const Layers = ({ getters, setters }) => {
  const {
    display, 
    opacity,
    risk,
    variable,
    band,
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
    setBand,
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
    group: {
      // pt: [0, 4, 4, 4],
      // pb: [5, '22px', '22px', '22px'],
      my: [3],
      pl: [0, 4, 5, 6],
      pr: [0, 5, 5, 6],
      // borderStyle: 'solid',
      // borderColor: 'muted',
      // borderWidth: '0px',
      // borderBottomWidth: [0, '1px', '1px', '1px'],
      width: '100%',
    },
    label: {
      fontFamily: 'mono',
      letterSpacing: 'mono',
      textTransform: 'uppercase',
      fontSize: [1, 1, 1, 2],
      mt: [3],
    },
  }

  const [riskThemes, setRiskThemes] = useState({
    'Drought': true, 
    'Hot Days': false, 
    'Lethal Heat': false,
    'Precipitation': false, 
    'Sea Level Rise': false,
    'Temperature': false,
    'Tropical Cyclones': false,
    'Warm Nights': false,
    'Wildfires': false,
  })
  const [riskDescription, setRiskDescription] = useState(riskDescriptions[risk])
  const [values, setValues] = useState(riskLayers[risk].values)

  const handleRiskChange = useCallback((event) => {

    if(risks.includes(event.target.innerHTML)) {
      let risk = event.target.innerHTML;
      let values = riskLayers[risk].values
      let variable = riskLayers[risk].variable
      let band
      if (variable != 'lethal_heat_3d') {
        band = parseFloat(Object.keys(values)[0])
      } else {
        band = values[values.length - 1]
      }

      setRisk(risk)
      setRiskDescription(riskDescriptions[risk])
      setValues(values)
      setVariable(variable)
      setBand(band)
      setClim([climRanges[variable].min, climRanges[variable].max])
      setColormapName(defaultColormaps[variable])
    }
  })

  const handleBandChange = useCallback((event) => {
    if (variable != 'lethal_heat_3d') {
      let keys = Object.keys(riskLayers[risk].values);
      let label = event.target.innerHTML;
      // https://stackoverflow.com/questions/23013573/swap-key-with-value-in-object
      let band = Object.fromEntries(Object.entries(riskLayers[risk].labels).map(([k, v]) => [v, k]))[label]

      if(keys.includes(band)) {
        setBand(parseFloat(band));
      }
    }
  })

  return (
    <>
      <Box sx={sx.group}>
          <Box sx={{ mt: -3}} className='risk-theme-container'>
            <Box as='h2' variant='styles.h4' className='risk-title'>
              Climate risk <Info>
                A number of layers on this map were created by aggregating climate model output not by year, but by warming level. 
                To learn more about this approach, please see our <Link href="https://woodwellrisk.github.io/tools_warming-levels/#evaluating-warming-level-calculations" target="_blank">methodology website</Link>.
              </Info>
            </Box>
            <Box className='risk-theme-layers'>
              <Filter
                sx={{
                  mr: [3],
                  mb: [2],
                }}
                values={riskThemes}
                setValues={setRiskThemes}
                colors={defaultRiskColors}
                multiSelect={false}
                onClick={handleRiskChange}
              />
            </Box>
          </Box>
        </Box>
        <SidebarDivider sx={{ width: '100%',  my: 4 }} />

        <Box sx={sx.group}>
          <Box className='risk-layer-container' sx={{ mt: 0, mb: 4 }} >
            <Box as='h2' variant='styles.h4' className='risk-layer-title'>
              {riskTitles[risk]} <Info>{riskDescription}</Info>
            </Box>

            <Box className='risk-layers'>
              {variable != 'lethal_heat_3d' && (
                <Filter
                  values={values}
                  setValues={setValues}
                  colors={riskLayers[risk].colors}
                  labels={riskLayers[risk].labels}
                  multiSelect={false}
                  onClick={handleBandChange}
                />
              )}
              {variable == 'lethal_heat_3d' && (
                                <Tag color='red' value={true} sx={
                                  {mr:[2], mb:[2], 
                                  borderColor:'red',
                                  width: 'max-content',
                                }}>
                                  Warming level of emergence
                                </Tag>
              )}
            </Box>
            
            <Box sx={{...sx.label, }}>
              <Colorbar
                sx={{ width: '250px', display: 'inline-block', flexShrink: 1, }}
                sxClim={{ fontSize: [1, 1, 1, 2], pt: [1] }}
                width='100%'
                colormap={ (variable == 'lethal_heat_3d') ? useThemedColormap(colormapName, { count: 8 }).slice(1,).reverse() : 
                           (variable.startsWith('tavg')) ? useThemedColormap(colormapName).slice(0,).reverse() :
                           (variable.startsWith('tc')) ? useThemedColormap(colormapName).slice(0,).reverse() : 
                           (variable == 'slr_3d') ? useThemedColormap(colormapName).slice(0,).reverse() : 
                            useThemedColormap(colormapName)}
                label= { defaultLabels[variable] }
                units={ defaultUnits[variable] }
                clim={ [clim[0].toFixed(2), clim[1].toFixed(2)] }
                horizontal
                bottom
                discrete // only applies for lethal_heat layer, does not affect other layers
              />
            </Box>

            {(variable != 'lethal_heat_3d' && !variable.startsWith('tc')) && (
              <Box sx={sx.label}>Min
                <Slider
                  min={climRanges[variable].min}
                  max={climRanges[variable].max}
                  step={(variable == 'lethal_heat_3d') ? 0.5 : ((variable == 'slr_3d') || (variable.startsWith('drought'))) ? 0.01 : 0.1}
                  sx={{ width: '150px', display: 'inline-block', ml: 2,}}
                  value={clim[0]}
                  onChange={(e) =>
                    setClim((prev) => [parseFloat(e.target.value), prev[1]])
                  }
                />
                <Badge
                  sx={{
                    bg: 'primary',
                    color: 'background',
                    display: 'inline-block',
                    position: 'relative',
                    left: [3],
                  }}
                >
                  {
                    (variable == 'slr_3d') && (clim[0].toFixed(2) == climRanges[variable].min) ? '< '+clim[0].toFixed(2) : clim[0].toFixed(2)
                  }
                </Badge>
              </Box>
            )}

              {(variable != 'lethal_heat_3d') && (
                  <Box sx={{...sx.label}}>Max 
                  <Slider
                    min={climRanges[variable].min}
                    max={climRanges[variable].max}
                    step={(variable == 'lethal_heat_3d') ? 0.5 : ((variable == 'slr_3d') || (variable.startsWith('drought'))) ? 0.01 : 0.1}
                    sx={{ width: '130px', display: 'inline-block', ml: 2,}}
                    value={clim[1]}
                    onChange={(e) => {
                      setClim((prev) => [prev[0], parseFloat(e.target.value)])
                    }}
                  />
                  <Badge
                    sx={{
                      bg: 'primary',
                      color: 'background',
                      display: 'inline-block',
                      position: 'relative',
                      left: [3],
                    }}
                  >
                    {
                      ((risk == 'Drought' || risk == 'Sea Level Rise' || risk == 'Precipitation' || risk == 'Wildfires' || risk == "Tropical Cyclones") && 
                      (clim[1].toFixed(2) == climRanges[variable].max)) ? '>'+clim[1].toFixed(2) : clim[1].toFixed(2)
                    }
                  </Badge>
                </Box>
              )}

            {variable == 'lethal_heat_3d' && (
              <Box sx={{...sx.label}}> 
                  <Slider
                    min={1.0}
                    max={4.0}
                    step={0.5}
                    sx={{ width: '175px', display: 'inline-block' }}
                    value={band}
                    onChange={(e) => setBand(parseFloat(e.target.value))}
                  />
                  <Badge
                    sx={{
                      bg: 'primary',
                      color: 'background',
                      display: 'inline-block',
                      position: 'relative',
                      left: [3],
                      top: [1],
                    }}
                  >
                    { band.toFixed(1) }
                  </Badge>
                </Box>
              )}
          </Box>
      </Box>
    </>
  )
}

export default Layers
