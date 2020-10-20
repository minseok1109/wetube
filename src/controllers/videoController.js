import routes from '../routes';
import Video from '../models/Video';
import Comment from '../models/comment';
//Home
export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render('home', { pageTitle: 'Home', videos });
  } catch (error) {
    res.render('home', { pageTitle: 'Home', videos: [] });
  }
};

//Search
export const search = async (req, res) => {
  const {
    query: { term: searchBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({ title: { $regex: searchBy, $options: 'i' } });
    res.render('search', { pageTitle: 'Search', searchBy, videos });
  } catch (error) {
    console.log(error);
  }
};

//Videos
export const videos = (req, res) =>
  res.render('videos', { pageTitle: 'videos' });

//UPload
export const getUpload = (req, res) =>
  res.render('upload', { pageTitle: 'Upload' });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { location },
  } = req;
  const newVideo = await Video.create({
    fileUrl: location,
    title,
    description,
    creator: req.user.id,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

//Video Detail
export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id)
      .populate('creator')
      .populate('comments');
    res.render('videoDetail', {
      pageTitle: `${video.title}`,
      video,
    });
  } catch (error) {
    console.log('error: ', error);
    res.redirect(routes.home);
  }
};

//Edit Video
export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id).populate('creator');
    if (video.creator.id !== req.user.id) {
      throw Error();
    } else {
      res.render('editVideo', { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

//Delete Video
export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id).populate('creator');
    if (video.creator.id !== req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndDelete({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

//Register video view

export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.statusCode(400);
  } finally {
    res.end();
  }
};

//add Comment
export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    video.comments.push(newComment.id);
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

//delete Comment
export const postDeleteComment = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Comment.findOneAndDelete({ _id: id });
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
