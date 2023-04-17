import { Poppins } from 'next/font/google'
import '@/styles/globals.css'

const poppins = Poppins({ weight: '400', subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <main className={poppins.className}>
      <Component {...pageProps} />
    </main>
  )
}
