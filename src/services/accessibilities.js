import { get } from '../utils/request';

// eslint-disable-next-line import/prefer-default-export
export const getAccessibilities = async ({ cookie }) => {
  const response = await get('/api/accessibilities', { cookie });

  return response.json();
};
