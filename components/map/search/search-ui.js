// Adapted from Carbonplan's <Input /> component:
// https://github.com/carbonplan/components/blob/main/src/input.js
import React, { forwardRef, useEffect, useState } from 'react'
import { Box, Select, useThemeUI, IconButton } from 'theme-ui'
import { useMapbox } from '@carbonplan/maps'
import { searchArray } from './places'
import SearchBox from './search-box'
import SearchBoxCoords from './search-box-coords'
import SearchResults from './search-results'

const SearchUI = () => {
  const { theme } = useThemeUI()

  const [results, setResults] = useState([])
  const [searchText, setSearchText] = useState(null)
  const [coordinates, setCoordinates] = useState(null)
  const [bbox, setBbox] = useState(null)
  const [searchBy, setSearchBy] = useState('place') // 'place', 'coords'

  const { map } = useMapbox()

  const sx = {
    'toggle-search': {
      color: 'primary',
      bg: theme.colors.background,
      width: '50%',
      borderWidth: '2px'
    }
  }

  const handleSearchBy = (event) => {
    if (event.target.value == 'mapbox') {
      setSearchText("")
      setCoordinates(null)
    } else if (event.target.value == 'place') {
      setCoordinates(null)
    } else {
      setSearchText("")
    }
    setSearchBy(event.target.value)
  }

  const handleSearch = (event) => {
    const limit = 10;
    let query = event.target.value
    setSearchText(query)

    if (query == "") {
      setResults([])
      return
    }

    let tempResults = searchArray.filter((place) => {
      return place[0]["name"].startsWith(query)
    }).slice(0, limit)

    let numResults = tempResults.length
    if (numResults < limit) {
      let additionalResults = searchArray.filter((place) => {
        return !place[0]["name"].startsWith(query) && place[0]["name"].toLowerCase().includes(query.toLowerCase())
      }).slice(0, limit - numResults)

      tempResults = tempResults.concat(additionalResults)
    }
    setResults(tempResults.map((place) => [place[0]["name"], place[0]["search"]]))
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
          <SearchBox
            placeholder={'Search for place'}
            onSearch={handleSearch}
            text={searchText}
            results={results}
          />

          <SearchResults
            results={results}
            setResults={setResults}
            searchText={searchText}
            setSearchText={setSearchText}
            setCoordinates={setCoordinates}
            setBbox={setBbox}
          />
        </>
      )}

      {searchBy == 'coords' && (
        <SearchBoxCoords setCoordinates={setCoordinates} />
      )}
    </Box>
  )
}

export default forwardRef(SearchUI)