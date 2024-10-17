import { useCallback, useEffect } from 'react'
import { Box } from 'theme-ui'
import { useThemedColormap } from '@carbonplan/colormaps'
import { Badge, Colorbar, Filter, Link, Tag, Slider } from '@carbonplan/components'
import { SidebarDivider } from '@carbonplan/layouts'

import Info from './info'
import useStore from '../store/index'

const Layers = () => {
  const variables = useStore((state) => state.variables)
  const variable = useStore((state) => state.variable)
  const setVariable = useStore((state) => state.setVariable)
  const band = useStore((state) => state.band)
  const setBand = useStore((state) => state.setBand)
  const clim = useStore((state) => state.clim)()
  // const setClim = useStore((state) => state.setClim)
  // const climRanges = useStore((state) => state.climRanges)
  const colormapName = useStore((state) => state.colormapName)()
  const colormap = (variable == 'lethal_heat_3d') ? useThemedColormap(colormapName, { count: 8 }).slice(0,).reverse() :
    (variable.startsWith('tavg')) ? useThemedColormap(colormapName).slice(0,).reverse() :
      (variable.startsWith('tc')) ? useThemedColormap(colormapName).slice(0,).reverse() :
        (variable == 'slr_3d') ? useThemedColormap(colormapName).slice(0,).reverse() :
          useThemedColormap(colormapName)

  // state variables for risk themes
  const riskTitle = useStore((state) => state.riskTitle)()
  const riskThemes = useStore((state) => state.riskThemes)
  const setRiskThemes = useStore((state) => state.setRiskThemes)
  const riskThemeLabels = useStore((state) => state.riskThemeLabels)
  const riskThemeLookup = useStore((state) => state.riskThemeLookup)
  const riskThemeColors = useStore((state) => state.riskThemeColors)

  // state variables for specific risks
  const riskDescription = useStore((state) => state.riskDescription)()
  const riskLayers = useStore((state) => state.riskLayers)
  const riskBands = useStore((state) => state.riskBands)
  const setRiskBands = useStore((state) => state.setRiskBands)
  const riskColors = useStore((state) => state.riskColors)()
  const riskLabels = useStore((state) => state.riskLabels)()
  const colormapLabel = useStore((state) => state.colormapLabel)()
  const colormapUnits = useStore((state) => state.colormapUnits)()

  const sx = {
    group: {
      my: [3],
      pl: [0, 4, 5, 6],
      pr: [0, 5, 5, 6],
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

  const handleRiskChange = useCallback((event) => {
    let risk = riskThemeLookup[event.target.innerHTML];
    if (variables.includes(risk)) {
      let bands = riskLayers[risk].bands
      let band
      if (risk != 'lethal_heat_3d') {
        band = parseFloat(Object.keys(bands)[0])
      } else {
        band = bands[bands.length - 1]
      }

      setVariable(risk)
      setRiskBands(bands)
      setBand(band)
    }
  })

  const handleBandChange = useCallback((event) => {
    if (variable != 'lethal_heat_3d') {
      let keys = Object.keys(riskLayers[variable].bands);
      let label = event.target.innerHTML;
      // https://stackoverflow.com/questions/23013573/swap-key-with-value-in-object
      let band = Object.fromEntries(Object.entries(riskLayers[variable].labels).map(([k, v]) => [v, k]))[label]
      if (keys.includes(band)) {
        setBand(parseFloat(band));
      }
    }
  })

  return (
    <>
      <Box sx={sx.group}>
        <Box sx={{ mt: -3 }} className='risk-theme-container'>
          <Box as='h2' variant='styles.h4' className='risk-title'>
            Climate risk <Info>
              Several layers on this map were created by aggregating climate model output not by year, but by warming level.
              To learn more about this approach, please see our <Link href="https://woodwellrisk.github.io/tools/warming-levels/#evaluating-warming-level-calculations" target="_blank">methodology website</Link>.
            </Info>
          </Box>
          <Box className='risk-theme-layers'>
            <Filter
              sx={{
                mr: [3],
                mb: [2],
              }}
              values={riskThemes}
              labels={riskThemeLabels}
              setValues={setRiskThemes}
              colors={riskThemeColors}
              multiSelect={false}
              onClick={handleRiskChange}
            />
          </Box>
        </Box>
      </Box>
      <SidebarDivider sx={{ width: '100%', my: 4 }} />

      <Box sx={sx.group}>
        <Box className='risk-layer-container' sx={{ mt: 0, mb: 4 }} >
          <Box as='h2' variant='styles.h4' className='risk-layer-title'>
            {riskTitle}
            <Info>{riskDescription}</Info>
          </Box>

          <Box className='risk-layers'>
            {variable != 'lethal_heat_3d' && (
              <Filter
                values={riskBands}
                setValues={setRiskBands}
                colors={riskColors}
                labels={riskLabels}
                multiSelect={false}
                onClick={handleBandChange}
              />
            )}
            {variable == 'lethal_heat_3d' && (
              <Tag color='red' value={true} sx={
                {
                  mr: [2], mb: [2],
                  borderColor: 'red',
                  width: 'max-content',
                }}>
                Warming level of emergence
              </Tag>
            )}
          </Box>

          <Box sx={{ ...sx.label, }}>
            <Colorbar
              sx={{ width: '250px', display: 'inline-block', flexShrink: 1, }}
              sxClim={{ fontSize: [1, 1, 1, 2], pt: [1] }}
              width='100%'
              colormap={colormap}
              label={colormapLabel}
              units={colormapUnits}
              clim={[clim[0].toFixed(2), clim[1].toFixed(2)]}              horizontal
              bottom
              discrete // only applies for lethal heat layer, does not affect other layers
            />
          </Box>

          {/* {(variable != 'lethal_heat_3d' && !variable.startsWith('tc')) && (
            <Box sx={sx.label}>Min
              <Slider
                min={climRanges[variable].min}
                max={climRanges[variable].max}
                step={(variable == 'lethal_heat_3d') ? 0.5 : ((variable == 'slr_3d') || (variable.startsWith('drought'))) ? 0.01 : 0.1}
                sx={{ width: '150px', display: 'inline-block', ml: 2, }}
                value={clim[0]}
                onChange={(e) => {
                  if (parseFloat(e.target.value) < clim[1]) {
                    setClim([parseFloat(e.target.value), clim[1]])
                  } else {
                    setClim([clim[1], clim[1]])
                  }
                }
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
                  (variable == 'slr_3d') && (clim[0].toFixed(2) == climRanges[variable].min) ? '< ' + clim[0].toFixed(2) : clim[0].toFixed(2)
                }
              </Badge>
            </Box>
          )}

          {(variable != 'lethal_heat_3d') && (
            <Box sx={sx.label}>Max
              <Slider
                min={climRanges[variable].min}
                max={climRanges[variable].max}
                step={(variable == 'lethal_heat_3d') ? 0.5 : ((variable == 'slr_3d') || (variable.startsWith('drought'))) ? 0.01 : 0.1}
                sx={{ width: '150px', display: 'inline-block', ml: 2, }}
                value={clim[1]}
                onChange={(e) => {
                  if (parseFloat(e.target.value) > clim[0]) {
                    setClim([clim[0], parseFloat(e.target.value)])
                  } else {
                    setClim([clim[0], clim[0]])
                  }
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
                  ((variable == 'drought' || variable == 'slr_3d' || variable == 'precip' || variable == 'wdd' || variable == "tc_rcp") &&
                    (clim[1].toFixed(2) == climRanges[variable].max)) ? '>' + clim[1].toFixed(2) : clim[1].toFixed(2)
                }
              </Badge>
            </Box>
          )} */}

          {variable == 'lethal_heat_3d' && (
            <Box sx={{ ...sx.label }}>
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
                {parseFloat(band).toFixed(1)}
              </Badge>
            </Box>
          )}
        </Box>
      </Box>
    </>
  )
}

export default Layers
