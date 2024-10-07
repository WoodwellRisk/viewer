import { Box, Text } from 'theme-ui'
import { Link } from '@carbonplan/components'
import { alpha } from '@theme-ui/color'

// This component is modeled after the SidebarFooter component: 
// https://github.com/carbonplan/layouts/blob/main/src/sidebar/sidebar-footer.js

const Footer = () => {
    const sx = {
        code: {
            bg: 'muted',
            fontFamily: 'Monaco, Menlo, Consolas, Courier New, monospace !important',
        }
    }

    return (
        <>
            <Box sx={{
                px: [0, 4, 4, 0],
                pt: [0, 4, 4, 0],
                pb: [4],
                mb: [1],
                mt: [-2],
                fontSize: [1, 1, 1, 2],
                fontFamily: 'body',
                lineHeight: 'body',
                cursor: 'pointer',
                transition: 'background-color 0.15s',
                '@media (hover: hover) and (pointer: fine)': {
                    '&:hover': { bg: alpha('muted', 0.25) },
                },
            }}>
                <Box>
                    This site's interface and functionality rely heavily on code developed by <Link href='https://carbonplan.org/' target='_blank'>CarbonPlan</Link>.{' '}
                    Specifically, we used the <Link href='https://github.com/carbonplan/maps' target='_blank'><Text sx={sx.code}>maps</Text></Link>,{' '}
                    <Link href='https://github.com/carbonplan/components' target='_blank'><Text sx={sx.code}>components</Text></Link>,{' '}
                    and <Link href='https://github.com/carbonplan/layouts' target='_blank'><Text sx={sx.code}>layouts</Text></Link>{' '} libraries.
                    You can read more about CarbonPlan's research and software development work <Link href="https://carbonplan.org/research" target="_blank">here</Link>.
                </Box>
            </Box>

        </>
    )
}

export default Footer