import { useCallback, useEffect } from 'react'
import { Box, Text } from 'theme-ui'
import { useThemedColormap } from '@carbonplan/colormaps'
import { Badge, Colorbar, Filter, Link, Slider } from '@carbonplan/components'

import useCustomColormap from '../store/use-custom-colormap'
import Info from './info'
import useStore from '../store/index'

const Layers = () => {
  // state variables for risk categories
  const categoryNavigation = useStore((state) => state.categoryNavigation)
  const setCategoryNavigation = useStore((state) => state.setCategoryNavigation)
  const categories = useStore((state) => state.categories)()
  const category = useStore((state) => state.category)
  const setCategory = useStore((state) => state.setCategory)
  const associatedRisks = useStore((state) => state.associatedRisks)

  // state variables for risk layers
  const riskNavigation = useStore((state) => state.riskNavigation)
  const setRiskNavigation = useStore((state) => state.setRiskNavigation)
  const riskTitle = useStore((state) => state.riskTitle)()
  const riskLabels = useStore((state) => state.riskLabels)()
  const riskTagLookup = useStore((state) => state.riskTagLookup)()

  const risks = useStore((state) => state.risks)
  const risk = useStore((state) => state.risk)
  const setRisk = useStore((state) => state.setRisk)
  const riskDescription = useStore((state) => state.riskDescription)()
  const riskOptions = useStore((state) => state.riskOptions)
  const setRiskBands = useStore((state) => state.setRiskBands)
  const bandLabel = useStore((state) => state.bandLabel)()

  const cropOptions = useStore((state) => state.cropOptions)
  const setCropOptions = useStore((state) => state.setCropOptions)
  const setCrop = useStore((state) => state.setCrop)
  const bandIndex = useStore((state) => state.bandIndex)
  const setBandIndex = useStore((state) => state.setBandIndex)
  const setBand = useStore((state) => state.setBand)
  const clim = useStore((state) => state.clim)()
  const colormapName = useStore((state) => state.colormapName)()
  const colormap = (risk == 'lethal_heat') ? useThemedColormap(colormapName, { count: 8 }).slice(0,).reverse() :
    (risk.startsWith('cdd') || risk.startsWith('hdd')) ? useThemedColormap(colormapName).slice(0,).reverse().slice(10, -10) :
    (risk.startsWith('tavg')) ? useCustomColormap(colormapName) :
    (risk.startsWith('tc')) ? useThemedColormap(colormapName).slice(0,).reverse() :
    (risk == 'slr') ? useThemedColormap(colormapName).slice(0,).reverse() :
    risk.startsWith('cf') ? useCustomColormap(colormapName) :
    useThemedColormap(colormapName)
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
    h2: {
      fontSize: [4, 4, 4, 5],
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'h3',
      mt: [5],
      mb: [2],
    },
    h3: {
      fontSize: [4, 4, 4, 5],
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'h3',
      mt: [4],
      mb: [2],
    }
  }

  const handleCategoryChange = useCallback((event) => {

    let category = event.target.innerHTML

    if(categories.includes(category)) {
      setCategory(category)

      // use this line if you want to default to the first layer in each category
      let riskLayer = associatedRisks[category][0]

      // use this code chunk to check if the layer already exists in the category
      // let riskLayer
      // // check to see if the current risk is within the risk category
      // if(associatedRisks[category].includes(risk)) {
      //   riskLayer = risk
      // } else {
      //   // if not, activate the first layer in that category
      //   riskLayer = associatedRisks[category][0]
      // }
      // setRisk(riskLayer)

      let riskNavigation = {}
      associatedRisks[category].forEach(r => {
        riskNavigation[r] = r == riskLayer;
      })
      setRiskNavigation(riskNavigation)

      let bands = riskOptions[riskLayer].bands
      let bandIndex
      if (riskLayer == 'lethal_heat') {
        bandIndex = riskOptions[riskLayer].bands.length - 1
      } else {
        bandIndex = 0
      }
      setRiskBands(bands)
      setBandIndex(bandIndex)
      setBand(riskOptions[riskLayer].bands[bandIndex])
      setRisk(riskLayer)

    }
  })

  const handleRiskChange = useCallback((event) => {
    
    let riskLayer = riskTagLookup[event.target.innerHTML];

    if (risks.includes(riskLayer)) {
      let bands = riskOptions[riskLayer].bands
      let bandIndex
      if (riskLayer == 'lethal_heat') {
        bandIndex = riskOptions[riskLayer].bands.length - 1
      } else {
        bandIndex = 0
      }

      setRisk(riskLayer)
      setRiskBands(bands)
      setBandIndex(bandIndex)
      setBand(riskOptions[riskLayer].bands[bandIndex])
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
    setBand(riskOptions[risk].bands[bandIndex])
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

        <Box as='h2' sx={sx.h2} className='risk-theme-title'>
            Climate risks <Info>
              Choose a climate risk category to see a list of related data layers. Some layers can be
              found in multiple categories (e.g. <Text sx={{fontStyle: 'italic'}}>temperature and health</Text> or <Text sx={{fontStyle: 'italic'}}>wildfire and energy</Text>).
            </Info>
          </Box>

          <Box className='risk-themes'>
            <Filter
                sx={{
                  mr: [1],
                  mb: [0],
                }}
                values={categoryNavigation}
                setValues={setCategoryNavigation}
                colors={'primary'}
                multiSelect={false}
                onClick={handleCategoryChange}
              />
          </Box>

          <Box as='h3' sx={sx.h3} className='risk-title'>
            Layers <Info>
              Several layers on this map were created by aggregating climate model output not by year, but by warming level.
              To learn more about this approach, please see our <Link href="https://woodwellrisk.github.io/tools/warming-levels/#evaluating-warming-level-calculations" target="_blank">methodology website</Link>.
            </Info>
          </Box>

          <Box className='risk-layers'>
            <Filter
              key={category}
              sx={{
                mr: [1],
                mb: [2],
              }}
              values={riskNavigation}
              labels={riskLabels}
              setValues={setRiskNavigation}
              colors={'primary'}
              multiSelect={false}
              onClick={handleRiskChange}
            />
          </Box>

        </Box>
      </Box>

      <Box sx={sx.group}>
        <Box className='risk-layer-container' sx={{ mt: 0, mb: 4 }} >
          <Box as='h2' sx={sx.h3} className='risk-layer-title'>
            {riskTitle}
            <Info>{riskDescription}</Info>
          </Box>

          <Box className='risk-layers'>
            {risk == 'slr' && (
              <Box sx={{ ...sx.label, mt: [4], width: '90%' }}>
                <Box sx={{ ...sx.label, mb: [1] }}>{bandLabel}</Box>
              </Box>
            )}

            {risk.startsWith('cf') && (
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

            {risk != 'slr' && (
              <Box sx={{ ...sx.label, mt: [4], width: '100%' }}>
                <Box sx={{ ...sx.label, mb: [1] }}>{bandLabel}</Box>
                <Slider
                  sx={{ mt: [3], mb: [2], width: (risk.startsWith('tc') || risk.startsWith('cf')) ? '150px' : '175px', display: 'inline-block' }}
                  value={bandIndex}
                  onChange={handleSliderChange}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  min={0}
                  max={riskOptions[risk].bands.length - 1}
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
                    (risk.startsWith('tc') || risk.startsWith('cf')) ? riskOptions[risk].bandLabels[bandIndex] :
                    (risk == 'lsp' || risk == 'pm25') ? riskOptions[risk].bands[bandIndex].toFixed(0) : 
                    riskOptions[risk].bands[bandIndex].toFixed(1) 
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
