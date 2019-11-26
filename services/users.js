import { get, post } from '../utils/request';
import { forceClearSession } from '../utils/auth';

const { SERVICE_URBAN_MAP_API_BASE_URL } = process.env;

export const login = ({ email, password }) => {
  const url = `${SERVICE_URBAN_MAP_API_BASE_URL}/login`;

  return post(url, { email, password });
};

export const logout = async () => {
  const url = `${SERVICE_URBAN_MAP_API_BASE_URL}/logout`;
  const res = await get(url);

  if (!res.ok) {
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
