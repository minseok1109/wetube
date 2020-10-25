import express from 'express';
import routes from '../routes';
import { home, search } from '../controllers/videoController';
import {
  postJoin,
  getJoin,
  getLogin,
  logout,
  postLogin,
  githubLogin,
  postGithubLogin,
  naverLogin,
  postNaverLogin,
  getMe,
} from '../controllers/userController';
import { onlyPublic, onlyPrivate } from '../middleware';
import passport from 'passport';

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.home, home);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

//github
globalRouter.get(routes.github, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate('github', { failureRedirect: '/login' }),
  postGithubLogin
);
globalRouter.get(routes.me, getMe);

//naver
globalRouter.get(routes.naver, naverLogin);
globalRouter.get(
  routes.naver,
  passport.authenticate('naver', { failureRedirect: '/login' }),
  postNaverLogin
);

export default globalRouter;
