import axios from 'axios';
import { Entry, Game } from './types';

const BASE_URL = 'https://ma62c4x3ej.execute-api.us-east-1.amazonaws.com';
const ENV = 'dev';

export async function searchByTitle(title: String): Promise<Array<Game>> {
  const token = getToken();
  const result = await axios.get(`${BASE_URL}/${ENV}/search`, {
    params: { name: title },
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.data.games;
}

export async function addGameToList(title: String): Promise<Entry> {
  const result = await axios.post(`${BASE_URL}/${ENV}/games`, { title });
  return result.data;
}

export function signup(email: String): Promise<void> {
  return axios.post(`${BASE_URL}/${ENV}/signup`, { email });
}

export async function login(magicLink: String): Promise<string> {
  const result = await axios.post(`${BASE_URL}/${ENV}/login`, { magicLink });
  return result.data;
}

function getToken(): String {
  const item = window.localStorage.getItem('FOCUS_USER');
  return item ? JSON.parse(item).token : '';
}

export function setupInterceptors(signout: () => void) {
  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      const { status } = err.response;

      if (status === 401) {
        signout();
      }
      return Promise.reject(err);
    }
  );
}
