import { forceClearSession } from '../utils/auth';
import { get, post, put } from '../utils/request';

/* global window */

export const forgotPassword = ({ email }) => {
  const path = '/api/forgot-password';

  return post(path, { email });
};

export const getUser = async ({ cookie } = {}) => {
  const response = await get('/api/user', { cookie });

  return response.json();
};

export const login = ({ email, password }) => {
  const path = '/api/login';

  return post(path, { email, password });
};

const loginWithProvider = ({ provider }) => {
  window.location = `/api/login/${provider}`;
};

export const loginWithFacebook = () => {
  const provider = 'facebook';

  loginWithProvider({ provider });
};

export const loginWithGoogle = () => {
  const provider = 'google';

  loginWithProvider({ provider });
};

export const logout = async ({ cookie } = {}) => {
  const path = '/api/logout';

  try {
    const res = await get(path, { cookie });

    if (!res.ok) {
      const message = await res.text();
      throw new Error(message);
    }
  } catch (error) {
    forceClearSession();
  }
};

export const registerAdmin = ({
  email,
  firstName,
  lastName,
  password,
}) => post('/api/register-admin', {
  email,
  firstName,
  lastName,
  password,
});

export const resetPassword = ({ token, password }) => {
  const path = '/api/reset-password';

  return post(path, {
    token,
    password,
  });
};

export const signup = ({
  firstName,
  lastName,
  email,
  password,
}) => {
  const path = '/api/signup';

  return put(path, {
    firstName,
    lastName,
    email,
    password,
  });
};
