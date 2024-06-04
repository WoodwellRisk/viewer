import { useState, useEffect } from 'react'
import { Minimap, Path, Graticule } from '@carbonplan/minimaps'
import { equirectangular, mercator } from '@carbonplan/minimaps/projections'
import { useThemeUI } from 'theme-ui'

const GlobeDemo = ({showGraticule}) => {
  const { theme } = useThemeUI()
  const [opacity, setOpacity] = useState(0.2)

  useEffect(() => {
    // console.log(showGraticule) 
    showGraticule == false ? setOpacity(0.0) : setOpacity(0.2)
  }, [showGraticule])
  
  return (
    <>
      <Minimap projection={equirectangular}>
        <Path
          stroke={'white'}
          source={'https://cdn.jsdelivr.net/npm/world-atlas@2/land-50m.json'}
          feature={'land'}
        />
        <Graticule stroke={'white'} opacity={opacity} />
      </Minimap>


    </>
  )
}

export default GlobeDemo