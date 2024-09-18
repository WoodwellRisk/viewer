import { useState } from 'react'
import { Flex } from 'theme-ui'
import Sidebar from '../sidebar'
import About from '../sidebar/about'
import Map from '../map'
import Loading from './loading'

function Desktop({ getters, setters }) {
  const [showAbout, setShowAbout] = useState(false)
  const toggleAbout = () => setShowAbout(!showAbout)

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
      <Sidebar getters={getters} setters={setters} showAbout={showAbout} toggleAbout={toggleAbout} />

      <About showAbout={showAbout} toggleAbout={toggleAbout} mobile={false}/>

      <Map getters={getters} setters={setters} mobile={false} />
      
      <Loading />
    </Flex>
  )
}

export default Desktop
