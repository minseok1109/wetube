import routes from '../routes';
import User from '../models/User';
import passport from 'passport';

//Join
export const getJoin = (req, res) => {
  res.render('join', { pageTitle: 'Join' });
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
  res.render('login', { pageTitle: 'Log in' });

export const postLogin = passport.authenticate('local', {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

//Github Log in
export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url, name },
  } = profile;
  const { value: email } = profile.emails.filter((item) => item.primary)[0];
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl: avatar_url,
    });
    return cb(null, newUser);
  } catch (error) {
    console.log('error: ', error);
    return cb(error);
  }
};

export const githubLogin = passport.authenticate('github');

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

//Facebook
export const facebookLogin = passport.authenticate('facebook');

export const facebookLoginCallback = (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  console.log(accessToken, refreshToken, profile, cb);
};

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

//Log Out
export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

//Users
export const users = (req, res) => res.render('users', { pageTitle: 'Users' });

// //User Detail
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('videos');
    res.render('userDetail', { pageTitle: `${user.name}`, user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id).populate('videos');
    res.render('userDetail', { pageTitle: `${user.name}`, user });
  } catch (error) {
    // req.flash('error', 'User not found');
    res.redirect(routes.home);
  }
};

//Edit Profile
export const getEditProfile = (req, res) =>
  res.render('editProfile', { pageTitle: 'edit Profile' });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.location : req.user.avatarUrl,
    });
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(routes.editProfile);
  }
};

//Change Password
export const getChangePassword = (req, res) =>
  res.render('changePassword', { pageTitle: 'Change Password' });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(`/users/${routes.changePassword}`);
      return;
    } else {
      await req.user.changePassword(oldPassword, newPassword);
      res.redirect(routes.me);
    }
  } catch (error) {
    res.status(400);
    res.redirect(`/users/${routes.changePassword}`);
  }
};
