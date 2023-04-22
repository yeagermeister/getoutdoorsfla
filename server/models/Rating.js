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

// Add virtual for average rating per site
ratingSchema.virtual('averageRating').get(function () {
  return Rating.aggregate([
    { $match: { site: this.site } },
    { $group: { _id: null, average: { $avg: '$rating' } } },
  ])
    .then((result) => {
      return result[0].average;
    })
    .catch((err) => {
      console.error(err);
    });
});

const Rating = model('Rating', ratingSchema);

module.exports = Rating;
