import { useState } from 'react'
import { Flex, useThemeUI } from 'theme-ui'
import { useThemedColormap } from '@carbonplan/colormaps'
import Sidebar from '../sidebar'
import About from '../sidebar/about'
import Map from '../map'
import Loading from './loading'

function Desktop() {
  const [showAbout, setShowAbout] = useState(false)
  const toggleAbout = () => setShowAbout(!showAbout)

  const { theme } = useThemeUI()

  const [variable, setVariable] = useState('drought')
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
  const [showCountriesOutline, setShowCountriesOutline] = useState(false)
  const [showStatesOutline, setShowStatesOutline] = useState(false)

  const getters = {
    variable,
    band,
    clim,
    colormapName,
    colormap,
    regionData,
    showRegionPicker,
    showCountriesOutline,
    showStatesOutline
  };

  const setters = {
    setVariable,
    setBand,
    setClim,
    setColormapName,
    setRegionData,
    setShowRegionPicker,
    setShowCountriesOutline,
    setShowStatesOutline
  };

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
