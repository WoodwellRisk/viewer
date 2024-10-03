import { useState } from 'react'
import { Box, Text } from 'theme-ui'
import { SidebarDivider } from '@carbonplan/layouts'

import SidebarHeader from './sidebar-header'
import Menu from './menu'
import Layers from './layers'
import ExpandingSection from './expanding-section'
import Overlays from './overlays'
import SummaryStats from './summary-stats'
import BarChart from './charts/bar-chart'
import Footer from './footer'

const Sidebar = ({ getters, setters, showAbout, toggleAbout }) => {
  const {
    variable,
    band,
    clim,
    colormapName,
    colormap,
    regionData,
    showRegionPicker,
    showCountriesOutline,
    showStatesOutline
  } = getters

  const {
    setVariable,
    setBand,
    setClim,
    setColormapName,
    setRegionData,
    setShowRegionPicker,
    setShowCountriesOutline,
    setShowStatesOutline
  } = setters
  
  const sx = {
    'sidebar-container': {
      maxWidth: [
        0,
        '350px',
        '350px',
        '400px',
        // 'calc(3 * 100vw / 8 + 18px)',
        // 'calc(3 * 100vw / 12 + 24px)',
        // 'calc(3 * 100vw / 12 + 36px)',
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
    },
    'expand-section': {
      mx: [3, 4, 5, 6],
      pt: [1],
      mt: ['12px'],
      fontSize: [2, 2, 2, 3],
      width: 'fit-content',
      fontFamily: 'heading',
      letterSpacing: 'smallcaps',
      textTransform: 'uppercase',
      cursor: 'pointer',
      '&:hover': {
        color: 'secondary',
      },
    },
    arrow: {
      display: 'inline-block',
      fontSize: [4],
      ml: [2],
      top: '3px',
      position: 'relative',
      transition: 'transform 0.2s',
      transform: showAbout ? 'scaleX(-1)' : 'scaleX(1)',
    },
  }

  const [showMenu, setShowMenu] = useState(false)
  const [sliding, setSliding] = useState(false)
  const [showOverlays, setShowOverlays] = useState(false)

  return (
    <Box sx={sx['sidebar-container']}>
      <SidebarHeader showMenu={showMenu} toggleMenu={() => setShowMenu(!showMenu)} />
      
      <Box id='sidebar' sx={{ position: 'relative', flex: 1, overflowY: 'scroll', }} >
        <Menu visible={showMenu} /> 

        <Box onClick={toggleAbout} sx={sx['expand-section']} >
          ABOUT THIS SITE <Text sx={sx.arrow}>→</Text>
        </Box>
        <SidebarDivider sx={{ width: '100%', my: 4 }} />

        <Layers getters={getters} setters={setters} />
        <SidebarDivider sx={{ width: '100%', my: 4 }} />

        <ExpandingSection 
          label='Charts' 
          expanded={showRegionPicker} 
          setExpanded={setShowRegionPicker}
        >
          {showRegionPicker && (
            <Box sx={{ ...sx.stats }}>
              <SummaryStats
                variable={variable}
                regionData={regionData}
                showRegionPicker={showRegionPicker}
                colormap={colormap}
                sliding={sliding}
              />
            </Box>
          )}
        </ExpandingSection>
        <SidebarDivider sx={{ width: '100%', my: 4 }} /> 

        <ExpandingSection label='Overlays' expanded={showOverlays} setExpanded={setShowOverlays}>
          <Overlays
              getters={{ showStatesOutline, showCountriesOutline }}
              setters={{ setShowStatesOutline, setShowCountriesOutline }}
            />
        </ExpandingSection>
        <SidebarDivider sx={{ width: '100%', mt: 4 }} />

        <Footer />
      </Box>

    </Box>
  )
}

export default Sidebar
