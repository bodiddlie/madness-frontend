import { rest } from 'msw';

import { BASE_URL, ENV } from '../api/helpers';
import { pile, search, userProfiles } from './data';

const usedPile = [...pile];

export const handlers = [
  // LOGIN & SIGNUP HANDLERS
  rest.post(`${BASE_URL}/${ENV}/signup`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post(`${BASE_URL}/${ENV}/login`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ email: 'test@test.com', token: '12345' })
    );
  }),

  // SEARCH HANDLER
  rest.get(`${BASE_URL}/${ENV}/search`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ games: search }));
  }),

  // BULK GAMES HANDLERS
  rest.get(`${BASE_URL}/${ENV}/games`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(pile));
  }),

  // ADD GAME HANDLER
  rest.post(`${BASE_URL}/${ENV}/games`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(req.body));
  }),

  // GET TOP GAME HANDLER
  rest.get(`${BASE_URL}/${ENV}/topgame`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(usedPile.shift()));
  }),

  rest.patch(`${BASE_URL}/${ENV}/games/:id`, (req, res, ctx) => {
    return res(ctx.status(204));
  }),

  rest.delete(`${BASE_URL}/${ENV}/games/:id`, (req, res, ctx) => {
    return res(ctx.status(204));
  }),

  // USER PROFILE HANDLERS
  rest.get(`${BASE_URL}/${ENV}/profile/:email`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userProfiles[req.params.email]));
  }),
];
