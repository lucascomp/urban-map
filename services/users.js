import { get, post, put } from '../utils/request';
import { forceClearSession } from '../utils/auth';

const { SERVICE_URBAN_MAP_API_BASE_URL } = process.env;

/* global window */

export const forgotPassword = async ({ email }) => {
  const url = `${SERVICE_URBAN_MAP_API_BASE_URL}/forgot-password`;

  return post(url, { email });
};

export const login = ({ email, password }) => {
  const url = `${SERVICE_URBAN_MAP_API_BASE_URL}/login`;

  return post(url, { email, password });
};

const loginWithProvider = ({ provider }) => {
  window.location.replace(`${SERVICE_URBAN_MAP_API_BASE_URL}/login/${provider}`);
};

export const loginWithFacebook = () => {
  const provider = 'facebook';

  loginWithProvider({ provider });
};

export const loginWithGoogle = () => {
  const provider = 'google';

  loginWithProvider({ provider });
};

export const logout = async () => {
  const url = `${SERVICE_URBAN_MAP_API_BASE_URL}/logout`;

  try {
    const res = await get(url);

    if (!res.ok) {
      const message = await res.text();
      throw new Error(message);
    }
  } catch (error) {
    forceClearSession();
  }
};

export const resetPassword = async ({ token, password }) => {
  const url = `${SERVICE_URBAN_MAP_API_BASE_URL}/reset-password`;

  return post(url, {
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
  const url = `${SERVICE_URBAN_MAP_API_BASE_URL}/signup`;

  return put(url, {
    firstName,
    lastName,
    email,
    password,
  });
};
