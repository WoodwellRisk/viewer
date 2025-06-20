import { useCallback } from 'react'
import { Box } from 'theme-ui'
import { useThemedColormap } from '@carbonplan/colormaps'
import { Badge, Colorbar, Filter, Link, Slider } from '@carbonplan/components'

import SidebarDivider from './sidebar-divider'
import Info from './info'
import useStore from '../store/index'

const Layers = () => {
  const variables = useStore((state) => state.variables)

  const variable = useStore((state) => state.variable)
  const setVariable = useStore((state) => state.setVariable)
  const band = useStore((state) => state.band)
  const setBand = useStore((state) => state.setBand)
  const clim = useStore((state) => state.clim)()
  const colormapName = useStore((state) => state.colormapName)()
  const colormap = (variable == 'lethal_heat') ? useThemedColormap(colormapName, { count: 8 }).slice(0,).reverse() :
    (variable.startsWith('cdd') || variable.startsWith('hdd')) ? useThemedColormap(colormapName).slice(0,).reverse().slice(10, -10) :
      (variable.startsWith('tavg')) ? useThemedColormap(colormapName).slice(0,).reverse() :
        (variable.startsWith('tc')) ? useThemedColormap(colormapName).slice(0,).reverse() :
          (variable == 'slr') ? useThemedColormap(colormapName).slice(0,).reverse() :
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
  const riskOptions = useStore((state) => state.riskOptions)
  const setRiskBands = useStore((state) => state.setRiskBands)
  const riskLabels = useStore((state) => state.riskLabels)()
  const colormapLabel = useStore((state) => state.colormapLabel)()
  const colormapUnits = useStore((state) => state.colormapUnits)()

  const setSliding = useStore((state) => state.setSliding)

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
      let bands = riskOptions[risk].bands
      let band
      if (risk == 'lethal_heat') {
        band = bands[bands.length - 1]
      } else {
        band = bands[0]
      }

      setVariable(risk)
      setRiskBands(bands)
      setBand(band)
    }
  })

  const handleMouseDown = useCallback((event) => {
    setSliding(true)
  }, [band])

  const handleMouseUp = useCallback((event) => {
    setSliding(false)
  }, [band])

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
      <SidebarDivider sx={{ width: '100%', ml: 0, my: 4 }} />

      <Box sx={sx.group}>
        <Box className='risk-layer-container' sx={{ mt: 0, mb: 4 }} >
          <Box as='h2' variant='styles.h4' className='risk-layer-title'>
            {riskTitle}
            <Info>{riskDescription}</Info>
          </Box>

          <Box className='risk-layers'>
            {variable == 'slr' && (
              <Box sx={{ ...sx.label, mt: [4], width: '90%' }}>
                <Box sx={{ ...sx.label, mb: [1] }}>{riskLabels[variable]}</Box>
              </Box>

            )}

            {variable != 'slr' && (
              <Box  sx={{ ...sx.label, mt: [4], width: '90%' }}>
                <Box sx={{ ...sx.label, mb: [1] }}>{riskLabels[variable]}</Box>
                <Slider
                  sx={{ mt: [3], mb: [2], width: variable == 'tc_rp' ? '150px' : '175px', display: 'inline-block' }}
                  value={band}
                  onChange={(e) => setBand(parseFloat(e.target.value))}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  min={variable == 'tc_rp' ? 2017.0 : variable == 'lethal_heat' ? 1.0 : 1.5}
                  max={variable == 'tc_rp' ? 2050.0 : variable == 'lethal_heat' ? 4.0 : (variable == 'drought' || variable == 'warm_nights' || variable == 'wdd') ? 2.0 : 3.5}
                  step={variable == 'tc_rp' ? 33.0 : 0.5}
                />
                <Badge
                  sx={{
                    bg: 'primary',
                    color: 'background',
                    display: 'inline-block',
                    position: 'relative',
                    left: [3],
                    top: [-1],
                  }}
                >
                  {variable == 'tc_rp' ? riskOptions[variable].bandLabels[band] : parseFloat(band).toFixed(1)}
                </Badge>
              </Box>
            )}
          </Box>

          <Box sx={{ ...sx.label, }}>
            <Colorbar
              sx={{ width: '250px', display: 'inline-block', flexShrink: 1 }}
              sxClim={{ fontSize: [1, 1, 1, 2], pt: [1] }}
              width='100%'
              colormap={colormap}
              label={colormapLabel}
              units={colormapUnits}
              clim={[clim[0].toFixed(2), clim[1].toFixed(2)]} horizontal
              bottom
              discrete // only applies for lethal heat layer, does not affect other layers
            />
          </Box>

        </Box>
      </Box>
    </>
  )
}

export default Layers
