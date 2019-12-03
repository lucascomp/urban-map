import { get, post, put } from '../utils/request';
import { forceClearSession } from '../utils/auth';

const { SERVICE_URBAN_MAP_API_BASE_URL } = process.env;

export const login = ({ email, password }) => {
  const url = `${SERVICE_URBAN_MAP_API_BASE_URL}/login`;

  return post(url, { email, password });
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
