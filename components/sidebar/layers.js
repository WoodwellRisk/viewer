import { useCallback, useEffect } from 'react'
import { Box } from 'theme-ui'
import { useThemedColormap } from '@carbonplan/colormaps'
import { Badge, Colorbar, Filter, Link, Slider } from '@carbonplan/components'

import useCustomColormap from '../store/useCustomColormap'
import SidebarDivider from './sidebar-divider'
import Info from './info'
import useStore from '../store/index'

const Layers = () => {
  const variables = useStore((state) => state.variables)
  const variable = useStore((state) => state.variable)
  const setVariable = useStore((state) => state.setVariable)
  const cropOptions = useStore((state) => state.cropOptions)
  const setCropOptions = useStore((state) => state.setCropOptions)
  const setCrop = useStore((state) => state.setCrop)
  const bandIndex = useStore((state) => state.bandIndex)
  const setBandIndex = useStore((state) => state.setBandIndex)
  const setBand = useStore((state) => state.setBand)
  const clim = useStore((state) => state.clim)()
  const colormapName = useStore((state) => state.colormapName)()
  const colormap = (variable == 'lethal_heat') ? useThemedColormap(colormapName, { count: 8 }).slice(0,).reverse() :
    (variable.startsWith('cdd') || variable.startsWith('hdd')) ? useThemedColormap(colormapName).slice(0,).reverse().slice(10, -10) :
    (variable.startsWith('tavg')) ? useCustomColormap(colormapName) :
    (variable.startsWith('tc')) ? useThemedColormap(colormapName).slice(0,).reverse() :
    (variable == 'slr') ? useThemedColormap(colormapName).slice(0,).reverse() :
    variable.startsWith('cf') ? useCustomColormap(colormapName) :
    useThemedColormap(colormapName)

  // state variables for risk themes
  // const riskThemes = useStore((state) => state.riskThemes)
  // const setRiskThemes = useStore((state) => state.setRiskThemes)
  const riskTitle = useStore((state) => state.riskTitle)()
  const risks = useStore((state) => state.risks)
  const setRisks = useStore((state) => state.setRisks)
  const riskTagLabels = useStore((state) => state.riskTagLabels)()
  const riskTagLookup = useStore((state) => state.riskTagLookup)()

  // state variables for specific risks
  const riskDescription = useStore((state) => state.riskDescription)()
  const riskOptions = useStore((state) => state.riskOptions)
  const setRiskBands = useStore((state) => state.setRiskBands)
  const bandLabel = useStore((state) => state.bandLabel)()
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
    let risk = riskTagLookup[event.target.innerHTML];
    if (variables.includes(risk)) {
      let bands = riskOptions[risk].bands
      let bandIndex
      if (risk == 'lethal_heat') {
        bandIndex = riskOptions[risk].bands.length - 1
      } else {
        bandIndex = 0
      }

      setVariable(risk)
      setRiskBands(bands)
      setBandIndex(bandIndex)
      setBand(riskOptions[risk].bands[bandIndex])
    }
  })

  const handleMouseDown = useCallback((event) => {
    setSliding(true)
  }, [bandIndex])

  const handleMouseUp = useCallback((event) => {
    setSliding(false)
  }, [bandIndex])

  const handleSliderChange = useCallback((event) => {
    let bandIndex = event.target.value;
    setBandIndex(bandIndex)
  })

  useEffect(() => {
    setBand(riskOptions[variable].bands[bandIndex])
  }, [bandIndex])

  const handleCropChange = useCallback((event) => {
    let crop = event.target.innerText.toLowerCase();
    if (Object.keys(cropOptions).includes(crop))
      setCrop(crop)
  })

  return (
    <>
      <Box sx={sx.group}>
        <Box sx={{ mt: -3 }} className='risk-theme-container'>

        {/* <Box as='h2' variant='styles.h4' className='risk-theme-title'>
            Risk category
          </Box>

          <Box className='risk-themes'>
            <Filter
                sx={{
                  mr: [3],
                  mb: [2],
                }}
                values={riskThemes}
                setValues={setRiskThemes}
                colors={'primary'}
                multiSelect={false}
                // onClick={handleRiskThemeChange}
              />
          </Box> */}

          <Box as='h2' variant='styles.h4' className='risk-title'>
            Climate risks <Info>
              Several layers on this map were created by aggregating climate model output not by year, but by warming level.
              To learn more about this approach, please see our <Link href="https://woodwellrisk.github.io/tools/warming-levels/#evaluating-warming-level-calculations" target="_blank">methodology website</Link>.
            </Info>
          </Box>

          <Box className='risk-layers'>
            <Filter
              sx={{
                mr: [3],
                mb: [2],
              }}
              values={risks}
              labels={riskTagLabels}
              setValues={setRisks}
              colors={'primary'}
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
                <Box sx={{ ...sx.label, mb: [1] }}>{bandLabel}</Box>
              </Box>
            )}

            {variable.startsWith('cf') && (
              <Box className='risk-theme-layers'>
                <Filter
                  sx={{
                    mr: [3],
                    mb: [2],
                  }}
                  values={cropOptions}
                  setValues={setCropOptions}
                  colors={'primary'}
                  multiSelect={false}
                  onClick={handleCropChange}
                />
              </Box>
            )}

            {variable != 'slr' && (
              <Box sx={{ ...sx.label, mt: [4], width: '90%' }}>
                <Box sx={{ ...sx.label, mb: [1] }}>{bandLabel}</Box>
                <Slider
                  sx={{ mt: [3], mb: [2], width: (variable.startsWith('tc') || variable.startsWith('cf')) ? '150px' : '175px', display: 'inline-block' }}
                  value={bandIndex}
                  onChange={handleSliderChange}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  min={0}
                  max={riskOptions[variable].bands.length - 1}
                  step={1}
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
                  { 
                    (variable.startsWith('tc') || variable.startsWith('cf')) ? riskOptions[variable].bandLabels[bandIndex] :
                    (variable == 'lsp' || variable == 'pm25') ? riskOptions[variable].bands[bandIndex].toFixed(0) : 
                    riskOptions[variable].bands[bandIndex].toFixed(1) 
                  }
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
