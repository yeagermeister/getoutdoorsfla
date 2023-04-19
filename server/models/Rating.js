const { Schema, Types, model } = require('mongoose');

const ratingSchema = new Schema({
  ratingId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  rating: {
    type: Number,
    required: true,
    maxlength: 1,
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

const Rating = model('ratings', ratingSchema);

module.exports = Rating;
