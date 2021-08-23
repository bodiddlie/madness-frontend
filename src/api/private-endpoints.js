import { getAxiosInstance } from './helpers';

const instance = getAxiosInstance();

export async function searchByTitle(title) {
  const result = await instance.get('/search', {
    params: { name: title },
  });
  return result.data.games;
}

export async function getList() {
  const result = await instance.get('/games');
  return result.data.sort((a, b) => b.sortOrder - a.sortOrder);
}

export async function getUserProfile() {
  const result = await instance.get(`/profile`);
  return result.data;
}

export async function getTopGame() {
  const result = await instance.get('/topgame');
  return result.data;
}

export async function addGame(id, title, boxArt, description) {
  const result = await instance.post('/games', {
    id,
    title,
    boxArt,
    description,
  });
  return result.data;
}

export async function completeGame(id) {
  await instance.patch(`/games/${id}`, { complete: true });
  return;
}

export async function removeGame(id) {
  await instance.delete(`/games/${id}`);
  return;
}

function getToken() {
  const storageItem = window.localStorage.getItem('FOCUS_USER');
  return storageItem ? JSON.parse(storageItem).token : '';
}

export function setupInterceptors(signout) {
  instance.interceptors.request.use((config) => {
    const token = getToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  instance.interceptors.response.use(
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
