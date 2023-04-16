const { Schema, model } = require('mongoose');

const siteSchema = new Schema({
  sitename: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
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
  }
});

// userSchema.pre('save', async function (next) {
//   if (this.isNew || this.isModified('password')) {
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
//   }

//   next();
// });

// userSchema.methods.isCorrectPassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };

const Site = model('Site', siteSchema);

module.exports = Site;
