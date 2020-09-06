import routes from '../routes';
import User from '../models/User';
import passport from 'passport';

//Join
export const getJoin = (req, res) => {
  res.render('Join', { pageTitle: 'Join' });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;

  if (password !== password2) {
    res.status(400);
    res.render('Join', { pageTitle: 'Join' });
  } else {
    try {
      const user = await User({ name, email });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log('error: ', error);
      res.redirect(routes.home);
    }
  }
};

//Log In
export const getLogin = (req, res) =>
  res.render('Login', { pageTitle: 'Log in' });

export const postLogin = passport.authenticate('local', {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

//Log Out
export const logout = (req, res) => {
  res.redirect(routes.home);
};

//Users
export const users = (req, res) => res.render('users', { pageTitle: 'Users' });

//User Detail
export const userDetail = (req, res) =>
  res.render('userDetail', { pageTitle: 'user Detail' });

//Edit Profile
export const editProfile = (req, res) =>
  res.render('editProfile', { pageTitle: 'edit Profile' });

//Change Password
export const changePassword = (req, res) =>
  res.render('changePassword', { pageTitle: 'Change Password' });
