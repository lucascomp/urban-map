import { get } from '../utils/request';

// eslint-disable-next-line import/prefer-default-export
export const getAccessibilities = async () => {
  const response = await get('/accessibilities');

  return response.json();
};
