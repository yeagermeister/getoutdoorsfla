const { Schema, Types, model } = require('mongoose');

const commentSchema = new Schema({
  commentId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userID: {
    type: String,
    ref: 'Users',
  },
  
  site: {
      type: String,
      ref: 'Site',
  },

});

const Comment = model('Comment', commentSchema);

module.exports = Comment;
