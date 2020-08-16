import 'core-js';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { userRouter } from './router';

const app = express();

const handleHome = (req, res) => res.send('hello from ss');

const handleProfile = (req, res) => res.send('You are on my profile');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet()); // 보안을 위한 middleware
app.use(morgan('dev')); // 로그를 기록해주는 middleware

app.get('/', handleHome);

app.get('/profile', handleProfile);

app.use('/user', userRouter);

export default app;
