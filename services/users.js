import { get, post } from '../utils/request';
import { forceClearSession } from '../utils/auth';

const { SERVICE_URBAN_MAP_API_BASE_URL } = process.env;

export const login = async ({ email, password }) => {
  const url = `${SERVICE_URBAN_MAP_API_BASE_URL}/login`;
  const res = await post(url, { email, password });

  if (!res.ok) {
    throw new Error('E-mail e/ou senha incorretos');
  }
};

export const logout = async () => {
  const url = `${SERVICE_URBAN_MAP_API_BASE_URL}/logout`;
  const res = await get(url);

  if (!res.ok) {
    forceClearSession();
  }
};

export const signup = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  const url = `${SERVICE_URBAN_MAP_API_BASE_URL}/signup`;
  const res = await post(url, {
    firstName,
    lastName,
    email,
    password,
  });

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message);
  }
};
