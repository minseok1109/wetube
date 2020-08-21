export const join = (req, res) => res.render('Join', { pageTitle: 'Join' });
export const login = (req, res) => res.render('Login', { pageTitle: 'Log in' });
export const logout = (req, res) =>
  res.render('Logout', { pageTitle: 'Log out' });
export const users = (req, res) => res.render('users', { pageTitle: 'Users' });
export const userDetail = (req, res) =>
  res.render('userDetail', { pageTitle: 'user Detail' });
export const editProfile = (req, res) =>
  res.render('editProfile', { pageTitle: 'edit Profile' });
export const changePassword = (req, res) =>
  res.render('changePassword', { pageTitle: 'Change Password' });
