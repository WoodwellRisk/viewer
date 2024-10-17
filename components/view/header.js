import React, { useState } from 'react'
import { Box, Flex, Container, Link } from 'theme-ui'
import { Column, Menu, Row } from '@carbonplan/components'

const links = [
  { url: 'https://www.woodwellclimate.org/research-area/risk/', display: 'About' },
  { url: 'https://woodwellrisk.github.io/', display: 'Research' },
  { url: 'https://github.com/WoodwellRisk', display: 'Code' },
]

const Nav = ({ link, nav, first }) => {
  
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
        py: [3, 3, 4, 5],
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

const Header = ({ status, nav, menuItems }) => {
  const [expanded, setExpanded] = useState(false)

  const toggle = (e) => {
    setExpanded(!expanded)
  }

  return (
    <Row
      sx={{
        pt: ['12px'],
        pb: [3],
      }}
    >
      <Column start={[1]} width={[2]}>
        <Box sx={{ pointerEvents: 'all', display: 'block', width: 'fit-content' }}>
          Woodwell Risk
        </Box>
      </Column>
      
      <Column
        start={[status ? 6 : 4, 6, 11, 11]}
        width={[status ? 1 : 3, 3, 2, 2]}
        sx={{ zIndex: 5000 }}
      >
        <Flex sx={{ pointerEvents: 'all', justifyContent: 'flex-end' }}>
          <Box
            sx={{
              display: [status ? 'none' : 'flex', 'flex', 'flex', 'flex'],
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
          // height: 'calc(3 * 100vh/ 8 + 120px)',
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
        <Container>
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
                  nav={nav}
                  setExpanded={setExpanded}
                />
              </Box>
            </Column>
          </Row>
        </Container>
      </Box>
    </Row>
  )
}

export default Header