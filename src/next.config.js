const withImages = require('next-images');
const withCss = require('@zeit/next-css');

const { NODE_ENV } = process.env;
const prod = NODE_ENV === 'production';

const nextConfig = {
  dir: './src',
  distDir: '../build',
  cssModules: true,
  cssLoaderOptions: {
    url: false,
    localIdentName: prod ? 'ums-[hash:base64:5]' : '[name]_[local]-[hash:base64:5]',
  },
};

module.exports = withImages(withCss(nextConfig));
