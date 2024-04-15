import { useState } from 'react'
import { Box } from 'theme-ui'

import SidebarHeader from './sidebar-header'
import Footer from './footer'
import Menu from './menu'
import Layers from './layers'

const Sidebar = ({ getters, setters, showMethods, toggleMethods }) => {
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
    },
  }

  const [showMenu, setShowMenu] = useState(false)

  return (
    <Box sx={sx['sidebar-container']}>
      <SidebarHeader showMenu={showMenu} toggleMenu={() => setShowMenu(!showMenu)} />
      
      <Box id='sidebar' sx={{ position: 'relative', flex: 1, overflowY: 'scroll', }} >
        <Menu visible={showMenu} /> 

        <Layers getters={getters} setters={setters} />

        <Footer />
      </Box>

    </Box>
  )
}

export default Sidebar
