import { useCallback, useMemo } from 'react'
import { Box } from 'theme-ui'
import { Filter } from '@carbonplan/components'
import BarChart from './bar-chart'
import Timeseries from './timeseries'

import useStore from '../../store/index'

const StatsDisplay = ({ data }) => {
  const variable = useStore((state) => state.variable)
  const band = useStore((state) => state.band)
  const riskOptions = useStore((state) => state.riskOptions)
  const bands = riskOptions[variable]['bands']
  const statsLabel = useStore((state) => state.statsLabel)()
  const crop = useStore((state) => state.crop)
  const chartTypes = useStore((state) => state.chartTypes)
  const setChartTypes = useStore((state) => state.setChartTypes)

  if (!data || !data[variable]) { // ex: if(!'drought' or Object["drought"]) {...}
    return
  }

  let result;

  let chartData = useMemo(() => {
    let lineData = {}
    if (!data) return {}
    bands.forEach((b) => {
      let filteredData;

      if(variable.startsWith('cf')) {
        filteredData = data[variable][crop][b].filter((d) => d !== 9.969209968386869e36)
      } else {
        filteredData = data[variable][b].filter((d) => d !== 9.969209968386869e36)
      }

      const average = filteredData.reduce((a, b) => a + b, 0) / filteredData.length
      lineData[b] = average;
    })
    return lineData
  }, [data, crop])

  let avg = chartData[band]
  if (isNaN(avg)) {
    result = 'no data in region'
  } else {
      result = `Average: ${avg.toFixed(2)} ${statsLabel}`
  }

  return (
    <>

      <Box sx={{
        mb: [4],
      }}>
        <Filter
          values={chartTypes}
          setValues={setChartTypes}
          multiSelect={false}
        />
      </Box>

      <Box
        sx={{
          fontFamily: 'mono',
          letterSpacing: 'mono',
          // textTransform: 'uppercase',
        }}
      >
        {result}
      </Box>

      {chartTypes['bar'] == true && (<BarChart />)}
      {chartTypes['timeseries'] == true && (<Timeseries data={chartData} />)}
      
    </>
  )
}

const Charts = () => {
  const variable = useStore((state) => state.variable)
  const regionData = useStore((state) => state.regionData)
  const showRegionPicker = useStore((state) => state.showRegionPicker)

  return (
    <Box>
      {showRegionPicker && regionData[variable] && (
        <StatsDisplay data={regionData} />
      )}
    </Box>
  )
}

export default Charts