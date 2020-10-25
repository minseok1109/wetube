import passport from 'passport';
import NaverStrategy from 'passport-naver';
import User from './models/User';
import { naverLoginCallback } from './controllers/userController';
import dotenv from 'dotenv';
dotenv.config();

passport.use(User.createStrategy());

passport.use(
  new NaverStrategy(
    {
      clientID: process.env.NV_ID,
      clientSecret: process.env.NV_SECRET,
      callbackURL: process.env.NV_URL,
    },
    naverLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
