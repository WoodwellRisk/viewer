import { useState, useEffect } from 'react'
import { Flex } from 'theme-ui'
import { useThemedColormap } from '@carbonplan/colormaps'
import Sidebar from '../sidebar'
import About from '../sidebar/about'
import Map from '../map'
import Loading from './loading'

function Desktop() {
  const [showAbout, setShowAbout] = useState(false)
  const toggleAbout = () => setShowAbout(!showAbout)

  // const [variable, setVariable] = useState('drought')
  // const [variable, setVariable] = useState(null)
  // useEffect(() => {
  //   (() => {
  //     setVariable(localStorage.getItem("variable") ? localStorage.getItem("variable") : 'drought')
  //   })()
  // }, [])

  const [variable, setVariable] = useState(() => {
    if(typeof window !== 'undefined') {
      return localStorage.getItem("variable")
    } else {
    return 'drought'
  }
  });
  
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
