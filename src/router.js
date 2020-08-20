const Router = require('koa-router');
const next = require('next');
const nextConfig = require('../next.config');
const accessibility = require('./controllers/accessibility');
const marker = require('./controllers/marker');
const user = require('./controllers/user');
const { restrictedSession } = require('./middlewares/restrictedSession');

const { NODE_ENV } = process.env;
const dev = NODE_ENV !== 'production';

const nextApp = next({ ...nextConfig, dev });
const handle = nextApp.getRequestHandler();
const router = new Router();

module.exports = async () => {
  await nextApp.prepare();

  /* PAGES */

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

  /* API ROUTES */

  router.post('/api/forgot-password', user.forgotPassword);
  router.get('/api/user', restrictedSession, user.getUser);
  router.post('/api/login', user.login);
  router.get('/api/login/facebook', user.loginWithFacebook);
  router.get('/api/login/facebook/callback', user.loginCallback('facebook'));
  router.get('/api/login/google', user.loginWithGoogle);
  router.get('/api/login/google/callback', user.loginCallback('google'));
  router.get('/api/logout', restrictedSession, user.logout);
  router.post('/api/register-admin', user.registerAdmin);
  router.post('/api/reset-password', user.resetPassword);
  router.put('/api/signup', user.signup);
  router.get('/api/markers', restrictedSession, marker.getAll);
  router.put('/api/markers', restrictedSession, marker.create);
  router.post('/api/markers', restrictedSession, marker.edit);
  router.get('/api/accessibilities', restrictedSession, accessibility.getAll);

  /* DEFAULT */

  router.all('(.*)', async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  return router;
};
