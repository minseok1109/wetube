import routes from '../routes';

export const getJoin = (req, res) => {
  res.render('Join', { pageTitle: 'Join' });
};

export const postJoin = (req, res) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render('Join', { pageTitle: 'Join' });
  } else {
    res.redirect(routes.home);
  }
};

export const getLogin = (req, res) =>
  res.render('Login', { pageTitle: 'Log in' });
export const postLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  res.redirect(routes.home);
};
export const users = (req, res) => res.render('users', { pageTitle: 'Users' });
export const userDetail = (req, res) =>
  res.render('userDetail', { pageTitle: 'user Detail' });
export const editProfile = (req, res) =>
  res.render('editProfile', { pageTitle: 'edit Profile' });
export const changePassword = (req, res) =>
  res.render('changePassword', { pageTitle: 'Change Password' });
