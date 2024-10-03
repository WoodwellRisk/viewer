import { Badge, Box, Button, Input, Text, useThemeUI } from 'theme-ui'
import { useEffect, useState } from 'react'

const SearchBoxCoords = (props) => {
  const {setCoordinates} = props

  const { theme } = useThemeUI()

  const [latitudeInput, setLatitudeInput] = useState('')
  const [longitudeInput, setLongitudeInput] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [validLatitude, setValidLatitude] = useState(true)
  const [validLongitude, setValidLongitude] = useState(true)

  const sx = {
    'search-by-latlon-container': {
      ':has(#lon-input:focus)': {
        '#lon-badge': {
          borderColor: 'primary'
        }
      },
      ':has(#lat-input:focus)': {
        '#lat-badge': {
          borderColor: 'primary'
        }
      },
    },
    'search-by-latlon': {
      color: 'primary',
      bg: theme.colors.background,
      border: '2px solid',
      borderLeft: '0px',
      borderColor: 'secondary',
      borderRadius: '0px 5px 5px 0px',
      transition: 'border 0.15s',
      fontSize: [3, 3, 3, 4],
      fontFamily: 'body',
      letterSpacing: 'body',
      lineHeight: [1],
      height: '2rem',
      width: '80%',
      display: 'inline-block',
      p: '3px 5px 5px 5px',
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
    'latlon-badge': {
      color: 'primary',
      bg: theme.colors.background,
      border: '2px solid',
      borderRight: '0px',
      borderColor: 'secondary',
      borderRadius: '5px 0px 0px 5px',
      transition: 'border 0.15s',
      fontSize: [3, 3, 3, 4],
      fontFamily: 'body',
      letterSpacing: 'body',
      lineHeight: [1.0],
      height: '2rem',
      width: '20%',
      pb: '10px',
      pt: '4px',
    },
    'latlon-button': {
      color: 'secondary',
      bg: theme.colors.background,
      border: '2px solid',
      borderColor: 'secondary',
      borderRadius: '5px',
      transition: 'border 0.15s',
      fontSize: [3, 3, 3, 4],
      fontFamily: 'body',
      letterSpacing: 'body',
      lineHeight: [1.0],
      width: '25%',
      height: ['24px', '24px', '24px', '26px'],
      textAlign: 'center',
      pt: ['6px'],
      pb: ['26px'],
      mt: [1],
      float: 'right',
      '&:hover': {
        color: 'primary',
        borderColor: 'primary',
      },
    },
    'warning-box': {
      border: '2px solid',
      borderColor: 'red',
      borderRadius: '5px',
      my: [1],
      p: [1],
      bg: theme.colors.background,
    }
  }

  const handleLatSearch = (event) => {
    setLatitudeInput(event.target.value)
  }

  const handleLonSearch = (event) => {
    setLongitudeInput(event.target.value)
  }

  const handleValidateCoordinates = () => {
    let lat = Number(latitudeInput)
    if (latitudeInput == '' || isNaN(lat) || lat < -90.0 || lat > 90.0) {
      setValidLatitude(false)
    } else {
      setValidLatitude(true)
      setLatitude(latitudeInput)
    }

    let lon = Number(longitudeInput)
    if (longitudeInput == '' || isNaN(lon) || lon < -180.0 || lon > 180.0) {
      setValidLongitude(false)
    } else {
      setValidLongitude(true)
      setLongitude(longitudeInput)
    }
  }

  useEffect(() => {
    if(longitude && latitude) {
      setCoordinates([longitude, latitude])
    }
  }, [latitude, longitude])

  return (
    <Box sx={sx['search-by-latlon-container']}>
      <Badge id={'lat-badge'} sx={sx['latlon-badge']}>
        {'Lat: '}
      </Badge>
      <Input
        id={'lat-input'}
        placeholder='[-90, 90]'
        sx={sx['search-by-latlon']}
        onChange={handleLatSearch}
        value={latitudeInput}
      />
      {!validLatitude && (
        <Box sx={sx['warning-box']}>
          <Text sx={{ color: 'red' }}>Please enter a numeric value between [-90, 90].</Text>
        </Box>
      )}

      <Badge id={'lon-badge'} sx={{ ...sx['latlon-badge'], ...sx['lon-badge'] }}>
        {'Lon: '}
      </Badge>
      <Input
        id={'lon-input'}
        placeholder='[-180, 180]'
        sx={sx['search-by-latlon']}
        onChange={handleLonSearch}
        value={longitudeInput}
      />

      {!validLongitude && (
        <Box sx={sx['warning-box']}>
          <Text sx={{ color: 'red' }}>Please enter a numeric value between [-180, 180].</Text>
        </Box>
      )}

      <Badge sx={sx['latlon-button']} onClick={handleValidateCoordinates}>Search</Badge>
    </Box>
  )
}

export default SearchBoxCoords
