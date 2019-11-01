import nextCookies from 'next-cookies';
import jsCookies from 'js-cookie';

const { SESSION_COOKIE } = process.env;

export const getAuth = (ctx) => {
  const cookies = nextCookies(ctx);
  const token = cookies[SESSION_COOKIE];

  return {
    isLoggedIn: !!token,
  };
};

export const forceClearSession = () => {
  jsCookies.remove(SESSION_COOKIE);
};
