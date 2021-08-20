import { getAxiosInstance } from './helpers';

export function signup(email) {
  return getAxiosInstance().post('/signup', { email });
}

export async function login(magicLink) {
  const result = await getAxiosInstance().post('/login', { magicLink });
  return result.data;
}
