import axios from 'axios';
import { Entry, Game } from './types';

const SEARCH_URL = 'https://xxpcy6r8oe.execute-api.us-east-1.amazonaws.com/dev/search';
const ADD_URL = 'https://xxpcy6r8oe.execute-api.us-east-1.amazonaws.com/dev/games';

export async function searchByTitle(title: String): Promise<Array<Game>> {
  const result = await axios.get(SEARCH_URL, {params: {name: title}});
  return result.data.games;
}

export async function addGameToList(title: String): Promise<Entry> {
  const result = await axios.post(ADD_URL, {title});
  return result.data;
}