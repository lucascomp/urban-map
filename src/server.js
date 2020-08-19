require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const koaConnect = require('koa-connect');
const serve = require('koa-static');
const compression = require('compression');
const next = require('next');
const nextConfig = require('../next.config');

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV !== 'production';

const nextApp = next({ ...nextConfig, dev });
const handle = nextApp.getRequestHandler();

const server = new Koa();
const router = new Router();

server.use(koaConnect(compression()));
server.use(serve('public'));

(async () => {
  await nextApp.prepare();

  router.get('/', async (ctx) => {
    await nextApp.render(ctx.req, ctx.res, '/', ctx.query);
    ctx.respond = false;
  });

  router.get('/forgot-password', async (ctx) => {
    await nextApp.render(ctx.req, ctx.res, '/forgot-password', ctx.query);
    ctx.respond = false;
  });

  router.get('/home', async (ctx) => {
    await nextApp.render(ctx.req, ctx.res, '/home', ctx.query);
    ctx.respond = false;
  });

  router.get('/login', async (ctx) => {
    await nextApp.render(ctx.req, ctx.res, '/login', ctx.query);
    ctx.respond = false;
  });

  router.get('/register-admin', async (ctx) => {
    await nextApp.render(ctx.req, ctx.res, '/register-admin', ctx.query);
    ctx.respond = false;
  });

  router.get('/reset-password', async (ctx) => {
    await nextApp.render(ctx.req, ctx.res, '/reset-password', ctx.query);
    ctx.respond = false;
  });

  router.get('/signup', async (ctx) => {
    await nextApp.render(ctx.req, ctx.res, '/signup', ctx.query);
    ctx.respond = false;
  });

  router.all('(.*)', async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(router.routes());
  // eslint-disable-next-line no-console
  server.listen(PORT, console.log('> Ready!'));
})();
