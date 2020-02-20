import fetch from 'isomorphic-fetch';

const { SERVICE_URBAN_MAP_API_BASE_URL } = process.env;

const credentials = 'include';

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

  const error = await res.json();

  throw error;
};

const requestWithBody = async (method, path, body, headers) => {
  const config = {
    body: JSON.stringify(body),
    credentials,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    method,
  };

  return fetchWrapper(path, config);
};

export const get = async (path, headers) => {
  const config = {
    credentials,
    method: 'GET',
    headers,
  };

  return fetchWrapper(path, config);
};

export const post = (path, body, headers) => requestWithBody('POST', path, body, headers);

export const put = (path, body, headers) => requestWithBody('PUT', path, body, headers);
