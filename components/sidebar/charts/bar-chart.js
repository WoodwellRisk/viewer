import { Box, Text } from 'theme-ui'
import { Axis, AxisLabel, Bar, Chart, Grid, Plot, Ticks, TickLabels } from '@carbonplan/charts'
import * as d3 from 'd3'
import { SidebarDivider } from '@carbonplan/layouts'
import { climRanges } from '../sidebar-options'

const BarChart = ({ variable, regionData: { value }, showRegionPicker }) => {

    const sx = {
        chart: {
            mt: [4],
            mx: 'auto',
            pl: [0, 4, 5, 6],
            pr: [0, 1, 1, 1,],
            width: '100%',
            height: '200px',
        }
    }

    // console.log(climRanges)
    const min = climRanges[variable].min;
    const max = climRanges[variable].max
    const variableRange = [ min, max ]
    // console.log(variableRange)

    if (!value || !value[variable]) { // ex: if(!'drought' or Object["drought"]) {...}
        return
    }

    // console.log(value);
    let lat = value.coordinates.lat;
    let lon = value.coordinates.lon;
    // console.log(lat, lon);
    let graphData = []
    let graphLat = []
    let graphLon = []

    // Currently, this is not working because there are values that are above the ranges in climRanges for variables
    // where I created a "truncated" colormap. So for anything above or below those ranges, there is "no data" to show in the histogram.
    // I could solve this by setting values above and below the colormap values to the min / max of climRanges.
    // https://stackoverflow.com/questions/22311544/get-indices-indexes-of-all-occurrences-of-an-element-in-an-array
    value[variable].forEach(function (element, idx) {
        if (element !== 9.969209968386869e36) {
            if(element > max) {
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
    // console.log(graphData);
    let dataCount = graphData.length
    // console.log(-0.8 < -0.6)

    // Bin the data.
    // const nBins = (variable == 'lethal_heat') ? 8 : 10
    const nBins = 10;
    const range = max - min;
    const binWidth = range / nBins;

    // this method is currently not working for the slr or temperature data because it maps the bins to positive values only
    // i need to think of a way to map these values back to the original slr and temperature bounds
    let binEdges = Array(nBins + 1).fill(0).map((_, i) => Number((i * binWidth).toFixed(2)))
    if (variable == 'slr') {
        binEdges = binEdges.map((d) => Number((d - 0.5).toFixed(1)))
    } else if (variable.startsWith('tavg')) {
        binEdges = binEdges.map((d) => d - 30)
    }

    const xTicks = Array(nBins + 1).fill(min).map((value, i) => value + Number((i * binWidth).toFixed(2)))
    // const binEdges = Array.from({length: (nBins + 1) }, (_, i) => i + min);

    // console.log("Variable range: ", variableRange)
    // console.log("Bin width: ", binWidth)
    console.log("Bin edges: ", binEdges)
    // console.log("xTicks: ", xTicks)

    const bin = d3.bin().domain(variableRange).thresholds(binEdges)
    const bins = bin(graphData)
    console.log("Bins: ", bins)


    let percentages;
    const initialValue = 0;
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    let checkEmptyArrays = bins.reduce((total, arr) => total + arr.length, initialValue);
    // console.log(checkEmptyArrays)

    if (checkEmptyArrays == 0) { // then there is no data to display
        percentages = Array(nBins + 1).fill(0)
    } else {
        // additional issue: the lethal heat data is saying that it has undefined values somewhere
        // i am guessing that this is a division error
        percentages = bins.map(arr => {
            return Number(((arr.length / dataCount) * 100).toFixed(0))
        })
    }
    // console.log(percentages)
    console.log("Percentages: ", percentages)


    let minLat = Math.min.apply(Math, lat).toFixed(2)
    let maxLat = Math.max.apply(Math, lat).toFixed(2)
    let minLon = Math.min.apply(Math, lon).toFixed(2)
    let maxLon = Math.max.apply(Math, lon).toFixed(2)
    let minData = Math.min.apply(Math, graphData).toFixed(2)
    let maxData = Math.max.apply(Math, graphData).toFixed(2)

    // https://stackoverflow.com/questions/22015684/zip-arrays-in-javascript
    const zip = (x, y) =>  Array.from(Array(x.length), (_, i) => [x[i], y[i]]);
    let plotData = zip(binEdges, percentages);
    // console.log(plotData)
    console.log()

    return (
        <>
            {showRegionPicker && (
                <>
                    <Box sx={{ ...sx.chart }} className='chart-container'>
                        <Chart x={[min - binWidth, max + binWidth]} y={[0, 100]} padding={{ left: 50, top: 0 }} >
                            <Grid vertical horizontal />
                            <Ticks left bottom />
                            <TickLabels left bottom />
                            <AxisLabel left >Percent</AxisLabel>
                            <AxisLabel bottom>Bins</AxisLabel>
                            <Plot>
                                <Bar data={plotData} />
                            </Plot>
                        </Chart>
                    </Box>
                    <SidebarDivider sx={{ width: '100%', my: 4 }} />
                </>
            )}
        </>
    )
}

export default BarChart