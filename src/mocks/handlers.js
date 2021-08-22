import { rest } from 'msw';

import { BASE_URL, ENV } from '../api/helpers';
import { pile, search } from './data';

export const handlers = [
  rest.post(`${BASE_URL}/${ENV}/signup`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post(`${BASE_URL}/${ENV}/login`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ email: 'test@test.com', token: '12345' })
    );
  }),

  rest.get(`${BASE_URL}/${ENV}/games`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(pile));
  }),

  rest.get(`${BASE_URL}/${ENV}/search`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ games: search }));
  }),

  rest.post(`${BASE_URL}/${ENV}/games`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(req.body));
  }),

  rest.delete(`${BASE_URL}/${ENV}/games/:id`, (req, res, ctx) => {
    return res(ctx.status(204));
  }),
];
