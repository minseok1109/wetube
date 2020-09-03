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
import { uploadVideo } from '../middleware';

const videoRouter = express.Router();
//UPload
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

//Edit Video
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

//Delete video
videoRouter.get(routes.deleteVideo(), deleteVideo);

//video detail
videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;
