import { IconButton } from 'theme-ui'
import { keyframes } from '@emotion/react'
import { useCallback, useEffect, useRef } from 'react'
import { Reset } from '@carbonplan/icons'

const ZoomResetDemo = ({ reference, zoom, center }) => {
    const demoResetButton = useRef(null)
    console.log(reference)

    const spin = keyframes({
        from: {
            transform: 'rotate(0turn)'
        },
        to: {
            transform: 'rotate(1turn)'
        }
    })

    const handleResetClick = useCallback((event) => {
        // reset map
        demoResetButton.current = event.target
        demoResetButton.current.classList.add('spin')

        //   if (zoom != 1.00 || center[0] != -40 || center[1] != 40) {
        //     map.flyTo({
        //       center: [-40, 40],
        //       zoom: 1.0,
        //     })
        //   }
    })

    const handleAnimationEnd = useCallback(() => {
        demoResetButton.current.classList.remove('spin')
    })

    useEffect(() => {
        console.log("Zoom changed: ", zoom)
    }, [zoom])

    useEffect(() => {
        console.log("Center changed: ", zoom)
    }, [center])

    return (
        <IconButton
            aria-label='Reset map extent - demo'
            onClick={handleResetClick}
            onAnimationEnd={handleAnimationEnd}
            //   disabled={zoom == 1.00 && center[0] == -40 && center[1] == 40}
            sx={{
                stroke: 'primary', cursor: 'pointer', ml: [2],
                display: ['initial', 'initial', 'initial', 'initial'],
                position: 'absolute',
                // color: (zoom == 1.00 && center[0] == -40 && center[1] == 40) ? 'muted' : 'primary',
                left: [2],
                bottom: [13],
                '.spin': {
                    animation: `${spin.toString()} 1s`,
                },
            }}
        >
            <Reset sx={{ strokeWidth: 1.75, width: 20, height: 20 }} />
        </IconButton>
    )
}

export default ZoomResetDemo
