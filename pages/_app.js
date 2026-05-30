import { useEffect } from 'react'
import { useRouter } from 'next/router'
import '../styles/globals.css'

const GA_ID = 'G-3ME09W09ZD' 

function gtag(...args) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(args)
}

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const script1 = document.createElement('script')
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    script1.async = true
    document.head.appendChild(script1)

    window.dataLayer = window.dataLayer || []
    gtag('js', new Date())
    gtag('config', GA_ID)

    const handleRouteChange = (url) => {
      gtag('config', GA_ID, { page_path: url })
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  return <Component {...pageProps} />
}