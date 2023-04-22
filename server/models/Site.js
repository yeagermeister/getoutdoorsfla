const { Schema, model } = require('mongoose');

const siteSchema = new Schema({
  siteName: {
    type: String,
    required: true,
    unique: true,
    // trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
  },
  zipcode: {
    type: Number,
    required: true,
    length: 8
  },
  camping: {
    type: Boolean,
    default:false
  },
  pets: {
    type: Boolean,
    default:false
  },
  statepark: {
    type: Boolean,
    default:false
  },
  park: {
    type: Boolean,
    default:false
  },
  beach: {
    type: Boolean,
    default:false
  },
  swimmingHole: {
    type: Boolean,
    default:false
  },
  spring: {
    type: Boolean,
    default:false
  },
  free: {
    type: Boolean,
    default:false
  },
  lat: {
    type: Number,
    required: true
  },
  lon: {
    type: Number,
    required: true
  },
  ratings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Rating',
    },
  ],
  comments: [    
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
},
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Add a virtual to the the average rating for this site.

const Site = model('Site', siteSchema);

module.exports = Site;
