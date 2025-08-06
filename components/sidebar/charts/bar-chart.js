import { Box } from 'theme-ui'
import { AxisLabel, Chart, Grid, Plot, Ticks, TickLabels } from '@carbonplan/charts'

import Bar from './bar'
import DownloadBarData from './download-bar-data'

import * as d3 from 'd3'

import useStore from '../../store/index'


const BarChart = () => {
    const clim = useStore((state) => state.clim)()
    const variable = useStore((state) => state.variable)
    const band = useStore((state) => state.band)
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

    let min = clim[0]
    let max = clim[1]
    const variableRange = [min, max]

    if (!regionData || !regionData[variable]) { // ex: if(!'drought' or Object["drought"]) {...}
        return
    }

    let lat = regionData.coordinates.lat;
    let lon = regionData.coordinates.lon;
    let graphData = []
    let graphLat = []
    let graphLon = []

    // for some layers, there are values that are above the ranges in climRanges, where I created a "truncated" colormap. 
    // so for anything above or below those ranges, there is "no data" to show in the histogram.
    // i solved this by setting values above and below the colormap values to the min / max of climRanges.
    // https://stackoverflow.com/questions/22311544/get-indices-indexes-of-all-occurrences-of-an-element-in-an-array
    let data;
    if(variable.startsWith('cf')) {
        data = regionData[variable][crop][band];
    } else {
        data = regionData[variable][band];
    }

    data.forEach(function (element, idx) {
        if (element !== 9.969209968386869e36) {
            if (element > max) {
                graphData.push(max);
            } else if (element < min) {
                graphData.push(min);
            } else {
                graphData.push(element);
            }

            graphLat.push(lat[idx]);
            graphLon.push(lon[idx]);
        }
    });
    let dataCount = graphData.length

    // bin the data
    const nBins = 10;
    const range = max - min;
    const binWidth = (variable == "hot_days") || (variable == "warm_nights") ? 30 : range / nBins;

    // the sea level rise, temperature and lethal heat bins need to be shifted
    // "out of the box", the binning method works for variables with range [0, value]
    // the sea level rise and temperature data layers go from [-value, value]
    // the lethal heat data only goes from [1, 4]
    let binEdges = Array(nBins + 1).fill(0).map((_, i) => Number((i * binWidth).toFixed(2)))
    if (variable == 'slr') {
        binEdges = binEdges.map((d) => Number((d - 0.5).toFixed(1)))
    } else if (variable == 'lethal_heat') {
        binEdges = binEdges.map((d) => Number((d + 1.0).toFixed(1)))
    } else if (variable == 'tavg') {
        binEdges = binEdges.map((d) => d - 30)
    }

    const bin = d3.bin().domain(variableRange).thresholds(binEdges)
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
    let plotData = zip(binEdges, percentages);
    const xMin = (variable == 'tavg') ? -35 : min - binWidth;
    const xMax = (variable == 'tavg') ? 35 : max + binWidth;

    console.log(plotData)
    return (
        <>
            <Box sx={{ ...sx.chart }} className='chart-container'>

                <Chart x={[xMin, xMax]} y={[0, 100]} padding={{ left: 50, top: 0 }} >
                    <Grid vertical horizontal />
                    <Ticks left bottom />
                    <TickLabels left bottom />
                    <AxisLabel left >Percent</AxisLabel>
                    <AxisLabel bottom>Bins</AxisLabel>
                    <Plot>
                        <Bar 
                            data={plotData} 
                            strokeWidth={0.5}
                        />
                    </Plot>
                </Chart>

                <Box sx={sx['data-download']}>
                    Download data: <DownloadBarData data={plotData} fileType={'CSV'} /> / <DownloadBarData data={plotData} fileType={'JSON'} />
                </Box>

            </Box>
        </>
    )
}

export default BarChart