require('dotenv').config();

const { promisify } = require('util');
const express = require('express');
const cookieParser = require('cookie-parser');
const nextApp = require('next');
const compression = require('compression');
const nextConfig = require('../next.config');

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV !== 'production';

const app = nextApp({ ...nextConfig, dev });
const handle = app.getRequestHandler();

(async () => {
  const server = express();

  server
    .use(compression())
    .use(cookieParser())
    .use(express.static('public'));

  if (dev) {
    server.get('/_next/*', handle);
  }

  server
    .get('/forgot-password', handle)
    .get('/home', handle)
    .get('/login', handle)
    .get('/register-admin', handle)
    .get('/reset-password', handle)
    .get('/signup', handle);

  await app.prepare();
  await promisify(server.listen.bind(server))(PORT);
})();
