import { Box, Flex } from 'theme-ui'
import { Toggle } from '@carbonplan/components'

const sx = {
    'overlays-container': {
        mb: [0],
        mx: 'auto',
        width: '100%',
        height: '75px',
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
    }
}

const Overlays = ({ getters, setters }) => {
    const { showStatesOutline, showCountriesOutline } = getters
    const { setShowStatesOutline, setShowCountriesOutline } = setters

    return (
        <Box sx={sx['overlays-container']}>

            <Flex sx={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Box sx={sx.label }>Countries</Box>
                    <Toggle
                        sx={sx['toggle']}
                        value={showCountriesOutline}
                        onClick={() => setShowCountriesOutline((prev) => !prev)}
                    />
            </Flex>

            <Flex sx={{ justifyContent: 'space-between' }}>
                <Box sx={sx.label}>States</Box>
                <Toggle
                    sx={sx['toggle']}
                    value={showStatesOutline}
                    onClick={() => setShowStatesOutline((prev) => !prev)}
                />
            </Flex>
        </Box>
    )
}

export default Overlays