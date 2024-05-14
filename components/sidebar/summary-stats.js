import { Box } from 'theme-ui'

const AverageDisplay = ({ variable, data: { value } }) => {
    if (!value || !value[variable]) { // ex: if(!'drought' or Object["drought"]) {...}
      return ''
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
        //   display: ['none', 'none', 'flex', 'flex'],
        //   alignItems: 'center',
        //   position: 'absolute',
        //   color: 'primary',
        //   left: [13],
        //   bottom: [17, 17, 15, 15],
        }}
      > 
        {showRegionPicker && (
          <AverageDisplay data={ regionData } variable={ variable } /> // month={month} />
        )}
      </Box>
    )
  }
  
  export default SummaryStats