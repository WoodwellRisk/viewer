import { Flex } from 'theme-ui'
import Sidebar from '../sidebar'
import About from '../sidebar/about'
import Map from '../map'
import Loading from './loading'

function Desktop() {

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
      <Sidebar />

      <About mobile={false} />

      <Map mobile={false} />

      <Loading />
    </Flex>
  )
}

export default Desktop
