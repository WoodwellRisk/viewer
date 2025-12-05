import { useEffect, useState } from 'react'
import { useColorMode, Box } from 'theme-ui'
import { useBreakpointIndex } from '@theme-ui/match-media'

import Meta from './meta'
import Desktop from '../components/view/desktop'
import Mobile from '../components/view/mobile'

function Index() {
  const isWide = useBreakpointIndex() > 0
  const [expanded, setExpanded] = useState(false)
  const [colorMode, setColorMode] = useColorMode()

  useEffect(() => {
    setColorMode('light')
  }, [])
  
  return (
    <>
      <Meta />

      {isWide && (
        <Desktop />
      )}
      {!isWide && (
        <Box sx={{ display: ['initial', 'none', 'none', 'none'], overflow: "hidden",}}>
          <Mobile expanded={expanded} />
        </Box>
      )}
    </>
  )
}

export default Index
