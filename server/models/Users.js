const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    // trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  admin: {
    type: Boolean,
    required: true,
    default:false
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
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Users = model('Users', userSchema);

module.exports = Users;
