import { Box, IconButton } from 'theme-ui'
import { useRecenterRegion } from '@carbonplan/maps'
import { XCircle } from '@carbonplan/icons'

const AverageDisplay = ({ variable, data: { value } }) => {
  if (!value || !value[variable]) { // ex: if(!'drought' or Object["drought"]) {...}
    return 'loading...'
  }

  let result
  const filteredData = value[variable].filter((d) => d !== 9.969209968386869e36)
  if (filteredData.length === 0) {
    result = 'no data in region'
  } else {
    const average =
      filteredData.reduce((a, b) => a + b, 0) / filteredData.length
    if (variable.startsWith('precip')) {
      result = `Average: ${average.toFixed(2)} mm`
    } else if (variable.startsWith('tavg') || variable == 'lethal_heat') {
      result = `Average: ${average.toFixed(2)} ºC`
    } else if (variable.startsWith('hot_days') || variable.startsWith('wdd')) {
      result = `Average: ${average.toFixed(2)} days per year`
    } else if (variable.startsWith('wn')) {
      result = `Average: ${average.toFixed(2)} nights per year`
    }else if (variable == 'slr') {
      result = `Average: ${average.toFixed(2)} meters`
    }else if (variable.startsWith('tc')) {
      result = `Average: ${average.toFixed(2)} years`
    } else { // else prob_extreme_drought
      result = `Average: ${average.toFixed(2)}`
    }
  }

  return (
    <Box
      sx={{
        ml: [2],
        mt: ['-1px'],
        fontFamily: 'mono',
        letterSpacing: 'mono',
        textTransform: 'uppercase',
      }}
    >
      {result}
    </Box>
  )
}

const RegionControls = ({
  variable,
  //month,
  regionData,
  showRegionPicker,
  setShowRegionPicker,
}) => {
  const { recenterRegion } = useRecenterRegion()

  return (
    <Box
      sx={{
        display: ['none', 'none', 'flex', 'flex'],
        alignItems: 'center',
        position: 'absolute',
        color: 'primary',
        left: [13],
        bottom: [17, 17, 15, 15],
      }}
    >
      
      <IconButton
        aria-label='Circle filter'
        onClick={() => setShowRegionPicker(!showRegionPicker)}
        sx={{ stroke: 'primary', cursor: 'pointer', width: 34, height: 34 }}
      >
        {!showRegionPicker && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='34'
            height='34'
            strokeWidth='1.75'
            fill='none'
          >
            <circle cx='12' cy='12' r='10' />
            <circle cx='10' cy='10' r='3' />
            <line x1='12' x2='17' y1='12' y2='17' />
          </svg>
        )}
        {showRegionPicker && (
          <XCircle sx={{ strokeWidth: 1.75, width: 24, height: 24 }} />
        )}
      </IconButton>
      
      {showRegionPicker && (
        <IconButton
          aria-label='Recenter map'
          onClick={recenterRegion}
          sx={{ stroke: 'primary', cursor: 'pointer', width: 34, height: 34 }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='34'
            height='34'
            strokeWidth='1.75'
            fill='none'
          >
            <circle cx='12' cy='12' r='10' />
            <circle cx='12' cy='12' r='2' />
          </svg>
        </IconButton>
      )}
      
      {showRegionPicker && (
        <AverageDisplay data={ regionData } variable={ variable } /> // month={month} />
      )}
    </Box>
  )
}

export default RegionControls
