import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const font = Inter({
  weight: ['400'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'IOT Health Monitor',
  description: 'Metrics for health related data of IOT devices',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={font.className}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
