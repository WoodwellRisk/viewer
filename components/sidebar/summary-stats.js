import { Box } from 'theme-ui'
import { useMemo } from 'react'
import * as d3 from 'd3'
import BarChart from './charts/bar-chart'

const StatsDisplay = ({ data, variable, colormap, sliding }) => {

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

        <BarChart data={data} variable={variable} colormap={colormap} />
      </>
    )
  }
  
  const SummaryStats = ({variable, regionData, showRegionPicker, colormap, sliding}) => {

    return (
      <Box> 
        {showRegionPicker && regionData?.value && (
          <StatsDisplay data={ regionData } variable={ variable } colormap={colormap} sliding={sliding} />
        )}
      </Box>
    )
  }
  
  export default SummaryStats