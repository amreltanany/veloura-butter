// GitHub Pages build: set PAGES_BASE=/<repo>/ to get a static export in out/
// served from that sub-path. Without it, this is the normal Next/Vercel build.
const pagesBase = (process.env.PAGES_BASE ?? '').replace(/\/$/, '')

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  ...(pagesBase && {
    output: 'export',
    basePath: pagesBase,
    // Exposed to the client so metadata icon URLs can be prefixed too.
    env: { NEXT_PUBLIC_BASE_PATH: pagesBase },
  }),
}

export default nextConfig
