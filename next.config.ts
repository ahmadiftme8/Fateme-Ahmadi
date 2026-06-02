import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(); // auto-detects i18n/request.ts

const nextConfig = {
  turbopack: {}, // good for dev with --turbo
  images: {
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'ik.imagekit.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https' as const,
        hostname: 'cdn.dribbble.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
};

export default withNextIntl(nextConfig);


