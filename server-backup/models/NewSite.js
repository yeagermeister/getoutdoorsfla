const { Schema, model } = require('mongoose');

const newSiteSchema = new Schema({
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

const NewSite = model('NewSite', newSiteSchema);

module.exports = NewSite;
