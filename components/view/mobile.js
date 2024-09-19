import { useState } from 'react'
import { Box, Flex, Grid } from 'theme-ui'
import { alpha } from '@theme-ui/color'
import { useThemedColormap } from '@carbonplan/colormaps'
import { Left } from '@carbonplan/icons'
import { Button, Tray, FadeIn } from '@carbonplan/components'
import Map from '../map'
import Layers from '../sidebar/layers'
import Content from '../sidebar/about/content'
import Loading from './loading'

function Mobile({ expanded }) {
  const [section, setSection] = useState('map')
  const [showAbout, setShowAbout] = useState(true)

  const [variable, setVariable] = useState('drought')
  // const [variable, setVariable] = useState(null)
  // useEffect(() => {
  //   (() => {
  //     setVariable(localStorage.getItem("variable") ? localStorage.getItem("variable") : 'drought')
  //   })()
  // }, [])

  // const [variable, setVariable] = useState(() => {
  //   if(typeof window !== 'undefined') {
  //     return localStorage.getItem("variable")
  //   } else {
  //   return 'drought'
  // }
  // });
  
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

  return (
    <>
      {section === 'map' && (
        <Box
          sx={{
            width: 'calc(100vw)',
            // height: 'calc(100vh - 120px)',
            height: 'calc(100vh)',
            display: 'flex',
            ml: [-3],
          }}
        >
          <Map getters={getters} setters={setters} mobile={true} />

          <Loading isWide mobile />
        </Box>
      )}

      <Tray
        expanded={expanded}
        sx={{
          pb: [4],
          pt: [5],
          transform: expanded ? 'translateY(0)' : 'translateY(-550px)',
        }}
      >
        <Layers getters={getters} setters={setters} />
      </Tray>

      {section === 'about' && (
        <>
          <FadeIn>
            <Box sx={{ mt: [3], }} className='spacer' />
            <Button
              size='xs'
              inverted
              prefix={<Left />}
              onClick={() => setSection('map')}
              sx={{ mt: [1], cursor: 'pointer' }}
            >
              Back
            </Button>

            <Box sx={{height:'100%'}}>
              <Content />
            </Box>
          </FadeIn>
        </>
      )}

      {/* This section defines the boxes at the bottom of the mobile view. */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          bg: 'background',
          height: '64px',
          borderStyle: 'solid',
          borderWidth: '0px',
          borderTopWidth: '1px',
          borderColor: 'muted',
          fontSize: [3],
          ml: [-3],
          fontFamily: 'heading',
          letterSpacing: 'allcaps',
          textTransform: 'uppercase',
        }}
      >
        <Grid columns={[2]} gap={[0]}>
          <Flex
            onClick={() => setSection('map')}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '64px',
              borderStyle: 'solid',
              borderColor: 'muted',
              borderWidth: '0px',
              borderLeftWidth: '0px',
              borderRightWidth: '1px',
              cursor: 'pointer',
              bg: section === 'map' ? alpha('muted', 0.5) : 'background',
            }}
          >
            Map
          </Flex>

          <Flex
            onClick={() => setSection('about')}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '64px',
              // height: '100%',
              cursor: 'pointer',
              bg: section === 'about' ? alpha('muted', 0.5) : 'background',
            }}
          >
            About
          </Flex>
        </Grid>
      </Box>
    </>
  )
}

export default Mobile