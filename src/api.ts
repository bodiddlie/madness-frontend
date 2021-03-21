import axios from 'axios';
import { Game } from './types';

const SEARCH_URL = 'https://xxpcy6r8oe.execute-api.us-east-1.amazonaws.com/dev/search';

export async function searchByTitle(title: String): Promise<Array<Game>> {
  const result = await axios.get(SEARCH_URL, {params: {name: title}});
  return result.data.games;
}