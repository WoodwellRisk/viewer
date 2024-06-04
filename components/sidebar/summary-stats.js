import { useCallback, useEffect } from 'react'
import { Box } from 'theme-ui'

const AverageDisplay = ({ variable, data }) => {

    if (!data.value || !data.value[variable]) { // ex: if(!'drought' or Object["drought"]) {...}
      // this is an attempt to catch the error: ncaught (in promise) TypeError: _this2.tiles[key] is undefined
      // that you get when you switch variables with the RegionPicker open
      //   useEffect(() => {
      //     console.log('Caught null value...')
      //     // Use setTimeout to update the message after 500 milliseconds (0.5 seconds)
      //     setTimeout(() => {
      //       console.log("Waiting...")
      //   }, 5000);
      // })
      //   if (!data.value || !data.value[variable]) {
      //     return
      // }
      return
    }
  
    let result
    const filteredData = data.value[variable].filter((d) => d !== 9.969209968386869e36)
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
      } else { // else drought
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
  
  const SummaryStats = ({variable, regionData, showRegionPicker}) => {

    return (
      <Box
        sx={{
            mt: [4],
            mx: 'auto',
            pl: [0, 4, 5, 6],
            pr: [0, 1, 1, 1,],
        }}
      > 
        {showRegionPicker && regionData?.value && (
          <AverageDisplay data={ regionData } variable={ variable } />
        )}
      </Box>
    )
  }
  
  export default SummaryStats