import 'core-js';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser'; // 사용자가 웹사이트로 전달하는 정보들을 검사하는 미들웨어
import passport from 'passport'; // 회원가입과 인증을 해주는 미들웨어
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import userRouter from './Routers/userRouter';
import videoRouter from './Routers/videoRouter';
import globalRouter from './Routers/globalRouter';
import routes from './routes';
import { localsMiddleware } from './middleware';
import './passport';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const CookieStore = MongoStore(session);

app.use(helmet({ contentSecurityPolicy: false })); // 보안을 위한 middleware
app.set('view engine', 'pug');
app.use('/uploads', express.static('uploads'));
app.use('/static', express.static('static'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev')); // 로그를 기록해주는 middleware
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
