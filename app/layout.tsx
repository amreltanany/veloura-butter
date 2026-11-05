import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { SmoothScroll } from '@/components/smooth-scroll'
import './globals.css'

// "" normally; "/<repo>" on the GitHub Pages build. Metadata URLs are not
// prefixed by basePath automatically, so icons need it added by hand.
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const description = 'Thoughtful cakes, flaky pastries, and tiny moments of joy, baked fresh in our neighborhood kitchen.'
// Shown when the link is shared (WhatsApp, Facebook, X…): the hero cake photo.
const previewImage = {
  url: 'https://images.unsplash.com/photo-1559620192-032c4bc4674e?auto=format&fit=crop&w=1200&h=630&q=85',
  width: 1200,
  height: 630,
  alt: 'A berry cream cake from VÈLÔURÁ',
}

export const metadata: Metadata = {
  title: 'VÈLÔURÁ — Small-batch bakery',
  description,
  authors: [{ name: 'VÈLÔURÁ' }],
  openGraph: {
    title: 'VÈLÔURÁ — Small-batch bakery',
    description,
    siteName: 'VÈLÔURÁ',
    type: 'website',
    images: [previewImage],
  },
  twitter: { card: 'summary_large_image', images: [previewImage.url] },
  icons: {
    icon: [
      { url: `${base}/icon.svg`, type: 'image/svg+xml' },
      { url: `${base}/icon-32.png`, type: 'image/png', sizes: '32x32' },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SmoothScroll />
        {children}
        {/* Vercel Analytics only works when hosted on Vercel; on GitHub Pages it just errors. */}
        {process.env.NODE_ENV === 'production' && !base && <Analytics />}
      </body>
    </html>
  )
}
