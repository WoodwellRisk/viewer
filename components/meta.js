import React from 'react'
import Head from 'next/head'
import { useThemeUI } from 'theme-ui'

const Meta = ({ title, description, card, url }) => {
  const { theme, colorMode } = useThemeUI()
  if (!description) {
    console.warn(
      'a custom description should be used for search engine optimization'
    )
  }
  if (!title) {
    console.warn('a custom title should be used for search engine optimization')
  }
  const titleProp = title || 'Woodwell Risk'
  const descriptionProp =
    description ||
    'Woodwell Risk data viewer'
  const cardProp = card || 'https://storage.googleapis.com/risk-maps/media/woodwell-risk.png'
  const urlProp = url || 'https://www.woodwellclimate.org/research-area/risk/'

  return (
    <Head>
      <title>{titleProp}</title>
      <meta name='description' content={descriptionProp} />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      {url && <link rel='canonical' href={url} />}
      <link
        rel='alternate icon'
        type='image/png'
        href='https://storage.googleapis.com/risk-maps/media/woodwell-risk.png'
      />
      <link
        rel='icon'
        type='image/svg+xml'
        href='https://storage.googleapis.com/risk-maps/media/woodwell-risk.png'
      />
      <link
        rel='preload'
        href='https://fonts.carbonplan.org/relative/relative-book-pro.woff2'
        as='font'
        type='font/woff2'
        crossOrigin='anonymous'
      />
      <link
        rel='preload'
        href='https://fonts.carbonplan.org/relative/relative-medium-pro.woff2'
        as='font'
        type='font/woff2'
        crossOrigin='anonymous'
      />
      <link
        rel='preload'
        href='https://fonts.carbonplan.org/relative/relative-mono-11-pitch-pro.woff2'
        as='font'
        type='font/woff2'
        crossOrigin='anonymous'
      />
      <link
        rel='preload'
        href='https://fonts.carbonplan.org/relative/relative-faux-book-pro.woff2'
        as='font'
        type='font/woff2'
        crossOrigin='anonymous'
      />
      <meta name='theme-color' content={theme.colors.background} />
      <meta
        name='color-scheme'
        content={colorMode === 'light' ? 'light' : 'dark'}
      />
      <meta property='og:title' content={titleProp} />
      <meta property='og:description' content={descriptionProp} />
      <meta property='og:image' content={cardProp} />
      <meta property='og:url' content={urlProp} />
      <meta name='format-detection' content='telephone=no' />
    </Head>
  )
}

export default Meta