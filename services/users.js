import { forceClearSession } from '../utils/auth';
import { get, post, put } from '../utils/request';
import redirect from '../utils/router';

const { SERVICE_URBAN_MAP_API_BASE_URL } = process.env;

export const forgotPassword = ({ email }) => {
  const path = '/forgot-password';

  return post(path, { email });
};

export const login = ({ email, password }) => {
  const path = '/login';

  return post(path, { email, password });
};

const loginWithProvider = ({ provider }) => {
  redirect(`${SERVICE_URBAN_MAP_API_BASE_URL}/login/${provider}`);
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
  const path = '/logout';

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

export const resetPassword = ({ token, password }) => {
  const path = '/reset-password';

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
  const path = '/signup';

  return put(path, {
    firstName,
    lastName,
    email,
    password,
  });
};
