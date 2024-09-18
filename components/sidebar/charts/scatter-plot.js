import { Box, Text } from 'theme-ui'
import { Axis, AxisLabel, Chart, Grid, Plot, Scatter, Ticks, TickLabels } from '@carbonplan/charts'
import { SidebarDivider } from '@carbonplan/layouts'
import { rgb } from 'polished'

const ScatterPlot = ({ variable, colormap, clim, regionData: { value }, showRegionPicker }) => {

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

    if (!value || !value[variable]) { // ex: if(!'drought' or Object["drought"]) {...}
        return
    }

    let lat = value.coordinates.lat;
    let lon = value.coordinates.lon;
    let graphData = []
    let graphLat = []
    let graphLon = []

    // https://stackoverflow.com/questions/22311544/get-indices-indexes-of-all-occurrences-of-an-element-in-an-array
    value[variable].forEach(function (element, idx) {
        if (element !== 9.969209968386869e36) {
            graphData.push(element);
            graphLat.push(lat[idx]);
            graphLon.push(lon[idx]);
        }
    });

    let minLat = Math.min.apply(Math, lat).toFixed(2)
    let maxLat = Math.max.apply(Math, lat).toFixed(2)
    let minLon = Math.min.apply(Math, lon).toFixed(2)
    let maxLon = Math.max.apply(Math, lon).toFixed(2)
    let minData = Math.min.apply(Math, graphData).toFixed(2)
    let maxData = Math.max.apply(Math, graphData).toFixed(2)

    // https://stackoverflow.com/questions/22015684/zip-arrays-in-javascript
    const zip = (x, y) => Array.from(Array(x.length), (_, i) => [x[i], y[i]]);
    let plotCoordinates = zip(graphData, graphLat);

    let minValue = Math.min.apply(Math, clim)
    let maxValue = Math.max.apply(Math, clim)

    // Currently, this is not working because there are values that are not in the colormap for variables
    // where I created a "truncated" colormap. So the call to rgb(colormap[color]) finds a value not in the colormap.
    // I could solve this by screening for values above and below the colormap values.
    // console.log("Attempt at mapping values to colors")
    // console.log(plotCoordinates.map((arr) => arr[0]).map((value) => {
    //     // value
    //     // https://stackoverflow.com/questions/49922460/scale-a-numpy-array-with-from-0-1-0-2-to-0-255
    //     let color = Math.round(((value - minValue) * (1 / (maxValue - minValue) * 255)))
    //     // console.log(value, color)
    //     return rgb(...colormap[color]);
    // }))


    return (
        <>
            {showRegionPicker && (
                <>
                    <Box sx={{ ...sx.chart }} className='chart-container'>
                        <Chart x={[minData, maxData]} y={[minLat, maxLat]} padding={{ left: 50, top: 0 }} >
                            <Grid vertical horizontal />
                            <Ticks left bottom />
                            <TickLabels left bottom />
                            <AxisLabel left >Latitude</AxisLabel>
                            <AxisLabel bottom>Value</AxisLabel>
                            <Plot>
                                {graphData.length > 0 && (<Scatter
                                    size={10}
                                    data={plotCoordinates}
                                    // color={ plotCoordinates.map((arr) => arr[0]).map((value) => rgb(...colormap[ Math.round(((value - minValue) * (1 / (maxValue - minValue) * 255))) ])) }
                                    // color={"yellow"}
                                />)}
                            </Plot>
                        </Chart>
                    </Box>
                    <SidebarDivider sx={{ width: '100%', my: 4 }} />
                </>
            )}

        </>
    )
}

export default ScatterPlot