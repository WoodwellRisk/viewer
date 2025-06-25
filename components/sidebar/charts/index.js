import { Box } from 'theme-ui'
import BarChart from './bar-chart'

import useStore from '../../store/index'

const StatsDisplay = ({ data, variable }) => {

  if (!data.value || !data.value[variable]) { // ex: if(!'drought' or Object["drought"]) {...}
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
    } else if (variable.startsWith('hot_days')) {
      result = `Average: ${average.toFixed(2)} hot days`
    } else if (variable.startsWith('wdd')) {
      result = `Average: ${average.toFixed(2)} danger days`
    }else if (variable.startsWith('cdd') || variable.startsWith('hdd')) {
      result = `Average: ${average.toFixed(2)} degree days`
    } else if (variable.startsWith('warm_nights')) {
      result = `Average: ${average.toFixed(2)} nights`
    } else if (variable == 'slr') {
      result = `Average: ${average.toFixed(2)} meters`
    } else if (variable.startsWith('tc')) {
      result = `Average: ${average.toFixed(2)} years`
    } else { // else drought or crop failure data
      result = `Average: ${average.toFixed(2)}%`
    }
  }

  return (
    <>
      <Box
        sx={{
          fontFamily: 'mono',
          letterSpacing: 'mono',
          textTransform: 'uppercase',
        }}
      >
        {result}
      </Box>

      <BarChart data={data} variable={variable} />
    </>
  )
}

const Charts = () => {
  const variable = useStore((state) => state.variable)
  const regionData = useStore((state) => state.regionData)
  const showRegionPicker = useStore((state) => state.showRegionPicker)

  return (
    <Box>
      {showRegionPicker && regionData?.value && (
        <StatsDisplay data={regionData} variable={variable} />
      )}
    </Box>
  )
}

export default Charts