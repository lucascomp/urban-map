import nextCookies from 'next-cookies';
import jsCookies from 'js-cookie';
import { destroyCookie } from 'nookies';

const { SESSION_COOKIE } = process.env;

export const getAuth = (ctx) => {
  const cookies = nextCookies(ctx);
  const token = cookies[SESSION_COOKIE];

  console.log('SESSION_COOKIE', SESSION_COOKIE);
  console.log('token', token);

  return {
    isLoggedIn: !!token,
  };
};

export const getCookie = (ctx) => (
  ctx && ctx.req && ctx.req.headers ? ctx.req.headers.cookie : undefined
);

export const forceClearSession = (ctx) => {
  if (ctx) {
    destroyCookie(ctx, SESSION_COOKIE);
  } else {
    jsCookies.remove(SESSION_COOKIE);
  }
};
