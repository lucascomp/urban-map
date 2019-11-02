import fetch from 'isomorphic-fetch';

const credentials = 'include';
const headers = {
  'Content-Type': 'application/json',
};

const fetchWrapper = async (url, config) => {
  const request = async () => {
    try {
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

export const get = async (url) => {
  const config = {
    credentials,
    method: 'GET',
  };

  return fetchWrapper(url, config);
};

export const post = async (url, body) => {
  const config = {
    body: JSON.stringify(body),
    credentials,
    headers,
    method: 'POST',
  };

  return fetchWrapper(url, config);
};
