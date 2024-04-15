import { useCallback, useState } from 'react'
import { Box, Text } from 'theme-ui'
import { colormaps, useThemedColormap } from '@carbonplan/colormaps'
import { Badge, Colorbar, Filter, Slider, useScrollbarClass } from '@carbonplan/components'
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

//   pt: ['12px'],
// pb: ['9px'],
// height: '56px',
// pl: [3, 4, 5, 6],
// pr: [3, 5, 5, 6],

  const sx = {
    group: {
      // pt: [0, 4, 4, 4],
      // pb: [5, '22px', '22px', '22px'],
      my: [3],
      pl: [0, 4, 5, 6],
      pr: [0, 5, 5, 6],
      borderStyle: 'solid',
      borderColor: 'muted',
      borderWidth: '0px',
      borderBottomWidth: [0, '1px', '1px', '1px'],
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
    // there is a bug in the regionpicker
    // it does not accept risk / variable changes while it is open
    if(showRegionPicker) {
      setShowRegionPicker(false);
    }

    if(risks.includes(event.target.innerHTML)) {
      let risk = event.target.innerHTML;
      setRisk(risk)
      setRiskDescription(riskDescriptions[risk])
      setValues(riskLayers[risk].values)
      // after changing the risk in the dropdown menu, we also need to
      // make sure that there is a default variable for the map to display
      // https://stackoverflow.com/questions/3298477/get-the-first-key-name-of-a-javascript-object
      let variable = Object.keys(riskLayers[risk].values)[0]
      setVariable(variable)
      setClim([climRanges[variable].min, climRanges[variable].max])
      setColormapName(defaultColormaps[variable])
    }
  })

  const handleVariableChange = useCallback((event) => {
      // there is a bug in the regionpicker
      // it does not accept risk / variable changes while it is open
      if(showRegionPicker) {
        setShowRegionPicker(false);
      }

      let keys = Object.keys(riskLayers[risk].values);
      let label = event.target.innerHTML;
      // https://stackoverflow.com/questions/23013573/swap-key-with-value-in-object
      let variable = Object.fromEntries(Object.entries(riskLayers[risk].labels).map(([k, v]) => [v, k]))[label]
      if(label !='Difference' && keys.includes(variable)) {
        setVariable(variable)
        setClim([climRanges[variable].min, climRanges[variable].max])
        setColormapName(defaultColormaps[variable])
      }
  })

  return (
    <>
      <Box sx={sx.group}>
      {/* <Box sx={{ mt: -4}} className='logo-container'>
             <Box as='h1' variant='styles.h4' className='org-name' sx={{mt: 0, my: 'auto', }}>
              Woodwell Risk viewer
            </Box>
          </Box> 
          <SidebarDivider sx={{ my: 4 }} className='divider-1' />  */}

          <Box sx={{ mt: -3 }} className='risk-theme-container'>
            <Box as='h2' variant='styles.h4' className='risk-title'>
              Risk theme <Info>
                The purpose of this site is to increase public access to climate risk data while showcasing some of the datasets the Risk group uses to communicate climate risk to the communities and external partners it works with.
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
                // colors={defaultRiskColors}
                multiSelect={false}
                onClick={handleRiskChange}
              />
            </Box>
          </Box>
          <SidebarDivider sx={{ my: 4 }} className='divider-2'/>

          <Box className='risk-layer-container' sx={{ mt: 0, mb: 4 }} >
            <Box as='h2' variant='styles.h4' className='risk-layer-title'>
              {riskTitles[risk]} <Info>{riskDescription}</Info>
            </Box>

            <Box className='risk-layers'>
              <Filter
                values={values}
                setValues={setValues}
                colors={riskLayers[risk].colors}
                labels={riskLayers[risk].labels}
                multiSelect={false}
                onClick={handleVariableChange}
            />
            </Box>
            
            <Box sx={{...sx.label, }}>
              <Colorbar
                sx={{ width: '250px', display: 'inline-block', flexShrink: 1, }}
                sxClim={{ fontSize: [1, 1, 1, 2], pt: [1] }}
                width='100%'
                colormap={ (variable == 'lethal_heat') ? useThemedColormap(colormapName, { count: 15 }).slice(1,).reverse() : 
                           (variable.startsWith('tavg')) ? useThemedColormap(colormapName).slice(0,).reverse() :
                           (variable.startsWith('tc')) ? useThemedColormap(colormapName).slice(0,).reverse() : 
                            useThemedColormap(colormapName)}
                label= { defaultLabels[variable] }
                units={ defaultUnits[variable] }
                clim={ [clim[0].toFixed(2), clim[1].toFixed(2)] }
                horizontal
                bottom
                discrete // only applies for lethal_heat layer, does not affect other layers
              />
            </Box>

            {(variable != 'lethal_heat' && !variable.startsWith('tc')) && (<Box sx={sx.label}>Min
              <Slider
                min={climRanges[variable].min}
                max={climRanges[variable].max}
                step={(variable == 'lethal_heat') ? 0.25 : ((variable == 'slr') || (variable.startsWith('drought'))) ? 0.01 : 0.1}
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
                  (variable == 'slr') && (clim[0].toFixed(2) == climRanges[variable].min) ? '<'+clim[0].toFixed(2) : clim[0].toFixed(2)
                }
              </Badge>
            </Box>
            )}

              <Box sx={{...sx.label}}>Max 
                <Slider
                  min={climRanges[variable].min}
                  max={climRanges[variable].max}
                  step={(variable == 'lethal_heat') ? 0.25 : ((variable == 'slr') || (variable.startsWith('drought'))) ? 0.01 : 0.1}
                  sx={{ width: '150px', display: 'inline-block', ml: 2,}}
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
          </Box>
      </Box>
    </>
  )
}

export default Layers
