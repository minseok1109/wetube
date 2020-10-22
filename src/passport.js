import passport from 'passport';
import GithubStrategy from 'passport-github';
// import FacebookStrategy from 'passport-facebook';
import User from './models/User';
import {
  // facebookLoginCallback,
  githubLoginCallback,
} from './controllers/userController';
import routes from './routes';
import dotenv from 'dotenv';
dotenv.config();

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: process.env.PRODUCTION
        ? `https://calm-scrubland-53159.herokuapp.com/${routes.githubCallback}`
        : `http://localhost${routes.githubCallback}`,
      scope: 'user:email',
    },
    githubLoginCallback
  )
);

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FB_ID,
//       clientSecret: process.env.FB_SECRET,
//       callbackURL: `https://ordinary-robin-4.serverless.social${routes.facebookCallback}`,
//       profileFields: ['id', 'displayName', 'photos', 'email'],
//       scope: ['public_profile', 'email'],
//     },
//     facebookLoginCallback
//   )
// );

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
