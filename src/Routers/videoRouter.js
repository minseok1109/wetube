import express from 'express';
import routes from '../routes';
import {
  videoDetail,
  deleteVideo,
  getUpload,
  postUpload,
  getEditVideo,
  postEditVideo,
} from '../controllers/videoController';
import { uploadVideo, onlyPrivate } from '../middleware';

const videoRouter = express.Router();

//UPload
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

//Edit Video
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

//Delete video
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

//video detail
videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;
