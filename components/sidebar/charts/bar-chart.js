import { useMemo } from 'react'
import { Box } from 'theme-ui'
import { AxisLabel, Chart, Grid, Plot, Ticks, TickLabels } from '@carbonplan/charts'

import Bar from './bar'
import DownloadBarData from './download-bar-data'

import * as d3 from 'd3'

import useStore from '../../store/index'

// Next step: move towards processing all warming levels / time periods at the same time
// so that users can download all of the data for the bar chart.
// https://github.com/WoodwellRisk/drought-monitor/blob/react-v1/components/sidebar/charts/density-plot.js
const BarChart = () => {
    const clim = useStore((state) => state.clim)()
    const risk = useStore((state) => state.risk)
    const band = useStore((state) => state.band)
    const chartLabel = useStore((state) => state.chartLabel)()
    const crop = useStore((state) => state.crop)
    const regionData = useStore((state) => state.regionData)

    const sx = {
        chart: {
            mt: [4],
            mx: 'auto',
            width: '100%',
            height: '250px',
        },
        'data-download': {
            ml: [0],
            mb: [2],
            mt: [3],
            pl: [0],
            // textAlign: 'right',
        }
    }

    if (!regionData || !regionData[risk]) { // ex: if(!'drought' or Object["drought"]) {...}
        return
    }

    let lat = regionData.coordinates.lat;
    let lon = regionData.coordinates.lon;

    let min = clim[0]
    let max = clim[1]
    const variableRange = [min, max]

    // bin the data
    const nBins = risk == 'tavg' ? 12 : 10;
    const range = max - min;
    const binWidth = (risk == "hot_days") || (risk == "warm_nights") ? 30 : range / nBins;

    // the sea level rise, temperature and lethal heat bins need to be shifted
    // "out of the box", the binning method works for variables with range [0, value]
    // the sea level rise and temperature data layers go from [-value, value]
    // the lethal heat data only goes from [1, 4]
    let binEdges = Array(nBins + 1).fill(0).map((_, i) => Number((i * binWidth).toFixed(2)))
    if (risk == 'slr') {
        binEdges = binEdges.map((d) => Number((d - 0.5).toFixed(1)))
    } else if (risk == 'lethal_heat') {
        binEdges = binEdges.map((d) => Number((d + 1.0).toFixed(1)))
    } else if (risk == 'tavg') {
        binEdges = []
        let start = min;
        let end = max;
        for (let idx = min; idx < end + 5; idx += 5) {
            binEdges.push(idx);
          }
        // console.log(binEdges)
    }

    const bin = d3.bin().domain(variableRange).thresholds(binEdges)

    const xMin = (risk == 'tavg') ? min - 2.5 : min - binWidth;
    const xMax = (risk == 'tavg') ? max + 5 : max + binWidth;

    // for some layers, there are values that are above the ranges in climRanges, where I created a "truncated" colormap. 
    // so for anything above or below those ranges, there is "no data" to show in the histogram.
    // i solved this by setting values above and below the colormap values to the min / max of climRanges.
    // https://stackoverflow.com/questions/22311544/get-indices-indexes-of-all-occurrences-of-an-element-in-an-array
    let data;
    if(risk.startsWith('cf')) {
        data = regionData[risk][crop];
    } else {
        data = regionData[risk];
    }

    let binnedData = useMemo(() => {
        let bands = Object.keys(data).sort()
        let binnedData = {}

        bands.forEach(band => {
            let graphData = []
            data[band].forEach(function (element, idx) {
                if (element !== 9.969209968386869e36) {
                    if (element > max) {
                        graphData.push(max);
                    } else if (element < min) {
                        graphData.push(min);
                    } else {
                        graphData.push(element);
                    }
                }
            });
            let dataCount = graphData.length

            // bin the data
            const bins = bin(graphData)

            let percentages;
            const initialValue = 0;
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
            let checkEmptyArrays = bins.reduce((total, arr) => total + arr.length, initialValue);
            if (checkEmptyArrays == 0) { // then there is no data to display
                percentages = Array(nBins + 1).fill(0)
            } else {
                percentages = bins.map(arr => {
                    return Number(((arr.length / dataCount) * 100).toFixed(0))
                })
            }

            // https://stackoverflow.com/questions/22015684/zip-arrays-in-javascript
            const zip = (x, y) => Array.from(Array(x.length), (_, i) => [x[i], y[i]]);
            let binnedBand = zip(binEdges.map((edge) => edge), percentages);
            binnedData[band] = binnedBand
        })

        // const sortedData = Object.keys(binnedData).sort().reduce((acc, key) => {
        //     acc[key] = binnedData[key];
        //     return acc;
        // }, {});

        // return sortedData;
        return binnedData;
    }, [data])

    let plotData = binnedData[band];

    return (
        <>
            <Box sx={{ ...sx.chart }} className='chart-container'>

                <Chart x={[xMin, xMax]} y={[0, 100]} padding={{ left: 50, top: 0 }} >
                    <Grid vertical horizontal />
                    <Ticks left bottom />
                    <TickLabels left bottom />
                    <AxisLabel left >Percent</AxisLabel>
                    <AxisLabel bottom>{chartLabel}</AxisLabel>
                    <Plot>
                        <Bar data={plotData} strokeWidth={0.5} />
                    </Plot>
                </Chart>

                <Box sx={sx['data-download']}>
                    Download data: <DownloadBarData data={binnedData} fileType={'CSV'} /> / <DownloadBarData data={binnedData} fileType={'JSON'} />
                </Box>

            </Box>
        </>
    )
}

export default BarChart