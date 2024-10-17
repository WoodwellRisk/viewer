// Adapted from Carbonplan's <Input /> component:
// https://github.com/carbonplan/components/blob/main/src/input.js
import React, { forwardRef, useEffect } from 'react'
import { Box, IconButton } from 'theme-ui'
import { XCircle } from '@carbonplan/icons'
import SearchUI from './search-ui'

import useStore from '../../store/index'

const Search = () => {
  const showSearch = useStore((state) => state.showSearch)
  const setShowSearch = useStore((state) => state.setShowSearch)
  const setSearchText = useStore((state) => state.setSearchText)
  const setResults = useStore((state) => state.setResults)
  const setLookup = useStore((state) => state.setLookup)
  const setCoordinates = useStore((state) => state.setCoordinates)
  const setBbox = useStore((state) => state.setBbox)

  useEffect(() => {
    if(showSearch == false) {
      setCoordinates(null)
      setBbox(null)
      setLookup(null)
      setSearchText("")
      setResults([])
    }
  }, [showSearch])

  return (
    <>
      <Box
        sx={{
          display: ['none', 'flex', 'flex', 'flex'],
          position: 'absolute',
          color: 'primary',
          left: [13],
          top: [50],
        }}
      >
        <IconButton
          aria-label='search map'
          onClick={() => {setShowSearch(!showSearch)}
        }
          sx={{ stroke: 'primary', cursor: 'pointer', width: 34, height: 34 }}
        >
          {!showSearch && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='34'
              height='34'
              strokeWidth='1.75'
              fill='none'
            >
              <circle cx='12' cy='12' r='10' />
              <circle cx='10' cy='10' r='3' />
              <line x1='12' x2='17' y1='12' y2='17' />
            </svg>
          )}
          {showSearch && (
            <XCircle sx={{ strokeWidth: 1.75, width: 34, height: 34 }} />
          )}
        </IconButton>

        {showSearch && (
          <SearchUI />
        )}
      </Box>
    </>
  )
}

export default forwardRef(Search)