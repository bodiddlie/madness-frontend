import axios from 'axios';

export const BASE_URL =
  'https://ma62c4x3ej.execute-api.us-east-1.amazonaws.com';
export const ENV = 'dev';

export function getAxiosInstance() {
  const options = {
    baseURL: `${BASE_URL}/${ENV}`,
  };
  return axios.create(options);
}
