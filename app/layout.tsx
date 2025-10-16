import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chat App',
  description: 'Chat application',
  icons: {
    icon: '/favicon.ico',  // ✅ Esto apunta a /public/favicon.ico
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}