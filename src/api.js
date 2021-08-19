import axios from 'axios';

const BASE_URL = 'https://ma62c4x3ej.execute-api.us-east-1.amazonaws.com';
const ENV = 'dev';

export async function searchByTitle(title) {
  const token = getToken();
  const result = await axios.get(`${BASE_URL}/${ENV}/search`, {
    params: { name: title },
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.data.games;
}

export async function getList() {
  const token = getToken();
  const result = await axios.get(`${BASE_URL}/${ENV}/games`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.data.sort((a, b) => b.sortOrder - a.sortOrder);
}

export async function addGameToList(title, boxArt) {
  const token = getToken();
  const result = await axios.post(
    `${BASE_URL}/${ENV}/games`,
    {
      title,
      boxArt,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return result.data;
}

export function signup(email) {
  return axios.post(`${BASE_URL}/${ENV}/signup`, { email });
}

export async function login(magicLink) {
  const result = await axios.post(`${BASE_URL}/${ENV}/login`, { magicLink });
  return result.data;
}

function getToken() {
  const item = window.localStorage.getItem('FOCUS_USER');
  return item ? JSON.parse(item).token : '';
}

export function setupInterceptors(signout) {
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
