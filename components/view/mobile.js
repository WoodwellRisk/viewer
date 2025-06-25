import { useState } from 'react'
import { Box, Flex, Grid } from 'theme-ui'
import { alpha } from '@theme-ui/color'
import Map from '../map'
import Layers from '../sidebar/layers'
import Content from '../sidebar/about/content'
import MobileHeader from './mobile-header'
import Loading from './loading'

import useStore from '../store/index'

import { keyframes } from '@emotion/react'
const fade = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
})

function Mobile({ expanded }) {
  const [showSettings, setShowSettings] = useState(false)
  const showAboutMobile = useStore((state) => state.showAboutMobile)

  const sx = {
    'map': {
      display: 'flex',
      width: '100vw',
      height: showAboutMobile ? '0vh' : '100vh',
      ml: -3,
    },
    'about': {
      width: '100%',
      height: '100vh',
      animationDuration: '1.0s',
      animationDelay: '0.0s',
      animationName: fade.toString(),
      animationFillMode: 'forwards',
      display: 'flex',
      px: 3,
      pt: 6,
      mb: 9,
    },
    'settings': {
      position: 'fixed',
      width: '100vw',
      height: '250px',
      bottom: '0px',
      left: '0px',
      right: '100vw',
      opacity: showAboutMobile ? 0 : 1,
      bg: 'background',
      borderStyle: 'solid',
      borderWidth: '0px',
      borderTopWidth: '1px',
      mx: 'auto',
      borderColor: 'muted',
      display: 'block',
      px: 4,
      pt: 4,
      mb: '64px',
      overflowY: 'scroll',
    },
    'footer': {
      position: 'fixed',
      opacity: showAboutMobile ? 0 : 1,
      bottom: 0,
      width: '100vw',
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
    },
    'block': {
      justifyContent: 'center',
      alignItems: 'center',
      height: '64px',
      borderStyle: 'solid',
      borderColor: 'muted',
      borderWidth: '0px',
      borderLeftWidth: '0px',
      borderRightWidth: '1px',
      cursor: 'pointer',
    },
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <MobileHeader />

      <Box sx={sx['map']}>
        <Map mobile={true} />

        <Loading isWide />
      </Box>

      {showSettings && (
        <Box sx={sx['settings']}>
          <Layers mobile={true} />
        </Box >
      )}

      {showAboutMobile && (
        <Box sx={sx['about']}>
          <Content />
        </Box>
      )}

      {/* This section defines the boxes at the bottom of the mobile view. */}
      <Box sx={sx.footer}>
        <Grid columns={[2]} gap={[0]}>
          <Flex
            onClick={() => {
              setShowSettings(false)
            }}
            sx={{
              ...sx.block,
              bg: !showSettings ? alpha('muted', 0.5) : 'background',
            }}
          >
            Map
          </Flex>

          <Flex
            onClick={() => {
              setShowSettings(true)
            }}
            sx={{
              ...sx.block,
              bg: showSettings ? alpha('muted', 0.5) : 'background',
            }}
          >
            Settings
          </Flex>
        </Grid>
      </Box>
    </Box>
  )
}

export default Mobile