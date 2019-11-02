import fetch from 'isomorphic-fetch';

const credentials = 'include';
const headers = {
  'Content-Type': 'application/json',
};

const fetchWrapper = async (url, config) => {
  try {
    return await fetch(url, config);
  } catch (error) {
    throw new Error('Não foi possível se conectar ao servidor');
  }
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
