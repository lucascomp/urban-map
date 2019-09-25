const withImages = require('next-images');
const withCss = require('@zeit/next-css');
const withOffline = require('next-offline');

const { NODE_ENV } = process.env;
const prod = NODE_ENV === 'production';

const nextConfig = {
  cssModules: true,
  cssLoaderOptions: {
    url: false,
    localIdentName: prod ? 'ums-[hash:base64:5]' : '[name]_[local]-[hash:base64:5]',
  },
  target: 'serverless',
  transformManifest: (manifest) => ['/'].concat(manifest),
  generateInDevMode: true,
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
};

module.exports = withOffline(withImages(withCss(nextConfig)));
