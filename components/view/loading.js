import { Box, Flex } from 'theme-ui'
import { keyframes } from '@emotion/react'

const Loading = ({ mobile = false }) => {
  const fade = keyframes({
    from: {
      opacity: 1,
    },
    to: {
      opacity: 0,
    },
  })

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        fontFamily: 'mono',
        backgroundColor: 'background',
        animationDuration: '0.15s',
        animationDelay: '1s',
        animationName: fade.toString(),
        animationFillMode: 'forwards',
        position: mobile ? 'absolute' : 'relative',
        maxWidth: '1920px',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <Flex
        sx={{
          justifyContent: 'center',
          lineHeight: 'body',
          alignItems: 'center',
          textTransform: 'uppercase',
          letterSpacing: 'mono',
          height: mobile ? 'calc(100vh - 300px)' : '100vh',
          width: '100%',
          color: 'secondary',
          fontSize: [2, 2, 2, 3],
        }}
      >
        loading map...
      </Flex>
    </Box>
  )
}

export default Loading