// This file was modified from its original source, Carbonplan's prototype-maps GitHub repository:
// https://github.com/carbonplan/prototype-maps/blob/6f867bfe6731c5c880f6ebf3ea36c8b3efe2809e/components/expanding-section.js

import { Expander } from '@carbonplan/components'
import { useState } from 'react'
import { Box, Flex } from 'theme-ui'

const sx = {
  heading: {
    fontFamily: 'heading',
    letterSpacing: 'smallcaps',
    textTransform: 'uppercase',
    fontSize: [2, 2, 2, 3],
  },
}

const ExpandingSection = ({ label, expanded, setExpanded, disabled=null, children }) => {

  return (
    <Box sx={{mx: [3, 4, 5, 5]}}>
      <Flex
        sx={{
          justifyContent: 'space-between',
          cursor: disabled ? 'not-allowed' : 'pointer',
          color: disabled ? 'secondary' : 'primary',
          '& svg': disabled ? {stroke: 'secondary', fill: 'secondary'} :{ stroke: 'primary', fill: 'primary'} ,
          transition: '0.15s',
          '&:hover': disabled ? {} : { 
            color: 'secondary', 
            '& svg': { 
                stroke: 'secondary',
                fill: 'secondary'
            } 
        },
        }}
        onClick={() => {
          if (!disabled) {
            setExpanded(!expanded)
          }
        }}
      >
        <Box sx={sx.heading}>{label}</Box>
        <Expander
          value={expanded}
          sx={{
            cursor: disabled ? 'not-allowed' : 'pointer',
            pointerEvents: disabled ? 'none' : 'all',
          }}
        />
      </Flex>
      {expanded && children && (
        <Flex
          sx={{
            flexDirection: 'column',
            my: 4,
            gap: 4,
          }}
        >
          {children}
        </Flex>
      )}
    </Box>
  )
}

export default ExpandingSection