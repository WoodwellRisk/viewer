// This icon is a simplified version of the <Settings /> component developed by CarbonPlan, found here:
// https://github.com/carbonplan/components/blob/main/src/settings.js

import { IconButton } from 'theme-ui'

const DemoSettings = ({ value, sx, ...props }) => {

    return (
        <>
            <IconButton
                sx={{
                    // cursor: 'pointer',
                    fill: 'none',
                    strokeWidth: '2px',
                    stroke: 'text',
                    '.paren': {
                        opacity: '0',
                    },
                    ...sx,
                }}
                aria-label='Demo settings icon'
                {...props}
            >
                <svg
                    style={{
                        width: '50px',
                        height: '30px',
                        marginTop: '-3px',
                        flexShrink: 0,
                    }}
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 68 36'
                >
                    <line x1='24' y1='2.1' x2='24' y2='6.1' />
                    <line x1='24' y1='24.1' x2='24' y2='33.9' />
                    <line x1='44' y1='2.1' x2='44' y2='12.1' />
                    <line x1='44' y1='30.1' x2='44' y2='33.9' />
                    <circle cx='24' cy='15.1' r='5' />
                    <circle cx='44' cy='21.1' r='5' />
                    <path
                        style={{ transition: 'all 0.2s' }}
                        className='paren'
                        d='M6.4,1.2c-6.3,10.3-6.3,23.3,0,33.6'
                    />
                    <path
                        style={{ transition: 'all 0.2s' }}
                        className='paren'
                        d='M61.6,34.8c6.3-10.3,6.3-23.3,0-33.6'
                    />
                </svg>
            </IconButton>
        </>
    )
}

export default DemoSettings