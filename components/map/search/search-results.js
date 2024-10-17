// Adapted from Carbonplan's <Input /> component:
// https://github.com/carbonplan/components/blob/main/src/input.js

import { useEffect, useState } from 'react'
import { Box, Text, useThemeUI } from 'theme-ui'

const SearchResults = ({
    results,
    setResults,
    searchText,
    setSearchText,
    setCoordinates,
    setBbox
}) => {

    const { theme } = useThemeUI()
    const [place, setPlace] = useState(null)
    const [lookup, setLookup] = useState(null)

    const sx = {
        'search-container': {
            height: '250px',
            overflow: "hidden",
            overflowY: 'scroll',
        },
        'search-results': {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            minHeight: '50px', // set at ~1/5 the container height
            color: 'primary',
            border: '1px solid',
            borderTop: '0px',
            borderColor: 'primary',
            bg: theme.colors.background,
            transition: 'border 0.15s',
            fontSize: [3, 3, 3, 4],
            fontFamily: 'body',
            letterSpacing: 'body',
            lineHeight: [1.0],
            p: ['5px'],
            ':first-child': {
                borderTop: '1px'
            },
            ':last-child': {
                borderRadius: '0px 0px 5px 5px',
                borderBottom: '1px solid primary',
            },
            ':focus': {
                borderColor: 'primary',
            },
            ':focus-visible': {
                outline: 'none !important',
                background: 'none !important',
            },
            '&:hover': {
                backgroundColor: 'red',
                borderColor: 'primary',
            },
        },
        'result-text': {
            fontSize: [2, 2, 2, 2],
        },
        'label-text': {
            fontStyle: 'italic',
            fontSize: [1]
        }
    }

    const handleResultClick = ((event) => {
        let place = event.target.innerText
        console.log(place)
        setSearchText(place)
        setPlace(place)
        setLookup(results.filter(result => result[0] == place)[0][1])
        setResults([])
    })

    useEffect(() => {
        if (place && lookup) {
            console.log(place, lookup)
            fetch(`https://storage.googleapis.com/risk-maps/search/${lookup}.geojson`)
                .then((response) => response.json())
                .then((json) => {
                    let filtered = json.features.filter(feature => feature.properties.NAME == searchText)[0];
                    if (filtered.geometry != null && filtered.geometry.type == 'Point') {
                        let coords = filtered.geometry.coordinates
                        setCoordinates(coords)
                    } else {
                        setBbox(filtered.properties.bbox)
                    }
                })
        }
    }, [place, lookup])

    return (
        <Box>
            {results.length == 0 ?
                <Box></Box>
                :
                <Box sx={sx['search-container']}>
                    {
                        results.map((result, index) => {
                            return (
                                <Box key={index} sx={sx['search-results']} >
                                    <Box onClick={handleResultClick}>
                                        <Text sx={sx['result-text']}>{result[0]}</Text>
                                    </Box>
                                    <Box>
                                        <Text sx={sx['label-text']}>
                                            {
                                                result[1] == 'cities' ? 'city' :
                                                    result[1] == 'counties' ? 'county' :
                                                        result[1] == 'states' ? 'state' :
                                                            result[1] == 'countries' ? 'country' :
                                                                result[1] == 'regions' ? 'region' :
                                                                    'lake'
                                            }
                                        </Text>
                                    </Box>
                                </Box>
                            )
                        })
                    }
                </Box>
            }
        </Box>
    )
}

export default SearchResults