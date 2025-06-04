import { ThemeUIProvider } from 'theme-ui'
import '@carbonplan/components/globals.css'
import '@carbonplan/components/fonts.css'
import '@carbonplan/maps/mapbox.css'
// import './stylesheet.css'
import theme from '@carbonplan/theme'
import Script from 'next/script';

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
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-4619MS74NJ"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-4619MS74NJ');
        `}
      </Script>

      <ThemeUIProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeUIProvider>
    </>
  )
}

export default App
