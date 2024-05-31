import { useState } from 'react'
import { Box, Text } from 'theme-ui'
import { SidebarDivider } from '@carbonplan/layouts'

import SidebarHeader from './sidebar-header'
import Menu from './menu'
import Layers from './layers'
// import ScatterPlot from './charts/scatter-plot'
import SummaryStats from './summary-stats'
import BarChart from './charts/bar-chart'
import Footer from './footer'

const Sidebar = ({ getters, setters, showMethods, toggleMethods }) => {
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
    'sidebar-container': {
      maxWidth: [
        0,
        'calc(3 * 100vw / 8 + 18px)',
        'calc(3 * 100vw / 12 + 24px)',
        'calc(3 * 100vw / 12 + 36px)',
      ],
      height: '100%',
      flexBasis: '100%',
      flexDirection: 'column',
      borderStyle: 'solid',
      borderWidth: '0px',
      borderRightWidth: '1px',
      borderColor: 'muted',
      zIndex: 900,
      backgroundColor: 'background',
      display: ['none', 'flex', 'flex'],
    }
  }

  const [showMenu, setShowMenu] = useState(false)

  return (
    <Box sx={sx['sidebar-container']}>
      <SidebarHeader showMenu={showMenu} toggleMenu={() => setShowMenu(!showMenu)} />
      
      <Box id='sidebar' sx={{ position: 'relative', flex: 1, overflowY: 'scroll', }} >
        <Menu visible={showMenu} /> 

        <Layers getters={getters} setters={setters} />
        <SidebarDivider sx={{ width: '100%', my: 4 }} />

        <SummaryStats variable={variable} regionData={regionData} showRegionPicker={showRegionPicker} />
        <BarChart variable={variable} regionData={regionData} showRegionPicker={showRegionPicker} />

        {/* <Box
          onClick={toggleMethods}
          sx={{
            mx: [3, 4, 5, 6],
            pt: [1],
            mt: ['12px'],
            pb: [2],
            mb: [3],
            fontSize: [2, 2, 2, 3],
            width: 'fit-content',
            fontFamily: 'heading',
            letterSpacing: 'smallcaps',
            textTransform: 'uppercase',
            cursor: 'pointer',
            '&:hover': {
              color: 'secondary',
            },
          }}
        >
          READ METHODS<Text sx={sx.arrow}>→</Text>
        </Box> */}

        <Footer />
      </Box>

    </Box>
  )
}

export default Sidebar
