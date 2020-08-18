require('dotenv').config();

const withImages = require('next-images');
const withCss = require('@zeit/next-css');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const { version } = require('./package.json');

const { NODE_ENV } = process.env;
const prod = NODE_ENV === 'production';

const nextConfig = {
  dir: './src',
  generateBuildId: () => Promise.resolve(version),
  webpack: ({ plugins, ...rest }) => {
    const dotenv = new Dotenv({
      path: path.join(__dirname, '.env'),
      systemvars: true,
    });

    return {
      ...rest,
      plugins: [
        ...plugins,
        dotenv,
      ],
    };
  },
  cssModules: true,
  cssLoaderOptions: {
    url: false,
    localIdentName: prod ? 'ums-[hash:base64:5]' : '[name]_[local]-[hash:base64:5]',
  },
};

module.exports = withImages(withCss(nextConfig));
