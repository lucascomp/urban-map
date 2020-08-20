require('dotenv').config();
require('./auth');

const Koa = require('koa');
const cors = require('kcors');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
const koaConnect = require('koa-connect');
const koaStatic = require('koa-static');
const session = require('koa-generic-session');
const passport = require('koa-passport');
const compression = require('compression');
const { errorHandler } = require('./middlewares/errorHandler');
const routerFactory = require('./router');

const { APP_KEYS, PORT, SESSION_COOKIE } = process.env;

(async () => {
  const server = new Koa();
  const router = await routerFactory();

  server.proxy = true;
  server.keys = APP_KEYS.split(',');

  if (server.env === 'development') {
    server.use(logger());
  }

  server
    .use(errorHandler)
    .use(koaConnect(compression()))
    .use(koaStatic('public'))
    .use(cors({
      allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS'],
      credentials: true,
    }))
    .use(session({
      key: SESSION_COOKIE,
      httpOnly: false,
    }))
    .use(bodyparser())
    .use(passport.initialize())
    .use(passport.session())
    .use(async (ctx, next) => {
      ctx.res.statusCode = 200;
      await next();
    })
    .use(router.routes());

  // eslint-disable-next-line no-console
  server.listen(PORT, console.log('> Ready!'));
})();
