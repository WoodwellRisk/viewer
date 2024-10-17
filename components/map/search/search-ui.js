// Adapted from Carbonplan's <Input /> component:
// https://github.com/carbonplan/components/blob/main/src/input.js
import React, { forwardRef, useEffect } from 'react'
import { Box, Select, useThemeUI } from 'theme-ui'
import { useMapbox } from '@carbonplan/maps'
import SearchBox from './search-box'
import SearchBoxCoords from './search-box-coords'
import SearchResults from './search-results'

import useStore from '../../store/index'

const SearchUI = () => {
  const { theme } = useThemeUI()

  const { map } = useMapbox()

  const setSearchText = useStore((state) => state.setSearchText)
  const coordinates = useStore((state) => state.coordinates)
  const setCoordinates = useStore((state) => state.setCoordinates)
  const bbox = useStore((state) => state.bbox)
  const searchBy = useStore((state) => state.searchBy)
  const setSearchBy = useStore((state) => state.setSearchBy)

  const sx = {
    'toggle-search': {
      color: 'primary',
      bg: theme.colors.background,
      width: '50%',
      borderWidth: '2px'
    }
  }

  const handleSearchBy = (event) => {
    if (event.target.value == 'place') {
      setCoordinates(null)
    } else {
      setSearchText("")
    }
    setSearchBy(event.target.value)
  }

  useEffect(() => {
    if (coordinates) {
      map.flyTo({
        center: coordinates,
        zoom: 7.5,
      })
    }
  }, [coordinates])

  useEffect(() => {
    if (bbox) {
      map.fitBounds(bbox)
    }
  }, [bbox])

  return (
    <Box sx={{
      width: '300px',
      left: [13],
      top: [50],
      pl: [2],
    }}>
      <Select
        size='xs'
        sx={sx['toggle-search']}
        value={searchBy}
        onChange={handleSearchBy}
      >
        <option value='place'>Place</option>
        <option value='coords'>Coordinates</option>
      </Select>

      {searchBy == 'place' && (
        <>
          <SearchBox />
          <SearchResults />
        </>
      )}

      {searchBy == 'coords' && (
        <SearchBoxCoords />
      )}
    </Box>
  )
}

export default forwardRef(SearchUI)