import { Urbanist } from 'next/font/google'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
// import ModalProvider from '@/providers/modal-provider'
import ToastProvider from '@/providers/toast-provider'

import './globals.css'

const font = Urbanist({ subsets: ['latin'] })

export const metadata = {
  title: 'Store',
  description: 'Store front end for clients',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider />
        {/* <ModalProvider /> */}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}