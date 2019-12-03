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

const requestWithBody = async (url, body, method) => {
  const config = {
    body: JSON.stringify(body),
    credentials,
    headers,
    method,
  };

  return fetchWrapper(url, config);
};

export const get = async (url) => {
  const config = {
    credentials,
    method: 'GET',
  };

  return fetchWrapper(url, config);
};

export const post = (url, body) => requestWithBody(url, body, 'POST');

export const put = (url, body) => requestWithBody(url, body, 'PUT');
