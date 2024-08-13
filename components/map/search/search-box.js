import { Input, useThemeUI } from 'theme-ui'

// Adapted from Carbonplan's <Input /> component:
// https://github.com/carbonplan/components/blob/main/src/input.js
const SearchBox = (props) => {
  const { placeholder, onSearch, text, results } = props
  const { theme } = useThemeUI()

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
    }
  }

  return (
    <Input
      placeholder={placeholder}
      sx={{
        ...sx['search-by-place'],
        borderRadius: !results || results.length == 0 ? '5px' : '5px 5px 0px 0px',
      }}
      onChange={onSearch}
      value={text}
    />
  )
}

export default SearchBox
