import React, { useState } from 'react'
import { Box, Container, Flex, IconButton, Link, Text } from 'theme-ui'
import { Column, Dimmer, Menu, Row } from '@carbonplan/components'
import { QuestionCircle, X } from '@carbonplan/icons'

import useStore from '../store/index'

const sx = {
  link: (current, label, first = false) => {
    return {
      width: 'auto',
      color: current === label ? 'secondary' : 'text',
      fontSize: [5, 5, 5, 6],
      fontFamily: 'heading',
      letterSpacing: 'heading',
      borderStyle: 'solid',
      borderColor: 'muted',
      borderWidth: '0px',
      borderBottomWidth: '1px',
      borderTopWidth: first ? '1px' : '0px',
      // py: [3, 3, 4, 5],
      textDecoration: 'none',
      display: 'block',
      position: 'relative',
      transition: 'color 0.15s',
      '&:hover': {
        color: 'secondary',
      },
    }
  },
}

const links = [
  { url: 'https://www.woodwellclimate.org/research-area/risk/', display: 'About' },
  { url: 'https://woodwellrisk.github.io/', display: 'Research' },
  { url: 'https://github.com/WoodwellRisk', display: 'Code' },
]

const Nav = ({ link, nav, first }) => {
  const { url, display } = link

  return (
    <Link href={url} target="_blank" sx={sx.link(nav, url, first)}>
      {display}
    </Link>
  )
}

const NavGroup = ({ links, nav, setExpanded }) => {
  return links.map((d, i) => {
    return (
      <Nav
        key={i}
        link={d}
        nav={nav}
        first={i === 0}
        setExpanded={setExpanded}
      />
    )
  })
}

const MobileHeader = () => {
  const showAboutMobile = useStore((state) => state.showAboutMobile)
  const setShowAboutMobile = useStore((state) => state.setShowAboutMobile)

  const [expanded, setExpanded] = useState(false)
  const toggle = (e) => {
    setExpanded(!expanded)
  }
  const dimmer = 'top'

  const menuItems = [
    <Dimmer
      key='dimmer'
      sx={{
        flexShrink: 0,
        color: 'primary',
        mt: '-2px',
        display: [
          'block',
          'block',
          dimmer === 'top' ? 'block' : 'none',
          dimmer === 'top' ? 'block' : 'none',
        ],
      }}
    />,
    <IconButton
      key='info'
      aria-label='Read more about how to use the site'
      onClick={() => { setShowAboutMobile(!showAboutMobile) }}
      sx={{
        stroke: 'primary',
        cursor: 'pointer',
      }}
    >
      {!showAboutMobile && (<QuestionCircle />)}
      {showAboutMobile && (<X />)}
    </IconButton>
  ]

  return (
      <Box
        sx={{
          position: 'fixed',
          width: '100vw',
          height: '50px',
          ml: -3,
          bg: 'background',
          zIndex: 9000,
          borderWidth: '0px',
          borderBottom: '1px',
          borderStyle: 'solid',
          borderColor: 'muted'
        }}
      >
        <Row sx={{height: '100%',}}>
          <Column start={[1]} width={[3]} sx={{ mt: [2], mb: [2], ml: [3] }}>
            <Box sx={{ height: '100%', pt: [1], pointerEvents: 'all'}}>
              <Text>Woodwell Risk</Text>
            </Box>
          </Column>

          <Column
            start={[4, 6, 11, 11]}
            width={[3, 3, 2, 2]}
            sx={{ zIndex: 5000, mt: [2], mb: [2], mr: [3] }}
          >
            <Flex sx={{ pointerEvents: 'all', justifyContent: 'flex-end' }}>
              <Box
                sx={{
                  display: ['flex', 'flex', 'flex', 'flex'],
                  mr: '18px',
                  gap: '18px',
                  opacity: expanded ? 0 : 1,
                  transition: 'opacity 0.15s',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {menuItems}
              </Box>

              <Menu
                sx={{
                  flexShrink: 0,
                  mr: ['-2px'],
                }}
                value={expanded}
                onClick={toggle}
              />
            </Flex>
          </Column>

          <Box
            sx={{
              opacity: expanded ? 1 : 0,
              pointerEvents: expanded ? 'all' : 'none',
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              minWidth: '0px',
              maxHeight: '100vh',
              width: '100vw',
              bg: 'background',
              zIndex: 4000,
              pt: ['79px'],
              transition: 'opacity 0.25s',
              borderStyle: 'solid',
              borderColor: 'muted',
              borderWidth: '1px',
            }}
          >
            <Container sx={{ margin: 0 }}>
              <Row>
                <Column start={[2, 4, 7, 7]} width={[5, 4, 5, 5]}>
                  <Box
                    as='nav'
                    sx={{
                      display: expanded ? 'inherit' : 'none',
                      mt: [5, 5, 5, 6],
                    }}
                  >
                    <NavGroup
                      links={links}
                      setExpanded={setExpanded}
                    />
                  </Box>
                </Column>
              </Row>
            </Container>
          </Box>
        </Row>

      </Box>
  )
}

export default MobileHeader