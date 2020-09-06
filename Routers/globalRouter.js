import express from 'express';
import routes from '../routes';
import { home, search } from '../controllers/videoController';
import {
  postJoin,
  getJoin,
  getLogin,
  logout,
  postLogin,
} from '../controllers/userController';
import { onlyPublic } from '../middleware';

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.home, home);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

export default globalRouter;
