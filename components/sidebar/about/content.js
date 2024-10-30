import { useState } from 'react'
import { Box, IconButton, Text } from 'theme-ui'
import { Globe, Reset } from '@carbonplan/icons'
import { Dimmer } from '@carbonplan/components'
import InfoDemo from './info-demo'
import GlobeDemo from './globe-demo'
import ResetDemo from './reset-demo'

const Content = () => {
  const [showGraticule, setShowGraticule] = useState(false)
  const toggleGraticule = () => setShowGraticule(!showGraticule)

  const sx = {
    'container': {
      mx: [3, 4, 5, 6],
      pt: [1],
      mt: 2,
      pb: [2],
      mb: [3],
      fontSize: [2, 2, 2, 3],
      width: 'fit-content',
    },
  }

  return (
    <>
      <Box sx={sx['container']} >
        <Box as='h2' variant='styles.h4'>
          <Text sx={{ textDecoration: 'underline' }}>How to use this site</Text>
        </Box>

        <Box sx={{ mt: -2 }}>
          <Text sx={{ fontSize: 2 }}>
            You will find an <Text sx={{ bg: 'muted' }}>Info</Text> icon next to each variable's name. There, you will find
            additional information about what the variable is showing, how the data layer was created, and links to any additional
            information if there is any. Clicking on the <Text sx={{ bg: 'muted' }}>Info</Text> icon reveals hidden dropdown text. You can try this with
            the icon to the right.
            <InfoDemo>This is hidden dropdown text.</InfoDemo>
          </Text>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Text>
            Clicking the <Text sx={{ bg: 'muted' }}>Sun</Text> icon <Dimmer sx={{ color: 'primary', height: '18px', }} /> will change the website theme between light and dark modes.
          </Text>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Text>
            The <Text sx={{ bg: 'muted' }}>Globe</Text> icon cycles through adding latitude/longitude degrees to the map,
            adding a grid that corresponds to those numbers, and finally removing both the coordinates and grid. Try it below.
          </Text>
        </Box>
        <Box>
          <Text>
            Click me →
            <IconButton
              aria-label='Switch graticule mode'
              onClick={toggleGraticule}
              sx={{
                stroke: 'primary', cursor: 'pointer',
                color: 'primary',
              }}
            >
              <Globe sx={{ height: '18px' }} />
            </IconButton>
          </Text>
        </Box>

        <Box sx={{ mt: 2, border: '1px solid', borderColor: 'primary', width: '100%', }}>
          <GlobeDemo showGraticule={showGraticule} />
        </Box>

        <Box sx={{ mt: 4 }}>
          <Text>
            The <Text sx={{ bg: 'muted' }}>Reset</Text> icon resets the map extent to the original zoom and center.
            Test this on the map by panning and zooming, then clicking on the <Reset sx={{ strokeWidth: 1, width: 15, height: 15 }} /> icon.
          </Text>
        </Box>
        {/*         
        {isWide && (
          <Box sx={{ mt: 2, border: '1px solid', borderColor: 'primary', width: '100%', }}>
            <ResetDemo isWide={isWide} />
          </Box>
        )} 
        */}
      </Box>
    </>
  )
}

export default Content