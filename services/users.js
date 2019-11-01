import fetch from 'isomorphic-fetch';
import { forceClearSession } from '../utils/auth';

const { SERVICE_URBAN_MAP_API_BASE_URL } = process.env;

export const login = async ({ email, password }) => {
  const url = `${SERVICE_URBAN_MAP_API_BASE_URL}/login`;
  const config = {
    body: JSON.stringify({ email, password }),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  };

  const res = await fetch(url, config);

  if (!res.ok) {
    throw new Error('E-mail e/ou senha incorretos');
  }
};

export const logout = async () => {
  const url = `${SERVICE_URBAN_MAP_API_BASE_URL}/logout`;
  const config = {
    credentials: 'include',
    method: 'GET',
  };

  const res = await fetch(url, config);

  if (!res.ok) {
    forceClearSession();
  }
};
