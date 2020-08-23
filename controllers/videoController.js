import routes from '../routes';

export const home = (req, res) =>
  res.render('Home', { pageTitle: 'Home' });

export const search = (req, res) => {
  const {
    query: { term: searchBy },
  } = req;
  res.render('search', { pageTitle: 'Search', searchBy});
};

export const videos = (req, res) =>
  res.render('videos', { pageTitle: 'videos' });

export const getUpload = (req, res) =>
  res.render('upload', { pageTitle: 'Upload' });

export const postUpload = (req, res) => {
  const {
    body: { title, file, description },
  } = req;
  //To do: upload and save video
  res.redirect(routes.videoDetail(23456))
};
export const videoDetail = (req, res) => 
  res.render('videoDetail', { pageTitle: 'videoDetail' });
export const editVideo = (req, res) =>
  res.render('editVideo', { pageTitle: 'editVideo' });
export const deleteVideo = (req, res) =>
  res.render('deleteVideo', { pageTitle: 'delete Video' });
