// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'))

import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const config = withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true,
  /** Next.js i18n docs:
   * @see https://nextjs.org/docs/advanced-features/i18n-routing
   * Reference repo for i18n:
   * @see https://github.com/juliusmarminge/t3-i18n
   **/
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
})

export default config
