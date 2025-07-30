import { ThemeUIProvider } from 'theme-ui'
import '@carbonplan/components/globals.css'
import '@carbonplan/components/fonts.css'
import '@carbonplan/maps/mapbox.css'
import './stylesheet.css'
import theme from '@carbonplan/theme'
import { GoogleAnalytics } from '@next/third-parties/google'

const App = ({ Component, pageProps }) => {
  theme.fonts = {
    body: "ginto-normal",
    faux: "ginto-normal",
    heading: "ginto-normal",
    mono: "ginto-normal",
  }

  return (
    <>
      <ThemeUIProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeUIProvider>

      <GoogleAnalytics gaId="G-4619MS74NJ" />
    </>
  )
}

export default App
