import { useState } from 'react'
import { useThemeUI, Box } from 'theme-ui'
import { useBreakpointIndex } from '@theme-ui/match-media'
import { useThemedColormap } from '@carbonplan/colormaps'

import Layout from '../components/layout'
import Desktop from '../components/desktop'
import Mobile from '../components/mobile'

function Index() {
  const isWide = useBreakpointIndex() > 0
  const [expanded, setExpanded] = useState(false)

  const { theme } = useThemeUI()

  const [display, setDisplay] = useState(true)
  const [opacity, setOpacity] = useState(1)
  const [risk, setRisk] = useState('Drought')
  const [variable, setVariable] = useState('drought_1_5')
  const [colormapName, setColormapName] = useState('warm')
  const colormap = (variable == 'lethal_heat') ? useThemedColormap(colormapName, { count: 15 }).slice(0,).reverse() : 
                   (variable.startsWith('tavg')) ? useThemedColormap(colormapName).slice(0,).reverse() : 
                   (variable.startsWith('tc')) ? useThemedColormap(colormapName).slice(0,).reverse() : 
                   (variable == 'slr') ? useThemedColormap(colormapName).slice(0,).reverse() : 
                   useThemedColormap(colormapName)
  const [clim, setClim] = useState([0.0, 0.5])
  const [showRegionPicker, setShowRegionPicker] = useState(false)
  const [regionData, setRegionData] = useState({ loading: true })
  const [showOceanMask, setShowOceanMask] = useState(true)
  const [showCountriesOutline, setShowCountriesOutline] = useState(false)
  const [showStatesOutline, setShowStatesOutline] = useState(false)
  const [showLakes, setShowLakes] = useState(false)
  const [showLandOutline, setShowLandOutline] = useState(true)

  const getters = {
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
  };

  const setters = {
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
  };
  
  return (
    <>
      {isWide && (
        <Layout
          description={
            'Woodwell Climate Research Center risk data'
          }
          title='Woodwell Risk data viewer'
          header={false}
          dimmer={false}
          footer={false}
          metadata={false}
          guide={'teal'}
        >
          <Desktop getters={getters} setters={setters} />
        </Layout> 
      )}
      {!isWide && (
        <Box sx={{ display: ['initial', 'none', 'none', 'none'] }}>
          <Layout
            description={
              'Woodwell Climate Research Center risk data'
            }
            title='Woodwell Risk data viewer'
            card='https://storage.googleapis.com/risk-maps/media/woodwell-risk.png'
            header={true}
            dimmer={true}
            metadata={false}
            footer={false}
            guide={'teal'}
            settings={{
              value: expanded,
              onClick: () => setExpanded(!expanded),
            }}
          >
            <Mobile getters={getters} setters={setters} expanded={expanded} />
          </Layout>
        </Box>
      )}
    </>
  )
}

export default Index
