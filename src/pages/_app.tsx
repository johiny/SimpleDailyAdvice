import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import Loader from '@/components/Loader'

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleComplete = () => setLoading(false)

    Router.events.on('routeChangeStart', handleStart)
    Router.events.on('routeChangeComplete', handleComplete)
    Router.events.on('routeChangeError', handleComplete)

    return () => {
      Router.events.off('routeChangeStart', handleStart)
      Router.events.off('routeChangeComplete', handleComplete)
      Router.events.off('routeChangeError', handleComplete)
    }
  }, [])

  return (
  <>
  {loading && <Loader />}
  <Component {...pageProps} />
  </>
  )
}
