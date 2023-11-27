import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Space Xapsule - Leading the Space Exploration',
  description: "Now it's your time to explore the immense Space",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-primary-blue`}>{children}</body>
    </html>
  )
}
