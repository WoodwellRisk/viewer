import { ThemeUIProvider } from 'theme-ui'
import '@carbonplan/components/globals.css'
import '@carbonplan/components/fonts.css'
import '@carbonplan/maps/mapbox.css'
import theme from '@carbonplan/theme'

const App = ({ Component, pageProps }) => {
  return (
    <ThemeUIProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeUIProvider>
  )
}

export default App
