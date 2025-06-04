import { ThemeUIProvider } from 'theme-ui'
import '@carbonplan/components/globals.css'
import '@carbonplan/components/fonts.css'
import '@carbonplan/maps/mapbox.css'
// import './stylesheet.css'
import theme from '@carbonplan/theme'
import { GoogleAnalytics } from '@next/third-parties/google'

const App = ({ Component, pageProps }) => {
  // console.log(theme)

  // theme.fonts = {
  //   body: "ginto-normal relative-book-pro, Roboto, system-ui, -apple-system, BlinkMacSystemFont",
  //   faux: "ginto-normal relative-faux-book-pro, Roboto, system-ui, -apple-system, BlinkMacSystemFont",
  //   heading: "ginto-normal relative-medium-pro, Roboto, system-ui, -apple-system, BlinkMacSystemFont",
  //   mono: "ginto-normal relative-mono-11-pitch-pro, Menlo, monospace",
  // }

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
