import '../styles/theme.less'
import '../styles/globals.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import React, { useEffect, useState } from 'react'

import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  useEffect(() => {
    // require('../styles/themeDark.less')
    // require('../styles/theme.less')
  }, [])
  return getLayout(
    <>
      <Component {...pageProps} />
    </>
  )
}
