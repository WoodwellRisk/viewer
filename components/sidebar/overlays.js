import { Box, Flex, Text, useThemeUI } from 'theme-ui'
import { Toggle } from '@carbonplan/components'

import useStore from '../store/index'

const Overlays = () => {
    const { theme } = useThemeUI()

    const zoom = useStore((state) => state.zoom)
    const showStatesZoom = useStore((state) => state.showStatesZoom)
    const showLakes = useStore((state) => state.showLakes)
    const setShowLakes = useStore((state) => state.setShowLakes)
    const showCountriesOutline = useStore((state) => state.showCountriesOutline)
    const setShowCountriesOutline = useStore((state) => state.setShowCountriesOutline)
    const showRegionsOutline = useStore((state) => state.showRegionsOutline)
    const setShowRegionsOutline = useStore((state) => state.setShowRegionsOutline)
    const showStatesOutline = useStore((state) => state.showStatesOutline)
    const setShowStatesOutline = useStore((state) => state.setShowStatesOutline)

    const sx = {
        'overlays-container': {
            mb: [0],
            mx: 'auto',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            minHeight: '100px', // set at ~1/5 the container height
        },
        'label': {
            fontFamily: 'mono',
            letterSpacing: 'mono',
            textTransform: 'uppercase',
            fontSize: [1, 1, 1, 2],
            mt: '10px',
            display: "flex"
        },
        'toggle': {
            mt: '8px',
        },
        'warning-box': {
            display: 'block',
            border: '2px solid',
            borderColor: 'red',
            borderRadius: '5px',
            my: [1],
            p: [1],
            bg: theme.colors.background,
        }
    }

    return (
        <Box sx={sx['overlays-container']}>
            <Flex sx={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <Box sx={sx.label}>Countries</Box>
                <Toggle
                    sx={sx['toggle']}
                    value={showCountriesOutline}
                    onClick={() => setShowCountriesOutline(!showCountriesOutline)}
                />
            </Flex>

            <Flex sx={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <Box sx={sx.label}>Regions</Box>
                <Toggle
                    sx={sx['toggle']}
                    value={showRegionsOutline}
                    onClick={() => setShowRegionsOutline(!showRegionsOutline)}
                />
            </Flex>

            <Flex sx={{ justifyContent: 'space-between' }}>
                <Box sx={sx.label}>States</Box>
                <Toggle
                    sx={sx['toggle']}
                    value={showStatesOutline}
                    onClick={() => setShowStatesOutline(!showStatesOutline)}
                />
            </Flex>
            {zoom < showStatesZoom && showStatesOutline && (
                <Box sx={sx['warning-box']}>
                    <Text sx={{ color: 'red', fontSize: [1] }}>Zoom in further to see the states layer.</Text>
                </Box>
            )}

            <Flex sx={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <Box sx={sx.label}>Lakes</Box>
                <Toggle
                    sx={sx['toggle']}
                    value={showLakes}
                    onClick={() => setShowLakes(!showLakes)}
                />
            </Flex>
        </Box>
    )
}

export default Overlays