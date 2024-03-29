import { signup, login } from './open-endpoints';
import {
  setupInterceptors,
  getUserProfile,
  searchByTitle,
  getList,
  getTopGame,
  addGame,
  completeGame,
  removeGame,
  updateSort,
} from './private-endpoints';

export {
  signup,
  login,
  searchByTitle,
  getList,
  addGame,
  setupInterceptors,
  removeGame,
  getUserProfile,
  getTopGame,
  completeGame,
  updateSort,
};
