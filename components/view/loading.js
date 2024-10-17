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
        bg: 'background',
        animationDuration: '0.15s',
        animationDelay: '1s',
        animationName: fade.toString(),
        animationFillMode: 'forwards',
        position: 'absolute',
        maxWidth: '1920px',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: [
            '0',
            'calc(2 * 100vw / 6 + 18px)',
            'calc(3 * 100vw / 12 + 24px)',
            'calc(3 * 100vw / 12 + 36px)',
          ],
          width: [
            'calc(100vw)',
            'calc(100vw - (2 * 100vw / 6 + 18px))',
            'calc(100vw - (3 * 100vw / 12 + 24px))',
            'calc(100vw - calc(3 * 100vw / 12 + 36px))',
          ],
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
    </Box>
  )
}

export default Loading
