import { useState } from 'react'
import { Flex } from 'theme-ui'
import Sidebar from './sidebar'
import Map from './map'
import Methods from './methods'
import Loading from './loading'

function Desktop({ getters, setters }) {
  const [showMethods, setShowMethods] = useState(false)
  const toggleMethods = () => setShowMethods(!showMethods)

  return (
    <Flex
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        flexDirection: ['column', 'row', 'row'],
        overflow: 'hidden',
        margin: 'auto',
      }}
    >
      <Sidebar getters={getters} setters={setters} showMethods={showMethods} toggleMethods={toggleMethods} />

      <Methods showMethods={showMethods} toggleMethods={toggleMethods} />

      <Map getters={getters} setters={setters} mobile={false} />
      
      <Loading />
    </Flex>
  )
}

export default Desktop
