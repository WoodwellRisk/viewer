import { Box, Text } from 'theme-ui'
import { Dimmer } from '@carbonplan/components'
import DemoSettings from '../icons/demo-settings'
import InfoDemo from './info-demo'

const MobileContent = () => {

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
    'heading': {
      mt: [2, 2, 3],
      mb: [4],
      pr: [0, 5, 5, 6],
      fontSize: [4, 4, 4, 5],
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'h3',
      width: '100%',
    }
  }

  return (
    <>
      <Box sx={sx['container']} >
        <Box sx={sx['heading']}>
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

        <Box sx={{ mt: 2 }}>
          <Text>
            Clicking the <Text sx={{ bg: 'muted' }}>Settings</Text> icon <DemoSettings sx={{ color: 'primary', height: '18px', mb: [-1]}} />  above will allow you to change the map layers and time frame.
          </Text>
        </Box>


        {/* <Box as='h2' variant='styles.h4'>
          <Text sx={{ textDecoration: 'underline' }}>Methods</Text>
        </Box>
        <Box sx={{ mt: -2, }}>
          <Text>...</Text>
        </Box> */}

      </Box>
    </>
  )
}

export default MobileContent