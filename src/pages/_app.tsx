import { Toaster } from 'react-hot-toast'

import '#/styles/globals.css'
import type { AppProps } from 'next/app'

const App = (props: AppProps) => {
  const { Component, pageProps } = props

  return (
    <>
      <Toaster />
      <Component {...pageProps} />
    </>
  )
}

export default App
