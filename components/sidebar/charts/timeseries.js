import { Box } from 'theme-ui'
import { AxisLabel, Chart, Circle, Grid, Line, Plot, Ticks, TickLabels } from '@carbonplan/charts'

import DownloadTimeseriesData from './download-timeseries-data'

import useStore from '../../store/index'

const Timeseries = ({ data }) => {
    const variable = useStore((state) => state.variable)
    const band = useStore((state) => state.band)
    const riskOptions = useStore((state) => state.riskOptions)
    const bands = riskOptions[variable]['bands']
    const bandLabel = useStore((state) => state.bandLabel)()
    const riskTagLabels = useStore((state) => state.riskTagLabels)()
    const chartLabel = useStore((state) => state.chartLabel)()
    const clim = useStore((state) => state.clim)()
    const sliding = useStore((state) => state.sliding)

    const sx = {
        chart: {
            mt: [3],
            mx: 'auto',
            width: '100%',
            height: '250px',
        },
        label: {
            fontSize: [2, 2, 2, 3],
            fontFamily: 'heading',
            letterSpacing: 'smallcaps',
            textTransform: 'uppercase',
            mt: [4],
            ml: [2],
            pl: [6],
        },
        chartWarning: {
            height: '100%',
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'red',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'red',
            borderRadius: '4px',
        },
        'data-download': {
            ml: [0],
            mb: [2],
            mt: [3],
            pl: [0],
            // textAlign: 'right',
        }
    }

    const plotData = bands.map((b) => [b, data[b]]);

    return (
        <>
            <Box sx={{ ...sx.chart }} className='chart-container'>
                {(variable == 'lethal_heat' || variable == 'slr' || variable == 'permafrost') && (
                    <Box sx={sx.chartWarning}>
                        <Box>
                            This type of chart is not available for the {riskTagLabels[variable].toLowerCase()} data.
                        </Box>
                    </Box>
                )}

                {(variable != 'lethal_heat' && variable != 'slr' && variable != 'permafrost') && (
                    <>
                        <Chart x={ [bands[0], bands.slice(-1)] } y={ clim } padding={{ left: 60, top: 20 }}>
                            <Ticks left bottom />
                            {
                                variable == 'cdd' ? <TickLabels left labels={['0', '2k', '4k', '6k', '8k', '10k']} /> 
                                : variable == 'hdd' ? <TickLabels left labels={['0', '2k', '4k', '6k', '8k', '10k', '12k', '14k']} /> 
                                : <TickLabels left />
                            }
                            <TickLabels bottom values={bands} />
                            <AxisLabel left>{chartLabel}</AxisLabel>
                            <AxisLabel bottom>{bandLabel}</AxisLabel>
                            <Grid vertical horizontal />

                            <Plot>
                                <Line
                                    data={[
                                        [band, clim[0]],
                                        [band, clim[1]],
                                    ]}
                                    color='secondary'
                                    sx={{
                                        opacity: sliding ? 1 : 0,
                                        strokeDasharray: 4,
                                        transition: 'opacity 0.15s',
                                    }}
                                />

                                <Line data={plotData} width={1.5} color={'black'} />

                                {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every */}
                                {!plotData.every((value) => isNaN(value[1])) && (
                                    <Circle
                                        x={band}
                                        y={data[band]}
                                        size={8}
                                    />
                                )}

                            </Plot>
                        </Chart>

                        <Box sx={sx['data-download']}>
                            Download data: <DownloadTimeseriesData data={plotData} fileType={'CSV'} /> / <DownloadTimeseriesData data={plotData} fileType={'JSON'} />
                        </Box>
                    </>
                )}
            </Box>
        </>
    )
}

export default Timeseries