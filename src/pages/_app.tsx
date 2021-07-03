import { AppProps } from 'next/app'

import "../styles/all.scss"

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
