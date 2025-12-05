import React from 'react'
import Head from 'next/head'
import { useThemeUI } from 'theme-ui'

export default function Meta() {
  const { theme, colorMode } = useThemeUI()

  const title = 'Climate risk data viewer'
  const description = 'Woodwell climate risk data viewer'
  const imageUrl = 'https://storage.googleapis.com/risk-maps/media/woodwell-logo.png'
  const url = 'https://www.woodwellclimate.org/research-area/risk/'

  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      {url && <link rel='canonical' href={url} />}
      <link rel='icon' type='image/svg+xml' href={imageUrl}/>
      <meta name='theme-color' content={theme.colors.background} />
      <meta name='color-scheme' content={colorMode === 'light' ? 'light' : 'dark'} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={imageUrl} />
      <meta property='og:url' content={url} />
      <meta name='format-detection' content='telephone=no' />
    </Head>
  )
}