import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: 'Text is required',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  video: {},
});

const model = mongoose.model('Comment', CommentSchema);
export default model;


