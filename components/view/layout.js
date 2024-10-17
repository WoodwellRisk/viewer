import React, { useEffect } from 'react'
import { useThemeUI, Container, Flex, Box } from 'theme-ui'
import { Dimmer, FadeIn, Scrollbar, Settings }  from '@carbonplan/components'
import Header from './header'
import Meta from './meta'

const Layout = ({
  title,
  description,
  url,
  card,
  children,
  status,
  nav,
  settings,
  header = true,
  metadata = 'mouse',
  dimmer = 'bottom',
  scrollbar = false,
  fade = true,
  container = true,
  printable = false,
}) => {
  let content = children

  if (fade) {
    content = <FadeIn duration={250}>{content}</FadeIn>
  }
  if (container) {
    content = (
      <Box sx={{ mb: [8, 8, 9, 10] }}>
        <Container>{content}</Container>
      </Box>
    )
  }

  const { theme } = useThemeUI()

  const hideOnPrint = printable
    ? {
        '@media print': {
          display: 'none',
        },
      }
    : {}

  useEffect(() => {
    if (!theme) return

    const handler = (e) => {
      if (e.matches && settings?.value && settings?.onClick) {
        settings?.onClick()
      }
    }

    const query = window.matchMedia(`(min-width: ${theme.breakpoints[1]})`)
    query.onchange = handler

    return () => {
      query.onchange = null
    }
  }, [theme?.breakpoints, settings?.value, settings?.onClick])

  const menuItems = [
    <Dimmer
      key='dimmer'
      sx={{
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
  ]

  if (settings) {
    menuItems.push(
      <Settings
        key='settings'
        sx={{ mr: ['2px'], display: ['inherit', 'inherit', 'none', 'none'] }}
        {...settings}
      />
    )
  }

  return (
    <>
      {scrollbar && <Scrollbar />}
      <Meta card={card} description={description} title={title} url={url} />
      
      <Flex
        sx={{
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {header && (
          <Box
            as='header'
            sx={{
              width: '100%',
              borderStyle: 'solid',
              borderColor: 'muted',
              borderWidth: '0px',
              borderBottomWidth: '1px',
              position: 'sticky',
              top: 0,
              bg: 'background',
              height: '56px',
              zIndex: 2000,
              ...hideOnPrint,
            }}
          >
            <Container>
              <Header
                status={status}
                nav={nav}
                menuItems={menuItems}
              />
            </Container>
          </Box>
        )}

        <Box
          sx={{
            width: '100%',
            flex: '1 1 auto',
          }}
        >
          {content}
        </Box>

        {dimmer === 'bottom' && (
          <Box
            sx={{
              display: ['none', 'none', 'initial', 'initial'],
              position: ['fixed'],
              right: [13],
              bottom: [17, 17, 15, 15],
            }}
          >
            <Dimmer />
          </Box>
        )}

      </Flex>
    </>
  )
}

export default Layout