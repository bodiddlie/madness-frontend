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

export async function addGameToList(id, title, boxArt) {
  const result = await instance.post('/games', {
    id,
    title,
    boxArt,
  });
  return result.data;
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
