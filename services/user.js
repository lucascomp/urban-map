import fetch from 'isomorphic-fetch';

const USER_SERVICE_URL = `${process.env.SERVICE_URBAN_MAP_API_BASE_URL}/user`;

export const getUser = async () => {
  const response = await fetch(USER_SERVICE_URL);
  return response;
};

export const createUser = async (payload) => {
  const response = await fetch(USER_SERVICE_URL, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export const updateUser = async (payload) => {
  const response = await fetch(USER_SERVICE_URL, {
    method: 'PATCH',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export const login = async (payload) => {
  const response = await fetch(`${USER_SERVICE_URL}/login`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export const logout = async () => {
  const response = await fetch(`${USER_SERVICE_URL}/logout`);
  return response;
};
