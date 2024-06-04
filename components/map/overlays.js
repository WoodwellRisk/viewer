import { Box, Flex } from 'theme-ui'
import { Toggle } from '@carbonplan/components'

const sx = {
    label: {
        fontFamily: 'mono',
        letterSpacing: 'mono',
        textTransform: 'uppercase',
        fontSize: [1, 1, 1, 2],
        mt: [3],
    },
}

const Overlays = ({ getters, setters }) => {
    const {
        risk,
        variable,
        band,
        clim,
        colormapName,
        display,
        opacity,
        showOceanMask,
        showCountriesOutline,
        showStatesOutline,
        showLandOutline,
        showLakes,
        debug,
    } = getters

    const {
        setRisk,
        setVariable,
        setBand,
        setClim,
        setColormapName,
        setDisplay,
        setOpacity,
        setShowOceanMask,
        setShowCountriesOutline,
        setShowStatesOutline,
        setShowLandOutline,
        setShowLakes,
        setDebug,
    } = setters

    return (
        <>
            <Box sx={{ position: 'absolute', top: 30, right: 40 }}>
                <Flex
                    sx={{
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        gap: 4,
                    }}
                >
                    <Box>
                        <Box sx={{ ...sx.label, mt: [0] }}>Countries</Box>
                        <Toggle
                            sx={{ display: 'block', float: 'right', mt: [2] }}
                            value={showCountriesOutline}
                            onClick={() => setShowCountriesOutline((prev) => !prev)}
                        />
                    </Box>
                </Flex>
            </Box>

            <Box sx={{ position: 'absolute', top: 80, right: 40 }}>
                <Flex
                    sx={{
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        gap: 4,
                    }}
                >
                    <Box>
                        <Box sx={{ ...sx.label, mt: [0] }}>States</Box>
                        <Toggle
                            sx={{ display: 'block', float: 'right', mt: [2] }}
                            value={showStatesOutline}
                            onClick={() => setShowStatesOutline((prev) => !prev)}
                        />
                    </Box>
                </Flex>
            </Box>
        </>
    )
}

export default Overlays
