import { useEffect, useState } from 'react'
import { useColorMode, useThemeUI, Box } from 'theme-ui'
import { useBreakpointIndex } from '@theme-ui/match-media'
import { useThemedColormap } from '@carbonplan/colormaps'

import Layout from '../components/view/layout'
import Desktop from '../components/view/desktop'
import Mobile from '../components/view/mobile'

function Index() {
  const isWide = useBreakpointIndex() > 0
  const [expanded, setExpanded] = useState(false)
  const { theme } = useThemeUI()
  const [colorMode, setColorMode] = useColorMode()
  const [variable, setVariable] = useState('drought')
  const [band, setBand] = useState(1.5)
  const [colormapName, setColormapName] = useState('warm')
  const colormap = (variable == 'lethal_heat_3d') ? useThemedColormap(colormapName, { count: 8 }).slice(0,).reverse() : 
                   (variable.startsWith('tavg')) ? useThemedColormap(colormapName).slice(0,).reverse() : 
                   (variable.startsWith('tc')) ? useThemedColormap(colormapName).slice(0,).reverse() : 
                   (variable == 'slr_3d') ? useThemedColormap(colormapName).slice(0,).reverse() : 
                   useThemedColormap(colormapName)
  const [clim, setClim] = useState([0.0, 0.5])
  const [showRegionPicker, setShowRegionPicker] = useState(false)
  const [regionData, setRegionData] = useState({ loading: true })


  const description = 'Woodwell Climate Research Center risk data'
  const title = 'Woodwell Risk data viewer'
  const logoURL = 'https://storage.googleapis.com/risk-maps/media/woodwell-risk.png'

  const getters = {
    variable,
    band,
    clim,
    colormapName,
    colormap,
    regionData,
    showRegionPicker,
  };

  const setters = {
    setVariable,
    setBand,
    setClim,
    setColormapName,
    setRegionData,
    setShowRegionPicker,
  };

  useEffect(() => {
    setColorMode('light')
  }, [])
  
  return (
    <>
      {isWide && (
        <Layout
          description={description}
          title={title}
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
        <Box sx={{ display: ['initial', 'none', 'none', 'none'], overflow: "hidden",}}>
          <Layout
            description={description}
            title={title}
            card={logoURL}
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
