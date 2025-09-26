import { Input, useThemeUI } from 'theme-ui'
import { searchArray } from './places'

import useStore from '../../store/index'

// Adapted from Carbonplan's <Input /> component:
// https://github.com/carbonplan/components/blob/main/src/input.js
const SearchBox = () => {
  const { theme } = useThemeUI()

  const searchText = useStore((state) => state.searchText)
  const setSearchText = useStore((state) => state.setSearchText)
  const results = useStore((state) => state.results)
  const setResults = useStore((state) => state.setResults)

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
    setResults(tempResults.map((place) => [place[0]["name"], place[0]["search"], place[0]["search"] == 'cities' ? place[0]["coords"] : place[0]["bbox"]]))
  }

  const sx = {
    'search-by-place': {
      color: 'primary',
      bg: theme.colors.background,
      border: '2px solid',
      borderColor: 'secondary',
      transition: 'border 0.15s',
      fontSize: [3, 3, 3, 4],
      fontFamily: 'body',
      letterSpacing: 'body',
      lineHeight: [1.0],
      width: '100%',
      p: '5px',
      mt: [1],
      ':focus': {
        borderColor: 'primary',
        bg: theme.colors.primary,
      },
      ':focus-visible': {
        outline: 'none !important',
        bg: theme.colors.primary,
      },
    },
  }

  return (
    <Input
      placeholder={'Search for place'}
      sx={{
        ...sx['search-by-place'],
        borderRadius: !results || results.length == 0 ? '5px' : '5px 5px 0px 0px',
      }}
      onChange={handleSearch}
      value={searchText}
    />
  )
}

export default SearchBox
