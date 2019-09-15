const express = require('express');
const next = require('next');
const nextConfig = require('./next.config');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ ...nextConfig, dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('*', (req, res) => handle(req, res));

    server.listen(3000, (err) => {
      if (err) {
        throw err;
      }
      // eslint-disable-next-line no-console
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    // eslint-disable-next-line no-console
    console.error(ex.stack);
    process.exit(1);
  });
