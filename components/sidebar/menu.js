import { Box, Link } from 'theme-ui'
import { Row, Column } from '@carbonplan/components'

function Menu({ visible }) {
  const link = {
    color: 'text',
    fontSize: [5, 5, 5, 6],
    fontFamily: 'heading',
    letterSpacing: 'heading',
    py: [3, 3, 3, 5],
    borderStyle: 'solid',
    borderColor: 'muted',
    borderWidth: '0px',
    borderBottomWidth: '1px',
    textDecoration: 'none',
    position: 'relative',
    display: 'block',
    '@media (hover: hover) and (pointer: fine)': {
      '&:hover > #arrow': {
        opacity: 1,
      },
    },
    '&:hover': {
      color: 'text',
    },
  }

  return (
    <Box
      sx={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'all' : 'none',
        position: 'fixed',
        width: visible
          ? [
            0,
            '350px',
            '350px',
            '400px',
          ]
          : [
            0,
          ],
        height: '100%',
        borderStyle: 'solid',
        borderWidth: '0px',
        borderRightWidth: '1px',
        borderColor: 'muted',
        backgroundColor: 'background',
        zIndex: 1000,
        pr: [3, 5, 5, 6],
        pl: [3, 4, 5, 6],
        pt: [5, 5, 5, 6],
        mt: '-12px',
        transition: '0.25s',
      }}
    >
      <Row columns={[3]}>
        <Column start={[1]} width={[3]} sx={{ mt: [5] }}>
          <Link
            sx={{
              ...link,
              borderTopWidth: '1px',
              '&:hover': {
                color: 'secondary',
              },
            }}
            href='https://www.woodwellclimate.org/research-area/risk/'
            target="_blank"
          >
            About
          </Link>

          <Link
            href='https://woodwellrisk.github.io/'
            target="_blank"
            sx={{
              ...link,
              textDecoration: 'none',
              '&:hover': {
                color: 'secondary',
              },
            }}
          >
            Research
          </Link>

          <Link
            href='https://github.com/WoodwellRisk'
            target="_blank"
            sx={{
              ...link,
              textDecoration: 'none',
              '&:hover': {
                color: 'secondary',
              },
            }}
          >
            Code
          </Link>
        </Column>
      </Row>
    </Box>
  )
}

export default Menu
