const { Schema, Types, model } = require('mongoose');

const commentSchema = new Schema({
  commentId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  Comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
  ],
  site: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Site',
      },
  ],
});

const Comment = model('comments', commentSchema);

module.exports = Comment;
