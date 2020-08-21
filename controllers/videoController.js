import { items } from '../db';

export const home = (req, res) =>
  res.render('Home', { pageTitle: 'Home', items});
  
export const search = (req, res) => {
  const {
    query: { term: searchBy },
  } = req;
  res.render('search', { pageTitle: 'Search', searchBy, items});
};

export const videos = (req, res) =>
  res.render('videos', { pageTitle: 'videos' });
export const upload = (req, res) =>
  res.render('upload', { pageTitle: 'Upload' });
export const videoDetail = (req, res) =>
  res.render('videoDetail', { pageTitle: 'videoDetail' });
export const editVideo = (req, res) =>
  res.render('editVideo', { pageTitle: 'editVideo' });
export const deleteVideo = (req, res) =>
  res.render('deleteVideo', { pageTitle: 'delete Video' });
