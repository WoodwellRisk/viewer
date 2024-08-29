import { useEffect, useState } from 'react'
import { useColorMode, Box } from 'theme-ui'
import { useBreakpointIndex } from '@theme-ui/match-media'

import Layout from '../components/view/layout'
import Desktop from '../components/view/desktop'
import Mobile from '../components/view/mobile'

function Index() {
  const isWide = useBreakpointIndex() > 0
  const [expanded, setExpanded] = useState(false)
  const [colorMode, setColorMode] = useColorMode()

  const description = 'Woodwell Climate Research Center risk data'
  const title = 'Woodwell Risk data viewer'
  const logoURL = 'https://storage.googleapis.com/risk-maps/media/woodwell-risk.png'

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
          <Desktop />
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
            <Mobile expanded={expanded} />
          </Layout>
        </Box>
      )}
    </>
  )
}

export default Index
