import fetch from 'isomorphic-fetch';

const { SERVICE_URBAN_MAP_API_BASE_URL } = process.env;

const credentials = 'include';
const headers = {
  'Content-Type': 'application/json',
};

const fetchWrapper = async (path, config) => {
  const request = async () => {
    try {
      const url = `${SERVICE_URBAN_MAP_API_BASE_URL}${path}`;

      return await fetch(url, config);
    } catch (error) {
      throw new Error('Não foi possível se conectar ao servidor');
    }
  };

  const res = await request();

  if (res.ok) {
    return res;
  }

  const { message } = await res.json();
  throw new Error(message);
};

const requestWithBody = async (path, body, method) => {
  const config = {
    body: JSON.stringify(body),
    credentials,
    headers,
    method,
  };

  return fetchWrapper(path, config);
};

export const get = async (path) => {
  const config = {
    credentials,
    method: 'GET',
  };

  return fetchWrapper(path, config);
};

export const post = (path, body) => requestWithBody(path, body, 'POST');

export const put = (path, body) => requestWithBody(path, body, 'PUT');
